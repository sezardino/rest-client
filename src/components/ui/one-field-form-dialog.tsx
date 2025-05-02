import type { AlertDialogProps } from "@radix-ui/react-alert-dialog";
import { useId } from "react";
import { OneFieldForm, type OneFieldFormProps } from "../forms/one-field.form";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./alert-dialog";
import { Button, type ButtonVariants } from "./button";
import { LoadingSpinner } from "./loading-spinner";

type OmittedProps = Omit<AlertDialogProps, "onOpenChange" | "open">;
type PickedFormProps = Pick<
  OneFieldFormProps,
  "action" | "label" | "placeholder" | "initialValue" | "schema"
>;

export type OneFieldFormDialogProps = OmittedProps &
  PickedFormProps & {
    title: string;
    description: string;
    fieldDescription?: string;
    confirmText?: string;
    confirmVariant?: ButtonVariants["variant"];
    cancelText?: string;
    onConfirm: (value: string) => void;
    isOpen: boolean;
    onClose: () => void;
    isActionPending?: boolean;
    isDataLoading?: boolean;
  };

export const OneFieldFormDialog = (props: OneFieldFormDialogProps) => {
  const {
    title,
    description,
    label,
    fieldDescription,
    placeholder,
    initialValue,
    schema,
    cancelText = "Cancel",
    confirmText = "Submit",
    confirmVariant = "default",
    isOpen,
    onClose,
    onConfirm,
    isActionPending = false,
    isDataLoading = false,
    ...rest
  } = props;

  const formId = useId();

  return (
    <AlertDialog {...rest} open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        {isDataLoading && <LoadingSpinner className="h-100" />}

        {!isDataLoading && (
          <>
            <AlertDialogHeader>
              <AlertDialogTitle>{title}</AlertDialogTitle>
              <AlertDialogDescription>{description}</AlertDialogDescription>
            </AlertDialogHeader>

            <OneFieldForm
              id={formId}
              label={label}
              description={fieldDescription}
              placeholder={placeholder}
              initialValue={initialValue}
              isDisabled={isActionPending}
              schema={schema}
              onSubmit={onConfirm}
            />

            <AlertDialogFooter className="mt-4">
              <AlertDialogCancel onClick={onClose} type="button">
                {cancelText}
              </AlertDialogCancel>
              <Button
                form={formId}
                variant={confirmVariant}
                type="submit"
                disabled={isActionPending}
              >
                {confirmText}
              </Button>
            </AlertDialogFooter>
          </>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
};
