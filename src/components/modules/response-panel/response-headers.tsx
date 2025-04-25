import { useRequest } from "@/components/providers/request";
import { cn } from "@/utils/cn";
import type { ComponentProps } from "react";

export type ResponseHeadersProps = ComponentProps<"section"> & {};

export const ResponseHeaders = (props: ResponseHeadersProps) => {
  const { className, ...rest } = props;
  const { response } = useRequest();

  return (
    <section {...rest} className={cn("", className)}>
      <div className="p-4 space-y-2">
        {Object.entries(response!.headers).map(([key, value]) => (
          <div key={key} className="grid grid-cols-[200px_1fr] gap-4">
            <div className="font-medium text-sm">{key}</div>
            <div className="text-sm font-mono">{value}</div>
          </div>
        ))}
      </div>
    </section>
  );
};
