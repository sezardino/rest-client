import { useRequest } from "@/components/providers/request";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/utils/cn";
import { Plus, Trash } from "lucide-react";
import { useState, type ComponentProps } from "react";

export type RequestCookiesProps = ComponentProps<"section"> & {};

export const RequestCookies = (props: RequestCookiesProps) => {
  const { className, ...rest } = props;

  const { request, setRequest } = useRequest();
  const [cookies, setCookies] = useState(request.cookies);

  const addCookie = () => {
    const newCookies = [...cookies, { key: "", value: "", enabled: true }];
    setCookies(newCookies);
    setRequest({ ...request, cookies: newCookies });
  };

  const removeCookie = (index: number) => {
    const newCookies = cookies.filter((_, i) => i !== index);
    setCookies(newCookies);
    setRequest({ ...request, cookies: newCookies });
  };

  const updateCookie = (
    index: number,
    field: "key" | "value" | "enabled",
    value: string | boolean
  ) => {
    const newCookies = [...cookies];
    newCookies[index] = { ...newCookies[index], [field]: value };
    setCookies(newCookies);
    setRequest({ ...request, cookies: newCookies });
  };

  return (
    <section {...rest} className={cn("", className)}>
      <div className="grid grid-cols-[auto_1fr_1fr_auto] gap-2 p-2 bg-muted/50 border-b">
        <div className="w-14 text-xs font-medium pl-2">ENABLED</div>
        <div className="text-xs font-medium">NAME</div>
        <div className="text-xs font-medium">VALUE</div>
        <div className="w-8"></div>
      </div>
      <div className="p-2 space-y-2">
        {cookies.map((cookie, index) => (
          <div
            key={index}
            className="grid grid-cols-[auto_1fr_1fr_auto] gap-2 items-center"
          >
            <div className="flex justify-center">
              <Switch
                checked={cookie.enabled}
                onCheckedChange={(checked) =>
                  updateCookie(index, "enabled", checked)
                }
                // size="sm"
              />
            </div>
            <Input
              value={cookie.key}
              onChange={(e) => updateCookie(index, "key", e.target.value)}
              placeholder="cookie_name"
              className="h-8 text-sm font-mono"
            />
            <Input
              value={cookie.value}
              onChange={(e) => updateCookie(index, "value", e.target.value)}
              placeholder="value"
              className="h-8 text-sm font-mono"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeCookie(index)}
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
          onClick={addCookie}
          className="w-full justify-start gap-1 text-xs"
        >
          <Plus className="h-3.5 w-3.5" />
          Add Cookie
        </Button>
      </div>
    </section>
  );
};
