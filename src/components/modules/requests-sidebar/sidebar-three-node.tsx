import type {
  ThreeNodeType,
  ThreeNodeWithRelations,
} from "@/api/three-node/three-nodes.schema";
import { Button } from "@/components/ui/button";
import { Collapsible } from "@/components/ui/collapsible";
import { Dropdown } from "@/components/ui/dropdown";
import { ApplicationUrls } from "@/const/application-urls";
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
  nodeId?: string;
  name: string;
  isExpanded?: boolean;
  item: ThreeNodeWithRelations;
  onAddNodeClick: (type: ThreeNodeType, parentId?: string) => void;
  onDeleteNodeClick: (nodeId: string) => void;
  onDuplicateNodeClick: (nodeId: string) => void;
};

export const SidebarTreeNode = (props: SidebarTreeNodeProps) => {
  const {
    nodeId,
    name,
    isExpanded: isDefaultExpanded = false,
    item,
    onDeleteNodeClick,
    onDuplicateNodeClick,
    onAddNodeClick,
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
                onClick: () => onAddNodeClick("remoteCall", nodeId),
              },
              {
                label: "Add Folder",
                id: "add-folder",
                icon: Folder,
                onClick: () => onAddNodeClick("node", nodeId),
              },
              {
                label: "Duplicate",
                id: "duplicate",
                icon: Copy,
                onClick: () => onDuplicateNodeClick(nodeId!),
              },

              {
                label: "Delete",
                id: "delete",
                color: "red",
                icon: Trash,
                onClick: () => onDeleteNodeClick(nodeId!),
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
        </div>
      </CollapsibleTrigger>

      <CollapsibleContent className="ml-4 border-l border-border">
        {item.childNodes!.map((item, index) => (
          <Fragment key={index}>
            {item.type === "node" && item.childNodes ? (
              <SidebarTreeNode
                nodeId={item.id}
                item={item}
                name={item.name}
                onDeleteNodeClick={onDeleteNodeClick}
                onDuplicateNodeClick={onDuplicateNodeClick}
                onAddNodeClick={onAddNodeClick}
              />
            ) : (
              <SidebarRequestThreeNode
                to={ApplicationUrls.redactor.request(item.id)}
                method={item.remoteCall?.method!}
                name={item.name}
                onDeleteNodeClick={() => onDeleteNodeClick(item.id)}
                onDuplicateNodeClick={() => onDuplicateNodeClick(item.id)}
              />
            )}
          </Fragment>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
};
