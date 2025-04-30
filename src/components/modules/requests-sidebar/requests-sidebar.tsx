import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { Dropdown } from "@/components/ui/dropdown";
import { Input } from "@/components/ui/input";
import { useDeleteThreeNodeMutation } from "@/hooks/tanstack/three-nodes/delete-three-node.mutation";
import { useThreeNodeListQuery } from "@/hooks/tanstack/three-nodes/three-node-list.query";
import { cn } from "@/utils/cn";
import { FileDown, FileUp, Folder, MoreVertical, Plus } from "lucide-react";
import { useState } from "react";
import {
  CreateThreeNodeDialog,
  type CreateThreeNodeDialogProps,
} from "./create-three-node-dialog";
import { SidebarRequestThreeNode } from "./sidebar-request-three-node";
import { SidebarTreeNode } from "./sidebar-three-node";

interface SidebarProps {
  collapsed: boolean;
}

export function Sidebar({ collapsed }: SidebarProps) {
  const [filter, setFilter] = useState("");

  const [nodeToDelete, setNodeToDelete] = useState<string | null>(null);
  const [createType, setCreateType] = useState<
    CreateThreeNodeDialogProps["type"] | null
  >(null);

  const { data: threeNodes, isLoading: isThreeNodesLoading } =
    useThreeNodeListQuery();
  const { mutateAsync: deleteThreeNode, isPending: isDeleteNodeLoading } =
    useDeleteThreeNodeMutation();

  const deleteNodeHandler = async () => {
    if (!nodeToDelete) return;

    await deleteThreeNode(nodeToDelete);
    setNodeToDelete(null);
  };

  return (
    <>
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
              <Dropdown
                options={[
                  {
                    label: "Create Request",
                    id: "create-request",
                    icon: Plus,
                    onClick: () => setCreateType("remoteCall"),
                  },
                  {
                    label: "Create Folder",
                    id: "create-folder",
                    icon: Folder,
                    onClick: () => setCreateType("node"),
                  },
                ]}
              >
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Plus className="h-4 w-4" />
                  <span className="sr-only">Create Request</span>
                </Button>
              </Dropdown>

              <Dropdown
                options={[
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

        <ul className="flex-1 overflow-auto">
          {threeNodes?.map((item) => (
            <li key={item.id}>
              {item.type === "remoteCall" && (
                <SidebarRequestThreeNode
                  method={item.remoteCall?.method!}
                  name={item.name}
                  onDeleteNodeClick={() => setNodeToDelete(item.id)}
                  onDuplicateNodeClick={() => console.log("Duplicate", item.id)}
                />
              )}
              {item.type === "node" && (
                <SidebarTreeNode
                  name={item.name}
                  item={item}
                  onDeleteNodeClick={setNodeToDelete}
                  onDuplicateNodeClick={(nodeId) =>
                    console.log("Duplicate", nodeId)
                  }
                  className="flex-1 overflow-auto"
                />
              )}
            </li>
          ))}
        </ul>

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

      <ConfirmDialog
        isOpen={!!nodeToDelete}
        onClose={() => setNodeToDelete(null)}
        onConfirm={deleteNodeHandler}
        isLoading={isDeleteNodeLoading}
        title="Delete node?"
        description="This action cant be undone"
        confirmText="Delete"
        confirmVariant="destructive"
      />

      {createType && (
        <CreateThreeNodeDialog
          type={createType}
          isOpen={!!createType}
          onClose={() => setCreateType(null)}
        />
      )}
    </>
  );
}
