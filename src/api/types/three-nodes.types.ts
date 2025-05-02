import type { ThreeNode } from "../api.entity";

export type CreateThreeNodeDto = Omit<
  ThreeNode,
  "id" | "order" | "remoteCallId" | "remoteCall"
>;
