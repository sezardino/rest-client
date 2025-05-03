import type { TreeNodeType } from "@/api/tree-node/tree-nodes.schema";
import type { OneFieldFormDialogProps } from "@/components/ui/one-field-form-dialog";
import { OneFieldFormDialog } from "@/components/ui/one-field-form-dialog";
import { useCreateTreeNodeMutation } from "@/hooks/tanstack/tree-nodes/create-tree-node.mutation";
import { TreeNodeNameSchema } from "@/schema/tree-node-name";
import { CREATE_TREE_NODE_DIALOG_COPY_MAP } from "./create-tree-node-dialog.const";

export type CreateTreeNodeDialogType = Extract<
  TreeNodeType,
  "node" | "remoteCall"
>;

export type CreateTreeNodeDialogProps = {
  type: CreateTreeNodeDialogType;
  parentNodeId: string | null;
} & Pick<OneFieldFormDialogProps, "isOpen" | "onClose">;

export const CreateTreeNodeDialog = (props: CreateTreeNodeDialogProps) => {
  const { parentNodeId, type, isOpen, onClose } = props;

  const { mutateAsync, isPending } = useCreateTreeNodeMutation();

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
      title={CREATE_TREE_NODE_DIALOG_COPY_MAP[type].title}
      description={CREATE_TREE_NODE_DIALOG_COPY_MAP[type].description}
      label={CREATE_TREE_NODE_DIALOG_COPY_MAP[type].label}
      placeholder={CREATE_TREE_NODE_DIALOG_COPY_MAP[type].placeholder}
      schema={TreeNodeNameSchema}
      isOpen={isOpen}
      isActionPending={isPending}
      onClose={onClose}
      onConfirm={onCreate}
    />
  );
};
