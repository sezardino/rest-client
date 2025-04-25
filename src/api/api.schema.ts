import { HTTP_METHODS } from "@/const/http-methods";
import { z } from "zod";

export const THREE_NODE_TYPES = Object.freeze({
  REQUEST: "request",
  FOLDER: "folder",
});

export const THREE_NODE_TYPES_ARRAY = Object.values(THREE_NODE_TYPES);

export type ThreeNodeType = keyof typeof THREE_NODE_TYPES;

export const RemoteCallSchema = z.object({
  id: z.string().uuid(),
  method: z.nativeEnum(HTTP_METHODS),
  url: z.string().url(),
});

export const ThreeNodeSchema = z.object({
  id: z.string().uuid(),
  type: z.nativeEnum(THREE_NODE_TYPES),
  name: z.string(),
  order: z.number(),
  parentId: z.string().uuid().nullable(),
  remoteCallId: z.string().uuid().nullable(),
  remoteCall: RemoteCallSchema.nullable(),
});
