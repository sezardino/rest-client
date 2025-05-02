import type { OneFieldFormDialogProps } from "@/components/ui/one-field-form-dialog";
import { OneFieldFormDialog } from "@/components/ui/one-field-form-dialog";
import { useDuplicateThreeNodeMutation } from "@/hooks/tanstack/three-nodes/duplicate-three-node.mutation";
import { useThreeNodeItemQuery } from "@/hooks/tanstack/three-nodes/three-node-item.query";
import { ThreeNodeNameSchema } from "@/schema/three-node-name";

export type DuplicateThreeNodeDialogProps = {
  nodeId: string;
} & Pick<OneFieldFormDialogProps, "isOpen" | "onClose">;

export const DuplicateThreeNodeDialog = (
  props: DuplicateThreeNodeDialogProps
) => {
  const { nodeId, isOpen, onClose } = props;

  const { data: node, isLoading: isNodeLoading } =
    useThreeNodeItemQuery(nodeId);
  const { mutateAsync, isPending: isNodeDuplicating } =
    useDuplicateThreeNodeMutation();

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
      schema={ThreeNodeNameSchema}
      isOpen={isOpen}
      isActionPending={isNodeDuplicating}
      isDataLoading={isNodeLoading}
      onClose={onClose}
      onConfirm={duplicateHandler}
    />
  );
};
