import type { TreeNode } from "./tree-nodes.entity";

export type CreateTreeNodeDto = Pick<TreeNode, "name" | "parentId" | "type"> &
  Partial<Pick<TreeNode, "remoteCallId">>;

export type DuplicateTreeNodeDto = Pick<TreeNode, "id" | "name">;
