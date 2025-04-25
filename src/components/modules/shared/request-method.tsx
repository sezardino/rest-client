import type { HTTPMethod } from "@/const/http-methods";
import { cn } from "@/utils/cn";
import type { ComponentProps } from "react";

type RequestMethodSizes = "xs" | "sm";

export type RequestMethodProps = ComponentProps<"span"> & {
  method: HTTPMethod;
  size?: RequestMethodSizes;
};

const methodColorsMap: Record<HTTPMethod, string> = {
  GET: "text-green-500",
  POST: "text-yellow-500",
  PUT: "text-blue-500",
  DELETE: "text-red-500",
  PATCH: "text-purple-500",
};

const methodSizesMap: Record<RequestMethodSizes, string> = {
  xs: "text-xs",
  sm: "text-sm",
};

export const RequestMethod = (props: RequestMethodProps) => {
  const { size = "xs", method, className, ...rest } = props;

  return (
    <span
      {...rest}
      className={cn(
        "font-semibold mr-2 w-12",
        methodSizesMap[size],
        methodColorsMap[method],
        className
      )}
    >
      {method}
    </span>
  );
};
