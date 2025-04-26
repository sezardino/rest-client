import type { ThreeNodeWithRelations } from "@/api/api.schema";
import { Button } from "@/components/ui/button";
import { Collapsible } from "@/components/ui/collapsible";
import { Dropdown } from "@/components/ui/dropdown";
import { cn } from "@/utils/cn";
import {
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import {
  ChevronDown,
  ChevronRight,
  Copy,
  Folder,
  FolderOpen,
  MoreVertical,
  Plus,
  Trash,
} from "lucide-react";
import { Fragment, useState, type ComponentProps } from "react";
import { SidebarRequestThreeNode } from "./sidebar-request-three-node";

export type SidebarTreeNodeProps = ComponentProps<"div"> & {
  name: string;
  isExpanded?: boolean;
  items: ThreeNodeWithRelations[];
};

export const SidebarTreeNode = (props: SidebarTreeNodeProps) => {
  const {
    name,
    isExpanded: isDefaultExpanded = false,
    items = [],
    className,
    ...rest
  } = props;

  const [expanded, setExpanded] = useState(isDefaultExpanded);

  const ChevronIcon = expanded ? ChevronDown : ChevronRight;
  const FolderIcon = expanded ? FolderOpen : Folder;

  return (
    <Collapsible
      {...rest}
      open={expanded}
      onOpenChange={setExpanded}
      defaultOpen={isDefaultExpanded}
      className={cn("text-sm", className)}
    >
      <CollapsibleTrigger className="text-left w-full flex items-center px-3 py-1 hover:bg-muted/50 cursor-pointer group">
        <ChevronIcon className="mr-1 h-3.5 w-3.5" />
        <FolderIcon className="mr-1.5 h-4 w-4 text-yellow-500" />
        <span className="flex-1 truncate">{name}</span>
        <div className="opacity-0 group-hover:opacity-100">
          <Dropdown
            options={[
              {
                label: "Add Request",
                id: "add-request",
                icon: Plus,
                onClick: () => console.log("Add Request"),
              },
              {
                label: "Add Folder",
                id: "add-folder",
                icon: Folder,
                onClick: () => console.log("Add Folder"),
              },
              {
                label: "Duplicate",
                id: "duplicate",
                icon: Copy,
                onClick: () => console.log("Duplicate"),
              },
              {
                label: "Delete",
                id: "delete",
                color: "red",
                icon: Trash,
                onClick: () => console.log("Delete"),
              },
            ]}
          >
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <MoreVertical className="h-3.5 w-3.5" />
            </Button>
          </Dropdown>
        </div>
      </CollapsibleTrigger>

      <CollapsibleContent className="ml-4 border-l border-border">
        {items.map((item, index) => (
          <Fragment key={index}>
            {item.type === "node" && item.childNodes ? (
              <SidebarTreeNode items={item.childNodes} name={item.name} />
            ) : (
              <SidebarRequestThreeNode
                method={item.remoteCall?.method!}
                name={item.name}
              />
            )}
          </Fragment>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
};
