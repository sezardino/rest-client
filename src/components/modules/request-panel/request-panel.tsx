import { useRequest } from "@/components/providers/request";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/utils/cn";
import { Send } from "lucide-react";
import { useState, type ComponentProps } from "react";
import { MethodsSelect } from "../redactor/methods-select";
import { RequestAuth } from "./request-auth";
import { RequestBody } from "./request-body";
import { RequestCookies } from "./request-cookies";
import { RequestHeaders } from "./request-headers";
import { RequestParams } from "./request-params";

export type RequestPanelProps = ComponentProps<"div"> & {};

const tabs = [
  { value: "params", label: "Params", component: RequestParams },
  { value: "headers", label: "Headers", component: RequestHeaders },
  { value: "body", label: "Body", component: RequestBody },
  { value: "auth", label: "Auth", component: RequestAuth },
  { value: "cookies", label: "Cookies", component: RequestCookies },
];

export const RequestPanel = (props: RequestPanelProps) => {
  const { className, ...rest } = props;

  const { request, setRequest, sendRequest, isLoading } = useRequest();
  const [activeTab, setActiveTab] = useState("params");

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRequest({ ...request, url: e.target.value });
  };

  const handleMethodChange = (method: string) => {
    setRequest({ ...request, method: method as any });
  };

  return (
    <div
      {...rest}
      className={cn(
        "grid grid-cols-1 grid-rows-[auto_1fr] border-r border-border overflow-hidden pt-4 gap-4",
        className
      )}
    >
      <header className="px-4 flex items-center gap-2">
        <MethodsSelect onChange={console.log} />
        <Input
          value={request.url}
          onChange={handleUrlChange}
          placeholder="https://api.example.com/endpoint"
          className="font-mono text-sm"
        />
        <Button
          onClick={sendRequest}
          disabled={isLoading || !request.url}
          className="gap-2"
        >
          <Send className="h-4 w-4" />
          Send
        </Button>
      </header>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="px-4 h-full flex flex-col"
      >
        <TabsList className="grid grid-cols-5 w-full max-w-md">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <div className="mt-2 flex-1 overflow-auto">
          {tabs.map((tab) => (
            <TabsContent
              key={tab.value}
              asChild
              value={tab.value}
              className="h-full border rounded-md"
            >
              <tab.component />
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  );
};
