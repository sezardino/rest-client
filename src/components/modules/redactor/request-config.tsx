import { Button } from "@/components/ui/button";
import { cn } from "@/utils/cn";
import type { ComponentProps } from "react";
import { MethodsSelect } from "../shared/methods-select";

export type RequestConfigProps = ComponentProps<"div"> & {};

export const RequestConfig = (props: RequestConfigProps) => {
  const { className, ...rest } = props;

  return (
    <div {...rest} className={cn("flex items-center gap-2", className)}>
      <MethodsSelect onMethodChange={console.log} />
      <div contentEditable className="p-2 w-full outline-0 text-white">
        https://jsonplaceholder.typicode.com/posts
      </div>
      <Button variant={"secondary"}>Send</Button>
    </div>
  );
};
