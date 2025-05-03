import type { z } from "zod";
import type {
  TreeNodeSchema,
  TreeNodeWithRelationsSchema,
} from "./tree-nodes.schema";

export type TreeNode = z.infer<typeof TreeNodeSchema>;
export type TreeNodesWithRelations = z.infer<
  typeof TreeNodeWithRelationsSchema
>;
