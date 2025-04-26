import { Button } from "@/components/ui/button";
import { Dropdown } from "@/components/ui/dropdown";
import { Input } from "@/components/ui/input";
import { useThreeNodeListQuery } from "@/hooks/tanstack/query/three-node/three-node.list";
import { cn } from "@/utils/cn";
import { FileDown, FileUp, Folder, MoreVertical, Plus } from "lucide-react";
import { useState } from "react";
import { SidebarTreeNode } from "./sidebar-three-node";

interface SidebarProps {
  collapsed: boolean;
}

export function Sidebar({ collapsed }: SidebarProps) {
  const [filter, setFilter] = useState("");

  const { data: threeNodes, isLoading: isThreeNodesLoading } =
    useThreeNodeListQuery();

  return (
    <aside
      className={cn(
        "flex flex-col border-r border-border bg-background transition-all duration-300 overflow-hidden",
        collapsed ? "w-0" : "w-64"
      )}
    >
      <header className="p-3 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase">Requests</h2>
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <Plus className="h-4 w-4" />
              <span className="sr-only">Create Request</span>
            </Button>

            <Dropdown
              options={[
                {
                  label: "Create Request",
                  id: "create-request",
                  icon: Plus,
                  onClick: () => console.log("Create Request"),
                },
                {
                  label: "Create Folder",
                  id: "create-folder",
                  icon: Folder,
                  onClick: () => console.log("Create Folder"),
                },
                {
                  label: "Import",
                  id: "import",
                  icon: FileDown,
                  onClick: () => console.log("Import"),
                },
                {
                  label: "Export",
                  id: "export",
                  icon: FileUp,
                  onClick: () => console.log("Export"),
                },
              ]}
            >
              <Button variant="ghost" size="icon" className={"h-6 w-6"}>
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">More options</span>
              </Button>
            </Dropdown>
          </div>
        </div>
        <Input
          placeholder="Filter requests..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="h-7 text-xs"
        />
      </header>

      <SidebarTreeNode
        name="API Collection"
        isExpanded={true}
        items={threeNodes!}
        className="flex-1 overflow-auto"
      />

      <footer className="p-3 border-t border-border">
        <Button
          variant="outline"
          className="w-full justify-start gap-2 text-xs"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>Create Request</span>
        </Button>
      </footer>
    </aside>
  );
}
