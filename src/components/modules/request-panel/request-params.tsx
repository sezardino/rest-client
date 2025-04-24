"use client";

import { useRequest } from "@/components/providers/request";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/utils/cn";
import { Plus, Trash } from "lucide-react";
import { useState, type ComponentProps } from "react";

export type RequestParamsProps = ComponentProps<"section"> & {};

export const RequestParams = (props: RequestParamsProps) => {
  const { className, ...rest } = props;

  const { request, setRequest } = useRequest();
  const [params, setParams] = useState(request.params);

  const addParam = () => {
    const newParams = [...params, { key: "", value: "", enabled: true }];
    setParams(newParams);
    setRequest({ ...request, params: newParams });
  };

  const removeParam = (index: number) => {
    const newParams = params.filter((_, i) => i !== index);
    setParams(newParams);
    setRequest({ ...request, params: newParams });
  };

  const updateParam = (
    index: number,
    field: "key" | "value" | "enabled",
    value: string | boolean
  ) => {
    const newParams = [...params];
    newParams[index] = { ...newParams[index], [field]: value };
    setParams(newParams);
    setRequest({ ...request, params: newParams });
  };

  return (
    <section {...rest} className={cn("", className)}>
      <div className="grid grid-cols-[auto_1fr_1fr_auto] gap-2 p-2 bg-muted/50 border-b">
        <div className="w-14 text-xs font-medium pl-2">ENABLED</div>
        <div className="text-xs font-medium">KEY</div>
        <div className="text-xs font-medium">VALUE</div>
        <div className="w-8"></div>
      </div>
      <div className="p-2 space-y-2">
        {params.map((param, index) => (
          <div
            key={index}
            className="grid grid-cols-[auto_1fr_1fr_auto] gap-2 items-center"
          >
            <div className="flex justify-center">
              <Switch
                checked={param.enabled}
                onCheckedChange={(checked) =>
                  updateParam(index, "enabled", checked)
                }
                // size="sm"
              />
            </div>
            <Input
              value={param.key}
              onChange={(e) => updateParam(index, "key", e.target.value)}
              placeholder="parameter_name"
              className="h-8 text-sm font-mono"
            />
            <Input
              value={param.value}
              onChange={(e) => updateParam(index, "value", e.target.value)}
              placeholder="value"
              className="h-8 text-sm font-mono"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeParam(index)}
              className="h-8 w-8"
            >
              <Trash className="h-4 w-4" />
              <span className="sr-only">Remove</span>
            </Button>
          </div>
        ))}
        <Button
          variant="ghost"
          size="sm"
          onClick={addParam}
          className="w-full justify-start gap-1 text-xs"
        >
          <Plus className="h-3.5 w-3.5" />
          Add Parameter
        </Button>
      </div>
    </section>
  );
};
