import { useRequest } from "@/components/providers/request";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/utils/cn";
import { Clock } from "lucide-react";
import { type ComponentProps } from "react";
import { PanelTabs } from "../shared/panel-tabs";
import { PanelWrapper } from "../shared/panel-wrapper";
import { ResponseCookies } from "./response-cookies";
import { ResponseHeaders } from "./response-headers";
import { getStatusCodeColor } from "./response-panel.utils";
import { ResponsePretty } from "./response-pretty";
import { ResponseRaw } from "./response-raw";
import { ResponseTimeline } from "./response-timeline";

const tabs = [
  { value: "pretty", label: "Pretty", component: ResponsePretty },
  { value: "raw", label: "Raw", component: ResponseRaw },
  { value: "headers", label: "Headers", component: ResponseHeaders },
  { value: "cookies", label: "Cookies", component: ResponseCookies },
  { value: "timeline", label: "Timeline", component: ResponseTimeline },
];

export type ResponsePanelProps = ComponentProps<"section"> & {};

export const ResponsePanel = (props: ResponsePanelProps) => {
  const { className, ...rest } = props;

  const { isLoading, response } = useRequest();

  if (isLoading)
    return (
      <PanelWrapper {...rest} className={cn("justify-center", className)}>
        <LoadingSpinner label="Sending request..." />
      </PanelWrapper>
    );

  if (!response)
    return (
      <PanelWrapper
        {...rest}
        className={cn(
          "flex-1 text-center items-center justify-center",
          className
        )}
      >
        <p className="text-sm text-muted-foreground">
          Send a request to see the response
        </p>
      </PanelWrapper>
    );

  return (
    <PanelWrapper {...rest} className={cn("", className)}>
      <div className="flex items-center p-3 gap-4 bg-muted/30 border-b border-border">
        <div className="flex items-center gap-2">
          <span
            className={cn("font-semibold", getStatusCodeColor(response.status))}
          >
            {response.status}
          </span>
          <div className="text-sm text-muted-foreground">
            {response.statusText}
          </div>
        </div>
        <Separator orientation="vertical" className="h-4" />
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Clock className="h-3.5 w-3.5" />
          <span>{response.time} ms</span>
        </div>
        <div className="text-sm text-muted-foreground">{response.size}</div>
      </div>

      <PanelTabs tabs={tabs} commonProps={{ response }} />
    </PanelWrapper>
  );
};
