import type { z } from "zod";
import type {
  ThreeNodeSchema,
  ThreeNodeWithRelationsSchema,
} from "./three-nodes.schema";

export type ThreeNode = z.infer<typeof ThreeNodeSchema>;
export type ThreeNodesWithRelations = z.infer<
  typeof ThreeNodeWithRelationsSchema
>;
