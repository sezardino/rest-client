import { localApi, type DuplicateTreeNodeDto } from "@/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TREE_NODE_BASIC_QUERY_KEY } from "./tree-node.const";

export const useDuplicateTreeNodeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: DuplicateTreeNodeDto) =>
      localApi.treeNodes.duplicateNode(dto),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [TREE_NODE_BASIC_QUERY_KEY] }),
  });
};
