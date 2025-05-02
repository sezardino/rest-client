import type { ThreeNode } from "./three-nodes.entity";

export type CreateThreeNodeDto = Omit<
  ThreeNode,
  "id" | "order" | "remoteCallId" | "remoteCall"
>;
