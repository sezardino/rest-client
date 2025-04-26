import { localApi } from "@/api/local";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { THREE_NODE_BASIC_QUERY_KEY } from "./three-node.const";

export const THREE_NODE_LIST_QUERY_KEY = "three-node-list-query-key";

export const threeNodeListQuery = queryOptions({
  queryKey: [THREE_NODE_BASIC_QUERY_KEY, THREE_NODE_LIST_QUERY_KEY],
  queryFn: () => localApi.threeNodes.getAll(),
});

export const useThreeNodeListQuery = () => useQuery(threeNodeListQuery);
