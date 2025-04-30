import * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";

import { Label } from "@/components/ui/label";
import { cn } from "@/utils/cn";
import type {
  ComponentPropsWithoutRef,
  ElementRef,
  HTMLAttributes,
} from "react";
import {
  createContext,
  forwardRef,
  useContext,
  useId,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

type FormFieldContextValue = {
  id: string;
  name: string;
  error?: string;
};

const FormFieldContext = createContext<FormFieldContextValue | undefined>(
  undefined
);

type FormFieldHandle = {
  setError: (error: string) => void;
  clearError: () => void;
};

export type FormFieldProps = {
  id?: string;
  name: string;
  error?: string;
  children: React.ReactNode;
};

const FormField = forwardRef<FormFieldHandle, FormFieldProps>((props, ref) => {
  const { id, name, error: initialError, children } = props;

  const generatedId = useId();
  const [error, setError] = useState<string | undefined>(initialError);

  useImperativeHandle(ref, () => ({
    setError: (newError: string) => setError(newError),
    clearError: () => setError(undefined),
  }));

  return (
    <FormFieldContext.Provider
      value={{
        id: id ?? generatedId,
        name,
        error,
      }}
    >
      {children}
    </FormFieldContext.Provider>
  );
});

const useFormFieldConfiguration = () => {
  const context = useContext(FormFieldContext);
  if (!context) {
    throw new Error(
      "useFormFieldConfiguration must be used within a <FormField>"
    );
  }

  const { id, name, error } = context;

  return {
    id,
    name,
    error,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
  };
};

type FormItemContextValue = {
  id: string;
};

const FormItemContext = createContext<FormItemContextValue | undefined>(
  undefined
);

const FormItem = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const id = useId();

    return (
      <FormItemContext.Provider value={{ id }}>
        <div ref={ref} className={cn("space-y-2", className)} {...props} />
      </FormItemContext.Provider>
    );
  }
);
FormItem.displayName = "FormItem";

const FormLabel = forwardRef<
  ElementRef<typeof LabelPrimitive.Root>,
  ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormFieldConfiguration();

  return (
    <Label
      ref={ref}
      className={cn(error && "text-destructive", className)}
      htmlFor={formItemId}
      {...props}
    />
  );
});
FormLabel.displayName = "FormLabel";

const FormControl = forwardRef<
  ElementRef<typeof Slot>,
  ComponentPropsWithoutRef<typeof Slot>
>(({ className, ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useFormFieldConfiguration();

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        error ? `${formDescriptionId} ${formMessageId}` : formDescriptionId
      }
      aria-invalid={!!error}
      className={className}
      {...props}
    />
  );
});
FormControl.displayName = "FormControl";

const FormDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormFieldConfiguration();

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn("text-[0.8rem] text-muted-foreground", className)}
      {...props}
    />
  );
});
FormDescription.displayName = "FormDescription";

const FormMessage = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormFieldConfiguration();
  const body = error ?? children;

  if (!body) {
    return null;
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn("text-[0.8rem] font-medium text-destructive", className)}
      {...props}
    >
      {body}
    </p>
  );
});
FormMessage.displayName = "FormMessage";

const useFormField = () => {
  const ref = useRef<FormFieldHandle>(null);

  return [
    ref,
    {
      setError: (error: string) => ref.current?.setError(error),
      clearError: () => ref.current?.clearError(),
    },
  ] as const;
};

export {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField,
};
