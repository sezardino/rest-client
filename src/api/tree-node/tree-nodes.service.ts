import { HTTP_METHODS } from "@/const/http-methods";
import { MAX_NODE_LEVEL } from "@/const/max-level.const";

import { ApiError } from "../api.error";
import { AbstractLocalApiService, LS_API_NAMES } from "../local";
import { MOCK_LOCAL_TREE_NODES } from "../mocks";
import type { RemoteCallsService } from "../remote-calls";

import type { TreeNode, TreeNodesWithRelations } from "./tree-nodes.entity";
import { TreeNodeSchema } from "./tree-nodes.schema";
import type {
  CreateTreeNodeDto,
  DuplicateTreeNodeDto,
} from "./tree-nodes.types";

export class TreeNodesService extends AbstractLocalApiService<
  Omit<TreeNode, "remoteCall">
> {
  constructor(private readonly remoteCallsService: RemoteCallsService) {
    super({
      name: LS_API_NAMES.treeNode,
      schema: TreeNodeSchema,
      defaultValue: MOCK_LOCAL_TREE_NODES,
    });
  }

  private sortNodes(nodes: TreeNodesWithRelations[]): TreeNodesWithRelations[] {
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

  async getAll(): Promise<TreeNodesWithRelations[]> {
    const flatNodes = await super.getAll();

    const idToNodeMap = new Map<string, TreeNodesWithRelations>();

    for (const node of flatNodes) {
      idToNodeMap.set(node.id, { ...node, childNodes: [], remoteCall: null });
    }

    const rootNodes: TreeNodesWithRelations[] = [];

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

  async add(dto: CreateTreeNodeDto): Promise<TreeNode> {
    const { parentId, type, remoteCallId = null, name } = dto;

    if (parentId) {
      const parentLevel = await this.getNodeLevel(parentId);
      console.log(parentLevel);
      if (parentLevel >= MAX_NODE_LEVEL)
        throw new ApiError(`Max depth limit exceed (${MAX_NODE_LEVEL})`, 400);
    }

    const allNodes = await super.getAll();
    const neededOrder =
      Math.max(
        ...allNodes
          .filter((node) => node.parentId === dto.parentId)
          .map((node) => node.order),
        0
      ) + 1;

    const newNode = await super.create({
      name,
      type,
      parentId,
      order: neededOrder,
      remoteCallId,
    });

    if (type !== "remoteCall" || remoteCallId) return newNode;

    const newRemoteCall = await this.remoteCallsService.add({
      method: HTTP_METHODS.GET,
      treeNodeId: newNode.id,
      url: "",
    });

    const updatedNode = await this.update(newNode.id, {
      remoteCallId: newRemoteCall.id,
    });

    return updatedNode;
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

    if (!node.parentId) return 1;

    let level = 1;
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

    const newNode = await this.add({
      ...node,
      parentId,
      name: name || node.name,
      remoteCallId: newRemoteCallId,
    });

    if (newNode.type === "remoteCall" && newRemoteCallId) {
      await this.remoteCallsService.update(newRemoteCallId, {
        treeNodeId: newNode.id,
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

  async duplicateNode(dto: DuplicateTreeNodeDto): Promise<void> {
    const { id, name } = dto;

    await this.createNodeCopy(id, null, name);
  }
}
