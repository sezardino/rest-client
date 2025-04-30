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

export type OneFieldFormProps = ComponentProps<"form"> & {
  label: string;
  description?: string;
  placeholder?: string;
  initialValue?: string;
  schema: ZodType<{ value: string }>;
};

export const OneFieldForm = (props: OneFieldFormProps) => {
  const {
    label,
    placeholder,
    description,
    initialValue,
    schema,
    className,
    ...rest
  } = props;

  const [fieldRef, { setError, clearError }] = useFormField();

  const action = (formData: FormData) => {
    const values = Object.fromEntries(formData);
    const validationResponse = schema.safeParse(values);
    console.log(values);

    if (validationResponse.success) {
      clearError();
      return console.log("success");
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
