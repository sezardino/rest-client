import { Button } from "@/components/ui/button";
import { Dropdown } from "@/components/ui/dropdown";
import { cn } from "@/utils/cn";
import { Copy, Globe, MoreVertical, Trash } from "lucide-react";
import type { ComponentProps } from "react";
import { RequestMethod } from "./request-method";
import type { RequestItem } from "./requests-sidebar.types";

export type SidebarRequestItemProps = ComponentProps<"div"> &
  Pick<RequestItem, "method" | "name"> & {};

export const SidebarRequestItem = (props: SidebarRequestItemProps) => {
  const { method, name, className, ...rest } = props;

  return (
    <div
      {...rest}
      className={cn(
        "flex items-center px-3 py-1 hover:bg-muted/50 cursor-pointer group",
        className
      )}
    >
      <Globe className="mr-1.5 h-4 w-4 text-muted-foreground" />
      <RequestMethod method={method} />
      <span className="flex-1 truncate text-xs">{name}</span>

      <Dropdown
        options={[
          {
            label: "Duplicate",
            id: "duplicate",
            icon: Copy,
            onClick: () => console.log("Duplicate"),
          },
          {
            label: "Delete",
            id: "delete",
            icon: Trash,
            color: "red",
            onClick: () => console.log("Delete"),
          },
        ]}
      >
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 opacity-0 group-hover:opacity-100"
        >
          <MoreVertical className="h-3.5 w-3.5" />
        </Button>
      </Dropdown>
    </div>
  );
};
