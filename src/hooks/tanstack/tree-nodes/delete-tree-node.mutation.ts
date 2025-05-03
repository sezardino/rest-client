import { localApi } from "@/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TREE_NODE_BASIC_QUERY_KEY } from "./tree-node.const";

export const useDeleteTreeNodeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (treeNodeId: string) => localApi.treeNodes.delete(treeNodeId),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [TREE_NODE_BASIC_QUERY_KEY] }),
  });
};
