import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { HTTP_METHODS, type HTTPMethod } from "@/const/http-methods";
import { cn } from "@/utils/cn";
import type { ComponentProps } from "react";
import { RequestMethod } from "./request-method";

export type MethodsSelectProps = ComponentProps<"button"> & {
  onMethodChange: (method: HTTPMethod) => void;
  defaultValue?: HTTPMethod;
};

const methodsArray = Object.values(HTTP_METHODS);

export const MethodsSelect = (props: MethodsSelectProps) => {
  const {
    onMethodChange,
    defaultValue = HTTP_METHODS.GET,
    className,
    ...rest
  } = props;

  return (
    <Select defaultValue={defaultValue} onValueChange={onMethodChange}>
      <SelectTrigger {...rest} className={cn("w-[100px]", className)}>
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        {methodsArray.map((method) => (
          <SelectItem key={method} value={method}>
            <RequestMethod size="sm" method={method} />
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
