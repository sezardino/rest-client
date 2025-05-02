import { z } from "zod";

import { HTTP_METHODS } from "@/const/http-methods";

export const RemoteCallSchema = z.object({
  id: z.string().uuid(),
  method: z.nativeEnum(HTTP_METHODS),
  url: z.string(),
  threeNodeId: z.string().uuid().nullable(),
});
