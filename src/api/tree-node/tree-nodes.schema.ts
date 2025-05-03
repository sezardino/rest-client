import { z } from "zod";

import type { RemoteCall } from "../remote-calls/remote-calls.entity";

import { RemoteCallSchema } from "../remote-calls";
import type { TreeNode } from "./tree-nodes.entity";

export const TREE_NODE_TYPES = Object.freeze({
  REMOTE_CALL: "remoteCall",
  NODE: "node",
});

export const TREE_NODE_TYPES_ARRAY = Object.values(TREE_NODE_TYPES);

export type TreeNodeType =
  (typeof TREE_NODE_TYPES)[keyof typeof TREE_NODE_TYPES];

export type TreeNodeWithRelations = {
  id: string;
  type: TreeNodeType;
  name: string;
  order: number;
  parentId: string | null;
  childNodes?: TreeNodeWithRelations[];
  remoteCallId: string | null;
  remoteCall?: RemoteCall | null;
};

export const TreeNodeSchema = z.object({
  id: z.string().uuid(),
  type: z.nativeEnum(TREE_NODE_TYPES),
  name: z.string(),
  order: z.number(),

  parentId: z.string().uuid().nullable(),
  remoteCallId: z.string().uuid().nullable(),
});

export const TreeNodeWithRelationsSchema: z.ZodType<
  TreeNode & { childNodes?: TreeNode[]; remoteCall?: RemoteCall | null }
> = z.lazy(() =>
  TreeNodeSchema.extend({
    childNodes: z.array(TreeNodeWithRelationsSchema).optional(),
    remoteCall: RemoteCallSchema.nullable().optional(),
  })
);
