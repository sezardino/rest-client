import type { OneFieldFormDialogProps } from "@/components/ui/one-field-form-dialog";
import { OneFieldFormDialog } from "@/components/ui/one-field-form-dialog";
import { useDuplicateTreeNodeMutation } from "@/hooks/tanstack/tree-nodes/duplicate-tree-node.mutation";
import { useTreeNodeItemQuery } from "@/hooks/tanstack/tree-nodes/tree-node-item.query";
import { TreeNodeNameSchema } from "@/schema/tree-node-name";

export type DuplicateTreeNodeDialogProps = {
  nodeId: string;
} & Pick<OneFieldFormDialogProps, "isOpen" | "onClose">;

export const DuplicateTreeNodeDialog = (
  props: DuplicateTreeNodeDialogProps
) => {
  const { nodeId, isOpen, onClose } = props;

  const { data: node, isLoading: isNodeLoading } = useTreeNodeItemQuery(nodeId);
  const { mutateAsync, isPending: isNodeDuplicating } =
    useDuplicateTreeNodeMutation();

  const duplicateHandler = async (value: string) => {
    try {
      await mutateAsync({ id: nodeId, name: value });

      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  console.log({ isNodeLoading, node: node?.name });

  return (
    <OneFieldFormDialog
      title="Duplicate Item"
      description="Enter a name for the duplicate"
      label="Name"
      fieldDescription="Enter a name for the duplicate"
      placeholder="Copy"
      initialValue={node?.name}
      schema={TreeNodeNameSchema}
      isOpen={isOpen}
      isActionPending={isNodeDuplicating}
      isDataLoading={isNodeLoading}
      onClose={onClose}
      onConfirm={duplicateHandler}
    />
  );
};
