import { localApi, type CreateTreeNodeDto } from "@/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TREE_NODE_BASIC_QUERY_KEY } from "./tree-node.const";

export const useCreateTreeNodeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: CreateTreeNodeDto) => localApi.treeNodes.add(dto),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [TREE_NODE_BASIC_QUERY_KEY] }),
  });
};
