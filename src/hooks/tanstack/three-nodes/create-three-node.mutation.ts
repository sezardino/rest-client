import type { ThreeNode } from "@/api/api.entity";
import { localApi } from "@/api/local";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { THREE_NODE_BASIC_QUERY_KEY } from "./three-node.const";

export const useCreateThreeNodeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: Omit<ThreeNode, "id">) => localApi.threeNodes.add(dto),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [THREE_NODE_BASIC_QUERY_KEY] }),
  });
};
