import type { ResponseData } from "@/components/providers/request/request.types";
import { cn } from "@/utils/cn";
import type { ComponentProps } from "react";

export type ResponseTimelineProps = ComponentProps<"section"> & {
  response: ResponseData;
};

export const ResponseTimeline = (props: ResponseTimelineProps) => {
  const { response, className, ...rest } = props;

  return (
    <section {...rest} className={cn("", className)}>
      <div className="p-4 space-y-2">
        {response.timeline.map((item, index) => (
          <div key={index} className="grid grid-cols-[200px_1fr] gap-4">
            <div className="font-medium text-sm">{item.name}</div>
            <div className="text-sm font-mono">{item.time} ms</div>
          </div>
        ))}
      </div>
    </section>
  );
};
