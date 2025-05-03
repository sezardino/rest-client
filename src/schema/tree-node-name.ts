import { z } from "zod";

export const TreeNodeNameSchema = z.object({
  value: z.string({ required_error: "Name is required" }).nonempty({
    message: "Name is required",
  }),
});
