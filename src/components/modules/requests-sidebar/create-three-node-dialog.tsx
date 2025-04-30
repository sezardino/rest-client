import type { ThreeNodeType } from "@/api/api.schema";
import type { OneFieldFormDialogProps } from "@/components/ui/one-field-form-dialog";
import { OneFieldFormDialog } from "@/components/ui/one-field-form-dialog";
import { useCreateThreeNodeMutation } from "@/hooks/tanstack/three-nodes/create-three-node.mutation";
import { z } from "zod";

type DialogType = Extract<ThreeNodeType, "node" | "remoteCall">;

export type CreateThreeNodeDialogProps = {
  type: DialogType;
} & Pick<OneFieldFormDialogProps, "isOpen" | "onClose">;

const schema = z.object({
  value: z.string({ required_error: "Name is required" }).nonempty({
    message: "Name is required",
  }),
});

const MODAL_COPY_MAP: Record<
  DialogType,
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

export const CreateThreeNodeDialog = (props: CreateThreeNodeDialogProps) => {
  const { type, isOpen, onClose } = props;

  const { mutateAsync, isPending } = useCreateThreeNodeMutation();

  const onCreate = async (value: string) => {
    try {
      await mutateAsync({
        type,
        name: value,
        parentId: null,
      });

      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <OneFieldFormDialog
      title={MODAL_COPY_MAP[type].title}
      description={MODAL_COPY_MAP[type].description}
      label="Name"
      placeholder={MODAL_COPY_MAP[type].placeholder}
      schema={schema}
      isOpen={isOpen}
      isLoading={isPending}
      onClose={onClose}
      onConfirm={onCreate}
    />
  );
};
