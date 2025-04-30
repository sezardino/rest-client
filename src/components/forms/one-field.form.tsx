import type { ComponentProps } from "react";
import type { ZodType } from "zod";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField,
} from "../ui/form-field";
import { Input } from "../ui/input";

export type OneFieldFormValues = {
  value: string;
};

type OmittedComponentProps = Omit<ComponentProps<"form">, "onSubmit">;

export type OneFieldFormProps = OmittedComponentProps & {
  label: string;
  description?: string;
  placeholder?: string;
  initialValue?: string;
  schema: ZodType<OneFieldFormValues>;
  onSubmit: (value: string) => void;
};

export const OneFieldForm = (props: OneFieldFormProps) => {
  const {
    label,
    placeholder,
    description,
    initialValue,
    onSubmit,
    schema,
    className,
    ...rest
  } = props;

  const [fieldRef, { setError, clearError }] = useFormField();

  const action = (formData: FormData) => {
    const values = Object.fromEntries(formData);
    const validationResponse = schema.safeParse(values);

    if (validationResponse.success) {
      clearError();

      onSubmit(validationResponse.data.value);
      return;
    }

    const errors = validationResponse.error.format();
    if (errors.value?._errors[0]) {
      setError(errors.value._errors.join(", "));
    }
  };

  return (
    <form {...rest} action={action} aria-label={label}>
      <FormField ref={fieldRef} name="value">
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              autoFocus
              name="value"
              placeholder={placeholder || ""}
              defaultValue={initialValue || ""}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      </FormField>
    </form>
  );
};
