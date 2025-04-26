import { HTTP_METHODS } from "@/const/http-methods";
import { z } from "zod";
import type { RemoteCall, ThreeNode } from "./api.entity";

export const THREE_NODE_TYPES = Object.freeze({
  REMOTE_CALL: "remoteCall",
  NODE: "node",
});

export const THREE_NODE_TYPES_ARRAY = Object.values(THREE_NODE_TYPES);

export type ThreeNodeType =
  (typeof THREE_NODE_TYPES)[keyof typeof THREE_NODE_TYPES];

export const RemoteCallSchema = z.object({
  id: z.string().uuid(),
  method: z.nativeEnum(HTTP_METHODS),
  url: z.string().url(),
  threeNodeId: z.string().uuid().nullable(),
});

export type ThreeNodeWithRelations = {
  id: string;
  type: ThreeNodeType;
  name: string;
  order: number;
  parentId: string | null;
  childNodes?: ThreeNodeWithRelations[];
  remoteCallId: string | null;
  remoteCall?: z.infer<typeof RemoteCallSchema> | null;
};

export const ThreeNodeSchema = z.object({
  id: z.string().uuid(),
  type: z.nativeEnum(THREE_NODE_TYPES),
  name: z.string(),
  order: z.number(),

  parentId: z.string().uuid().nullable(),
  remoteCallId: z.string().uuid().nullable(),
});

export const ThreeNodeWithRelationsSchema: z.ZodType<
  ThreeNode & { childNodes?: ThreeNode[]; remoteCall?: RemoteCall | null }
> = z.lazy(() =>
  ThreeNodeSchema.extend({
    childNodes: z.array(ThreeNodeWithRelationsSchema).optional(),
    remoteCall: RemoteCallSchema.nullable().optional(),
  })
);
