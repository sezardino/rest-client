import { HTTP_METHODS } from "@/const/http-methods";
import { MAX_NODE_LEVEL } from "@/const/max-level.const";
import type { ThreeNode, ThreeNodesWithRelations } from "../../api.entity";
import { ApiError } from "../../api.error";
import { ThreeNodeSchema } from "../../api.schema";
import { AbstractLocalApiService } from "../local.abstract";
import { LS_API_NAMES } from "../local.const";
import { MOCK_LOCAL_THREE_NODES } from "../mocks";
import type { RemoteCallsService } from "../remote-calls/remote-calls.service";
import type { CreateThreeNodeDto } from "./three-nodes.types";

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

  async add(dto: CreateThreeNodeDto) {
    const allNodes = await super.getAll();
    const maxOrder = Math.max(
      ...allNodes
        .filter((node) => node.parentId === dto.parentId)
        .map((node) => node.order),
      0
    );

    const newNode = await super.create({
      ...dto,
      order: maxOrder + 1,
      remoteCallId: null,
    });

    if (dto.type !== "remoteCall") return;
    console.log(dto);

    const newRemoteCall = await this.remoteCallsService.create({
      method: HTTP_METHODS.GET,
      threeNodeId: newNode.id,
      url: "",
    });
    console.log(newRemoteCall);

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

  async getNodeLevel(nodeId: string): Promise<number> {
    const node = await this.getById(nodeId);

    if (!node.parentId) return 0;

    let level = 0;
    let currentNode = node;
    const visitedNodes = new Set<string>();

    while (currentNode.parentId) {
      if (level >= MAX_NODE_LEVEL)
        throw new ApiError(`Max depth limit exceed (${MAX_NODE_LEVEL})`, 400);

      if (visitedNodes.has(currentNode.parentId))
        throw new ApiError("Find circular expression", 400);

      visitedNodes.add(currentNode.id);
      level++;

      const parentNode = await this.getById(currentNode.parentId);
      if (!parentNode) throw new ApiError(`Parent node not found`, 404);

      currentNode = parentNode;
    }

    return level;
  }

  async getMaxInnerLevel(nodeId: string): Promise<number> {
    const allNodes = await this.getAll();
    const node = allNodes.find((n) => n.id === nodeId);
    if (!node) throw new ApiError(`Node not found`, 404);

    const visitedNodes = new Set<string>();
    const calculateDepth = (currentNodeId: string): number => {
      if (visitedNodes.has(currentNodeId))
        throw new ApiError("Find circular expression", 400);

      visitedNodes.add(currentNodeId);

      const childNodes = allNodes.filter((n) => n.parentId === currentNodeId);
      if (childNodes.length === 0) return 0;

      const childDepths = childNodes.map((child) => {
        const depth = calculateDepth(child.id);
        if (depth >= MAX_NODE_LEVEL)
          throw new ApiError(`Max depth limit exceed (${MAX_NODE_LEVEL})`, 400);

        return depth;
      });

      visitedNodes.delete(currentNodeId);
      return Math.max(...childDepths) + 1;
    };

    return calculateDepth(nodeId);
  }

  async getFullNodeLevel(nodeId: string): Promise<number> {
    const node = await this.getById(nodeId);

    const currentLevel = await this.getNodeLevel(nodeId);
    const maxInnerLevel = await this.getMaxInnerLevel(nodeId);

    return currentLevel + maxInnerLevel;
  }
}
