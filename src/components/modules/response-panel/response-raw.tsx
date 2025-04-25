import type { ResponseData } from "@/components/providers/request/request.types";
import { cn } from "@/utils/cn";
import type { ComponentProps } from "react";

export type ResponseRawProps = ComponentProps<"section"> & {
  response: ResponseData;
};

export const ResponseRaw = (props: ResponseRawProps) => {
  const { response, className, ...rest } = props;

  return (
    <section {...rest} className={cn("", className)}>
      <pre className="p-4 text-sm font-mono overflow-auto h-full">
        {JSON.stringify(response.body, null, 2)}
      </pre>
    </section>
  );
};
