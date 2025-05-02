import type { ThreeNodeType } from "@/api/three-node/three-nodes.schema";
import type { OneFieldFormDialogProps } from "@/components/ui/one-field-form-dialog";
import { OneFieldFormDialog } from "@/components/ui/one-field-form-dialog";
import { useCreateThreeNodeMutation } from "@/hooks/tanstack/three-nodes/create-three-node.mutation";
import { ThreeNodeNameSchema } from "@/schema/three-node-name";
import { CREATE_THREE_NODE_DIALOG_COPY_MAP } from "./create-three-node-dialog.const";

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
      label={CREATE_THREE_NODE_DIALOG_COPY_MAP[type].label}
      placeholder={CREATE_THREE_NODE_DIALOG_COPY_MAP[type].placeholder}
      schema={ThreeNodeNameSchema}
      isOpen={isOpen}
      isActionPending={isPending}
      onClose={onClose}
      onConfirm={onCreate}
    />
  );
};
