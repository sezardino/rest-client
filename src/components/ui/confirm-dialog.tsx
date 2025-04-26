import type { AlertDialogProps } from "@radix-ui/react-alert-dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./alert-dialog";
import { Button, type ButtonVariants } from "./button";

type OmittedProps = Omit<AlertDialogProps, "onOpenChange" | "open">;

export type ConfirmDialogProps = OmittedProps & {
  title: string;
  description: string;
  confirmText?: string;
  confirmVariant?: ButtonVariants["variant"];
  cancelText?: string;
  onConfirm: () => void;
  isOpen: boolean;
  onClose: () => void;
  isLoading?: boolean;
};

export const ConfirmDialog = (props: ConfirmDialogProps) => {
  const {
    title,
    description,
    cancelText = "Cancel",
    confirmText = "Confirm",
    confirmVariant = "default",
    isOpen,
    onClose,
    onConfirm,
    isLoading = false,
    ...rest
  } = props;

  return (
    <AlertDialog {...rest} open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>{cancelText}</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button variant={confirmVariant} onClick={onConfirm}>
              {confirmText}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
