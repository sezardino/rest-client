import { useRequest } from "@/components/providers/request";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/utils/cn";
import { Clock } from "lucide-react";
import { useState, type ComponentProps } from "react";
import { ResponseCookies } from "./response-cookies";
import { ResponseHeaders } from "./response-headers";
import { getStatusCodeColor } from "./response-panel.utils";
import { ResponsePretty } from "./response-pretty";
import { ResponseRaw } from "./response-raw";
import { ResponseTimeline } from "./response-timeline";

export type ResponsePanelProps = ComponentProps<"section"> & {};

const tabs = [
  { value: "pretty", label: "Pretty", component: ResponsePretty },
  { value: "raw", label: "Raw", component: ResponseRaw },
  { value: "headers", label: "Headers", component: ResponseHeaders },
  { value: "cookies", label: "Cookies", component: ResponseCookies },
  { value: "timeline", label: "Timeline", component: ResponseTimeline },
];

export const ResponsePanel = (props: ResponsePanelProps) => {
  const { className, ...rest } = props;

  const { isLoading, response } = useRequest();
  const [activeTab, setActiveTab] = useState("pretty");

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <div className="text-sm text-muted-foreground">
            Sending request...
          </div>
        </div>
      </div>
    );
  }

  if (!response) {
    return (
      <div className="flex-1 border-t border-border p-4 flex items-center justify-center">
        <div className="text-sm text-muted-foreground">
          Send a request to see the response
        </div>
      </div>
    );
  }

  return (
    <section
      {...rest}
      className={cn("flex flex-col overflow-hidden", className)}
    >
      <div className="flex items-center p-3 gap-4 bg-muted/30 border-b border-border">
        <div className="flex items-center gap-2">
          <div
            className={cn("font-semibold", getStatusCodeColor(response.status))}
          >
            {response.status}
          </div>
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

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="flex-1 flex flex-col"
      >
        <div className="border-b">
          <TabsList className="h-10 w-full justify-start rounded-none bg-transparent p-0">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {tabs.map((tab) => (
          <TabsContent
            key={tab.value}
            value={tab.value}
            asChild
            className="flex-1 p-0 overflow-auto elative group"
          >
            <tab.component />
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
};
