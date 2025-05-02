import type { ThreeNodeType } from "@/api/api.schema";
import type { OneFieldFormDialogProps } from "@/components/ui/one-field-form-dialog";
import { OneFieldFormDialog } from "@/components/ui/one-field-form-dialog";
import { useCreateThreeNodeMutation } from "@/hooks/tanstack/three-nodes/create-three-node.mutation";
import { CREATE_THREE_NODE_DIALOG_COPY_MAP } from "./create-three-node-dialog.const";
import { CreateThreeNodeDialogFormSchema } from "./create-three-node-dialog.schema";

export type CreateThreeNodeDialogType = Extract<
  ThreeNodeType,
  "node" | "remoteCall"
>;

export type CreateThreeNodeDialogProps = {
  type: CreateThreeNodeDialogType;
  parentNodeId: string | null;
} & Pick<OneFieldFormDialogProps, "isOpen" | "onClose">;

export const CreateThreeNodeDialog = (props: CreateThreeNodeDialogProps) => {
  const { parentNodeId, type, isOpen, onClose } = props;

  const { mutateAsync, isPending } = useCreateThreeNodeMutation();

  const onCreate = async (value: string) => {
    try {
      await mutateAsync({
        type,
        name: value,
        parentId: parentNodeId,
      });

      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <OneFieldFormDialog
      title={CREATE_THREE_NODE_DIALOG_COPY_MAP[type].title}
      description={CREATE_THREE_NODE_DIALOG_COPY_MAP[type].description}
      label="Name"
      placeholder={CREATE_THREE_NODE_DIALOG_COPY_MAP[type].placeholder}
      schema={CreateThreeNodeDialogFormSchema}
      isOpen={isOpen}
      isLoading={isPending}
      onClose={onClose}
      onConfirm={onCreate}
    />
  );
};
