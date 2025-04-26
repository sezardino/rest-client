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
}
