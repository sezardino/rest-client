import { Button } from "@/components/ui/button";
import { Dropdown } from "@/components/ui/dropdown";
import { cn } from "@/utils/cn";
import { Copy, Globe, MoreVertical, Trash } from "lucide-react";
import type { ComponentProps } from "react";
import { RequestMethod } from "../shared/request-method";
import type { RequestItem } from "./requests-sidebar.types";

export type SidebarRequestThreeNodeProps = ComponentProps<"li"> &
  Pick<RequestItem, "method" | "name"> & {
    onDeleteNodeClick: () => void;
    onDuplicateNodeClick: () => void;
  };

export const SidebarRequestThreeNode = (
  props: SidebarRequestThreeNodeProps
) => {
  const {
    method,
    name,
    onDeleteNodeClick,
    onDuplicateNodeClick,
    className,
    ...rest
  } = props;

  return (
    <li
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
            onClick: onDuplicateNodeClick,
          },
          {
            label: "Delete",
            id: "delete",
            icon: Trash,
            color: "red",
            onClick: onDeleteNodeClick,
          },
        ]}
      >
        <Button
          variant="ghost"
          size="icon"
          asChild
          isNotButton
          className="h-6 w-6 opacity-0 group-hover:opacity-100"
          aria-label="Open actions menu"
        >
          <span>
            <MoreVertical className="h-3.5 w-3.5" />
          </span>
        </Button>
      </Dropdown>
    </li>
  );
};
