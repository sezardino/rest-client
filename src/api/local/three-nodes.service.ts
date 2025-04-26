import { HTTP_METHODS } from "@/const/http-methods";
import type { ThreeNode, ThreeNodesWithRelations } from "../api.entity";
import { ThreeNodeSchema } from "../api.schema";
import { AbstractLocalApiService } from "./local.abstract";
import { LS_API_NAMES } from "./local.const";
import { MOCK_LOCAL_THREE_NODES } from "./mocks";
import type { RemoteCallsService } from "./remote-calls.service";

export class ThreeNodesService extends AbstractLocalApiService<
  Omit<ThreeNode, "remoteCall">
> {
  constructor(private readonly remoteCallsService: RemoteCallsService) {
    super({
      name: LS_API_NAMES.threeNode,
      schema: ThreeNodeSchema,
      defaultValue: MOCK_LOCAL_THREE_NODES,
    });
  }

  private sortNodes(
    nodes: ThreeNodesWithRelations[]
  ): ThreeNodesWithRelations[] {
    return nodes
      .map((node) => ({
        ...node,
        childNodes: node.childNodes ? this.sortNodes(node.childNodes) : [],
      }))
      .sort((a, b) => a.order - b.order);
  }

  async getAll(): Promise<ThreeNodesWithRelations[]> {
    const flatNodes = await super.getAll();

    const idToNodeMap = new Map<string, ThreeNodesWithRelations>();

    for (const node of flatNodes) {
      idToNodeMap.set(node.id, { ...node, childNodes: [], remoteCall: null });
    }

    const rootNodes: ThreeNodesWithRelations[] = [];

    for (const node of idToNodeMap.values()) {
      if (node.parentId) {
        const parent = idToNodeMap.get(node.parentId);
        if (parent) {
          parent.childNodes?.push(node);
        }
      } else {
        rootNodes.push(node);
      }
    }

    await Promise.all(
      Array.from(idToNodeMap.values()).map(async (node) => {
        const remoteCalls = await this.remoteCallsService.getListByNodeId(
          node.id
        );

        node.remoteCall = remoteCalls.length > 0 ? remoteCalls[0] : null;
      })
    );

    return this.sortNodes(rootNodes);
  }

  async add(dto: Omit<ThreeNode, "id">) {
    const newNode = await super.create(dto);

    if (dto.type !== "remoteCall") return;

    const newRemoteCall = await this.remoteCallsService.create({
      method: HTTP_METHODS.GET,
      threeNodeId: newNode.id,
      url: "",
    });

    await this.update(newNode.id, { remoteCallId: newRemoteCall.id });
  }

  async deleteByParentId(parentId: string): Promise<void> {
    const allNodes = await super.getAll();

    const nodesToDelete = allNodes.filter((node) => node.parentId === parentId);

    const requestsToDeleteIds = nodesToDelete
      .filter((node) => node.type === "remoteCall")
      .map((node) => node.remoteCallId) as string[];

    const childNodesToDeleteIds = nodesToDelete
      .filter((node) => node.type === "node")
      .map((node) => node.id) as string[];

    await this.remoteCallsService.deleteMany(requestsToDeleteIds);
    await this.deleteMany(nodesToDelete.map((node) => node.id));
    await Promise.all(childNodesToDeleteIds.map((id) => this.delete(id)));
  }

  async delete(nodeId: string): Promise<void> {
    const node = await this.getById(nodeId);

    if (node.remoteCallId) {
      super.delete(nodeId);
      this.remoteCallsService.delete(node.remoteCallId);

      return;
    }

    await this.deleteByParentId(nodeId);
    await super.delete(nodeId);
    await this.remoteCallsService.deleteByNodeId(nodeId);
  }
}
