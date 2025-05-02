import { localApi } from "@/api";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { THREE_NODE_BASIC_QUERY_KEY } from "./three-node.const";

export const THREE_NODE_ITEM_QUERY_KEY = "three-node-item-query-key";

export const getThreeNodeItemQuery = (nodeId: string) =>
  queryOptions({
    queryKey: [THREE_NODE_BASIC_QUERY_KEY, THREE_NODE_ITEM_QUERY_KEY, nodeId],
    queryFn: () => localApi.threeNodes.getById(nodeId),
    enabled: !!nodeId,
  });

export const useThreeNodeItemQuery = (nodeId: string) =>
  useQuery(getThreeNodeItemQuery(nodeId));
