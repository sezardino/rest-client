import type { z } from "zod";
import type {
  RemoteCallSchema,
  ThreeNodeSchema,
  ThreeNodeWithRelationsSchema,
} from "./api.schema";

export type ThreeNode = z.infer<typeof ThreeNodeSchema>;
export type ThreeNodesWithRelations = z.infer<
  typeof ThreeNodeWithRelationsSchema
>;
export type RemoteCall = z.infer<typeof RemoteCallSchema>;
