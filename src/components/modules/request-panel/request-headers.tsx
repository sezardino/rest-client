import { useRequest } from "@/components/providers/request";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/utils/cn";
import { Plus, Trash } from "lucide-react";
import { useState, type ComponentProps } from "react";

export type RequestHeadersProps = ComponentProps<"section"> & {};

export const RequestHeaders = (props: RequestHeadersProps) => {
  const { className, ...rest } = props;

  const { request, setRequest } = useRequest();
  const [headers, setHeaders] = useState(request.headers);

  const addHeader = () => {
    const newHeaders = [...headers, { key: "", value: "", enabled: true }];
    setHeaders(newHeaders);
    setRequest({ ...request, headers: newHeaders });
  };

  const removeHeader = (index: number) => {
    const newHeaders = headers.filter((_, i) => i !== index);
    setHeaders(newHeaders);
    setRequest({ ...request, headers: newHeaders });
  };

  const updateHeader = (
    index: number,
    field: "key" | "value" | "enabled",
    value: string | boolean
  ) => {
    const newHeaders = [...headers];
    newHeaders[index] = { ...newHeaders[index], [field]: value };
    setHeaders(newHeaders);
    setRequest({ ...request, headers: newHeaders });
  };

  // Common headers for autocomplete
  const commonHeaders = [
    "Accept",
    "Authorization",
    "Content-Type",
    "User-Agent",
    "X-Requested-With",
  ];

  return (
    <section {...rest} className={cn("", className)}>
      <div className="grid grid-cols-[auto_1fr_1fr_auto] gap-2 p-2 bg-muted/50 border-b">
        <div className="w-14 text-xs font-medium pl-2">ENABLED</div>
        <div className="text-xs font-medium">KEY</div>
        <div className="text-xs font-medium">VALUE</div>
        <div className="w-8"></div>
      </div>
      <div className="p-2 space-y-2">
        {headers.map((header, index) => (
          <div
            key={index}
            className="grid grid-cols-[auto_1fr_1fr_auto] gap-2 items-center"
          >
            <div className="flex justify-center">
              <Switch
                checked={header.enabled}
                onCheckedChange={(checked) =>
                  updateHeader(index, "enabled", checked)
                }
                // size="sm"
              />
            </div>
            <Input
              value={header.key}
              onChange={(e) => updateHeader(index, "key", e.target.value)}
              placeholder="header_name"
              className="h-8 text-sm font-mono"
              list={`header-suggestions-${index}`}
            />
            <datalist id={`header-suggestions-${index}`}>
              {commonHeaders.map((header) => (
                <option key={header} value={header} />
              ))}
            </datalist>
            <Input
              value={header.value}
              onChange={(e) => updateHeader(index, "value", e.target.value)}
              placeholder="value"
              className="h-8 text-sm font-mono"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeHeader(index)}
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
          onClick={addHeader}
          className="w-full justify-start gap-1 text-xs"
        >
          <Plus className="h-3.5 w-3.5" />
          Add Header
        </Button>
      </div>
    </section>
  );
};
