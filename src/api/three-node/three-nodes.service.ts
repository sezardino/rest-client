import { HTTP_METHODS } from "@/const/http-methods";
import { MAX_NODE_LEVEL } from "@/const/max-level.const";

import { ApiError } from "../api.error";
import { AbstractLocalApiService, LS_API_NAMES } from "../local";
import { MOCK_LOCAL_THREE_NODES } from "../mocks";
import type { RemoteCallsService } from "../remote-calls";

import type { ThreeNode, ThreeNodesWithRelations } from "./three-nodes.entity";
import { ThreeNodeSchema } from "./three-nodes.schema";
import type {
  CreateThreeNodeDto,
  DuplicateThreeNodeDto,
} from "./three-nodes.types";

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

  private async getChildren(parentId: string) {
    await this.getById(parentId);

    const allNodes = await super.getAll();
    return allNodes.filter((node) => node.parentId === parentId);
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
    if (dto.parentId) {
      const parentLevel = await this.getNodeLevel(dto.parentId);
      if (parentLevel >= MAX_NODE_LEVEL)
        throw new ApiError(`Max depth limit exceed (${MAX_NODE_LEVEL})`, 400);
    }

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
    const currentLevel = await this.getNodeLevel(nodeId);
    const maxInnerLevel = await this.getMaxInnerLevel(nodeId);

    return currentLevel + maxInnerLevel;
  }
  private async createNodeCopy(
    nodeId: string,
    parentId: string | null,
    name?: string
  ): Promise<string> {
    const node = await this.getById(nodeId);
    let newRemoteCallId = null;

    if (node.type === "remoteCall" && node.remoteCallId) {
      const remoteCall = await this.remoteCallsService.getById(
        node.remoteCallId
      );
      if (remoteCall) {
        const newRemoteCall = await this.remoteCallsService.duplicate(
          node.remoteCallId
        );
        newRemoteCallId = newRemoteCall.id;
      }
    }

    const newNode = await super.create({
      ...node,
      parentId,
      name: name || node.name,
      remoteCallId: newRemoteCallId,
      order: node.order + 1,
    });

    if (newNode.type === "remoteCall" && newRemoteCallId) {
      await this.remoteCallsService.update(newRemoteCallId, {
        threeNodeId: newNode.id,
      });
    }

    if (node.type === "node") {
      const children = await this.getChildren(node.id);
      await Promise.all(
        children.map((child) => this.createNodeCopy(child.id, newNode.id))
      );
    }

    return newNode.id;
  }

  async duplicateNode(dto: DuplicateThreeNodeDto): Promise<void> {
    const { id, name } = dto;

    await this.createNodeCopy(id, null, name);
  }
}
