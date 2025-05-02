import type { OneFieldFormDialogProps } from "@/components/ui/one-field-form-dialog";
import { OneFieldFormDialog } from "@/components/ui/one-field-form-dialog";
import { ThreeNodeNameSchema } from "@/schema/three-node-name";

export type DuplicateThreeNodeDialogProps = {
  nodeId: string;
} & Pick<OneFieldFormDialogProps, "isOpen" | "onClose">;

export const DuplicateThreeNodeDialog = (
  props: DuplicateThreeNodeDialogProps
) => {
  const { nodeId, isOpen, onClose } = props;

  const duplicateHandler = async (value: string) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Duplicating node:", { nodeId, newName: value });
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <OneFieldFormDialog
      title="Duplicate Item"
      description="Enter a name for the duplicate"
      label="Name"
      fieldDescription="Enter a name for the duplicate"
      placeholder="Copy"
      schema={ThreeNodeNameSchema}
      isOpen={isOpen}
      isLoading={false}
      onClose={onClose}
      onConfirm={duplicateHandler}
    />
  );
};
