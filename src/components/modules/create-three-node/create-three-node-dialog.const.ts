import type { OneFieldFormDialogProps } from "@/components/ui/one-field-form-dialog";
import type { CreateThreeNodeDialogType } from "./create-three-node-dialog";

export const CREATE_THREE_NODE_DIALOG_COPY_MAP: Record<
  CreateThreeNodeDialogType,
  Pick<
    OneFieldFormDialogProps,
    "title" | "description" | "label" | "fieldDescription" | "placeholder"
  >
> = {
  node: {
    title: "Create Folder",
    description: "Enter a name for the new folder",
    label: "Name",
    fieldDescription: "Enter a name for the new folder",
    placeholder: "New Folder",
  },
  remoteCall: {
    title: "Create Request",
    description: "Enter a name for the new request",
    label: "Name",
    fieldDescription: "Enter a name for the new request",
    placeholder: "New Request",
  },
};
