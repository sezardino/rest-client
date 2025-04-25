import { useRequest } from "@/components/providers/request";
import { cn } from "@/utils/cn";
import type { ComponentProps } from "react";

export type ResponseRawProps = ComponentProps<"section"> & {};

export const ResponseRaw = (props: ResponseRawProps) => {
  const { className, ...rest } = props;
  const { response } = useRequest();

  return (
    <section {...rest} className={cn("", className)}>
      <pre className="p-4 text-sm font-mono overflow-auto h-full">
        {JSON.stringify(response!.body, null, 2)}
      </pre>
    </section>
  );
};
