import { localApi, type DuplicateThreeNodeDto } from "@/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { THREE_NODE_BASIC_QUERY_KEY } from "./three-node.const";

export const useDuplicateThreeNodeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: DuplicateThreeNodeDto) =>
      localApi.threeNodes.duplicateNode(dto),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [THREE_NODE_BASIC_QUERY_KEY] }),
  });
};
