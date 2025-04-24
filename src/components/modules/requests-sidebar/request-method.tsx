import type { HTTPMethod } from "@/const/http-methods";
import { cn } from "@/utils/cn";
import type { ComponentProps } from "react";

export type RequestMethodProps = ComponentProps<"span"> & {
  method: HTTPMethod;
};

const methodColorsMap: Record<HTTPMethod, string> = {
  GET: "text-green-500",
  POST: "text-yellow-500",
  PUT: "text-blue-500",
  DELETE: "text-red-500",
  PATCH: "text-purple-500",
};

export const RequestMethod = (props: RequestMethodProps) => {
  const { method, className, ...rest } = props;

  return (
    <span
      {...rest}
      className={cn(
        "text-xs font-semibold mr-2 w-12",
        methodColorsMap[method] || "text-gray-500",
        className
      )}
    >
      {method}
    </span>
  );
};
