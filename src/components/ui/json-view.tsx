import { cn } from "@/utils/cn";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState, type ComponentProps } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./collapsible";

export type JsonViewProps = ComponentProps<"div"> & {
  data: any;
  level?: number;
};

export const JsonView = (props: JsonViewProps) => {
  const { data, level = 0, className, ...rest } = props;

  const [expanded, setExpanded] = useState(level < 2);

  if (typeof data !== "object" || data === null) {
    if (typeof data === "string")
      return <span className="text-green-400">"{data}"</span>;
    if (typeof data === "number")
      return <span className="text-yellow-400">{data}</span>;
    if (typeof data === "boolean")
      return <span className="text-purple-400">{data ? "true" : "false"}</span>;
    if (data === null) return <span className="text-gray-400">null</span>;
    return <span>{String(data)}</span>;
  }

  const isArray = Array.isArray(data);
  const isEmpty = Object.keys(data).length === 0;

  if (isEmpty) {
    return <span>{isArray ? "[]" : "{}"}</span>;
  }

  const ChevronIcon = expanded ? ChevronDown : ChevronRight;

  return (
    <div {...rest} className={cn("", className)}>
      <Collapsible open={expanded} onOpenChange={setExpanded}>
        <CollapsibleTrigger className="flex items-center cursor-pointer hover:bg-muted/30 -ml-4 pl-4">
          <ChevronIcon className="h-3.5 w-3.5 mr-1 text-muted-foreground" />

          <span>{isArray ? "[" : "{"}</span>
          {!expanded && <span className="text-muted-foreground ml-1">...</span>}
          {!expanded && <span className="ml-1">{isArray ? "]" : "}"}</span>}
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div>
            {Object.entries(data).map(([key, value], index) => (
              <div key={key} className="flex">
                <span className="text-blue-400 mr-1">
                  {isArray ? "" : `"${key}"`}
                  {isArray ? "" : ":"}
                </span>
                <JsonView data={value} level={level + 1} />
                {index < Object.keys(data).length - 1 && <span>,</span>}
              </div>
            ))}
          </div>
          <div>{isArray ? "]" : "}"}</div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};
