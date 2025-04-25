import type { ResponseData } from "@/components/providers/request/request.types";
import { cn } from "@/utils/cn";
import type { ComponentProps } from "react";

export type ResponseCookiesProps = ComponentProps<"section"> & {
  response: ResponseData;
};

export const ResponseCookies = (props: ResponseCookiesProps) => {
  const { response, className, ...rest } = props;

  return (
    <section {...rest} className={cn("", className)}>
      <div className="p-4 space-y-2">
        {Object.entries(response.cookies).map(([key, value]) => (
          <div key={key} className="grid grid-cols-[200px_1fr] gap-4">
            <div className="font-medium text-sm">{key}</div>
            <div className="text-sm font-mono">{value}</div>
          </div>
        ))}
      </div>
    </section>
  );
};
