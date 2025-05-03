import { localApi } from "@/api";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { TREE_NODE_BASIC_QUERY_KEY } from "./tree-node.const";

export const TREE_NODE_LIST_QUERY_KEY = "tree-node-list-query-key";

export const treeNodeListQuery = queryOptions({
  queryKey: [TREE_NODE_BASIC_QUERY_KEY, TREE_NODE_LIST_QUERY_KEY],
  queryFn: () => localApi.treeNodes.getAll(),
});

export const useTreeNodeListQuery = () => useQuery(treeNodeListQuery);
