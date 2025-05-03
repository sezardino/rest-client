import { localApi } from "@/api";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { TREE_NODE_BASIC_QUERY_KEY } from "./tree-node.const";

export const TREE_NODE_ITEM_QUERY_KEY = "tree-node-item-query-key";

export const getTreeNodeItemQuery = (nodeId: string) =>
  queryOptions({
    queryKey: [TREE_NODE_BASIC_QUERY_KEY, TREE_NODE_ITEM_QUERY_KEY, nodeId],
    queryFn: () => localApi.treeNodes.getById(nodeId),
    enabled: !!nodeId,
  });

export const useTreeNodeItemQuery = (nodeId: string) =>
  useQuery(getTreeNodeItemQuery(nodeId));
