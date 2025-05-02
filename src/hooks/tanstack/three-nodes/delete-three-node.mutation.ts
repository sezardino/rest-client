import { localApi } from "@/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { THREE_NODE_BASIC_QUERY_KEY } from "./three-node.const";

export const useDeleteThreeNodeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (threeNodeId: string) =>
      localApi.threeNodes.delete(threeNodeId),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [THREE_NODE_BASIC_QUERY_KEY] }),
  });
};
