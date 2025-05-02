import type { z } from "zod";

import type { RemoteCallSchema } from "./remote-calls.schema";

export type RemoteCall = z.infer<typeof RemoteCallSchema>;
