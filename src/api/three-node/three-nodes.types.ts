import type { ThreeNode } from "./three-nodes.entity";

export type CreateThreeNodeDto = Pick<ThreeNode, "name" | "parentId" | "type"> &
  Partial<Pick<ThreeNode, "remoteCallId">>;

export type DuplicateThreeNodeDto = Pick<ThreeNode, "id" | "name">;
