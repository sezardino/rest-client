import { z } from "zod";

export const CreateThreeNodeDialogFormSchema = z.object({
  value: z.string({ required_error: "Name is required" }).nonempty({
    message: "Name is required",
  }),
});
