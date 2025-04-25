import { Send } from "lucide-react";
import { type ComponentProps } from "react";

import { useRequest } from "@/components/providers/request";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import type { HTTPMethod } from "@/const/http-methods";
import { cn } from "@/utils/cn";

import { RequestAuth } from "../request-auth";
import { RequestBody } from "../request-body/request-body";
import { MethodsSelect } from "../shared/methods-select";
import { PanelTabs } from "../shared/panel-tabs";
import { RequestCookies } from "./request-cookies";
import { RequestHeaders } from "./request-headers";
import { RequestParams } from "./request-params";

const tabs = [
  { value: "params", label: "Params", component: RequestParams },
  { value: "headers", label: "Headers", component: RequestHeaders },
  { value: "body", label: "Body", component: RequestBody },
  { value: "auth", label: "Auth", component: RequestAuth },
  { value: "cookies", label: "Cookies", component: RequestCookies },
];

export type RequestPanelProps = ComponentProps<"div"> & {};

export const RequestPanel = (props: RequestPanelProps) => {
  const { className, ...rest } = props;

  const { request, setRequest, sendRequest, isLoading } = useRequest();

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRequest({ ...request, url: e.target.value });
  };

  const handleMethodChange = (method: HTTPMethod) => {
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
        <MethodsSelect
          onMethodChange={handleMethodChange}
          className="min-w-[100px]"
        />
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

      <PanelTabs
        tabs={tabs}
        commonProps={{ request, onRequestChange: setRequest }}
      />
    </div>
  );
};
