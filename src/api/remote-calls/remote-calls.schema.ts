import { HTTP_METHODS } from "@/const/http-methods";
import { z } from "zod";

const HeaderParamSchema = z.object({
  key: z.string(),
  value: z.string(),
  enabled: z.boolean(),
});

const AuthConfigSchema = z.union([
  z.object({
    type: z.literal("basic"),
    username: z.string(),
    password: z.string(),
  }),
  z.object({ type: z.literal("bearer"), token: z.string() }),
  z.object({
    type: z.literal("apiKey"),
    key: z.string(),
    in: z.union([z.literal("header"), z.literal("query")]),
    name: z.string(),
  }),
]);

export const RemoteCallSchema = z.object({
  id: z.string().uuid(),
  method: z.nativeEnum(HTTP_METHODS),
  url: z.string(),
  headers: z.array(HeaderParamSchema),
  params: z.array(HeaderParamSchema),
  body: z.string().nullable(),
  auth: AuthConfigSchema.nullable(),
  treeNodeId: z.string().uuid().nullable(),
});
