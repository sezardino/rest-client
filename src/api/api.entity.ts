import type { z } from "zod";
import type { RemoteCallSchema, ThreeNodeSchema } from "./api.schema";

export type ThreeNode = z.infer<typeof ThreeNodeSchema>;
export type RemoteCall = z.infer<typeof RemoteCallSchema>;
