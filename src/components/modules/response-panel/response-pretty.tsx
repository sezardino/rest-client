import { useRequest } from "@/components/providers/request";
import { Button } from "@/components/ui/button";
import { JsonView } from "@/components/ui/json-view";
import { cn } from "@/utils/cn";
import { Copy } from "lucide-react";
import type { ComponentProps } from "react";

export type ResponsePrettyProps = ComponentProps<"section"> & {};

export const ResponsePretty = (props: ResponsePrettyProps) => {
  const { className, ...rest } = props;
  const { response } = useRequest();

  return (
    <section {...rest} className={cn("", className)}>
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={() =>
          navigator.clipboard.writeText(JSON.stringify(response!.body, null, 2))
        }
      >
        <Copy className="h-4 w-4" />
        <span className="sr-only">Copy</span>
      </Button>
      <div className="p-4 text-sm font-mono">
        <JsonView data={response!.body} />
      </div>
    </section>
  );
};
