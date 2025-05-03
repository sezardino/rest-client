import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { Dropdown } from "@/components/ui/dropdown";
import { Input } from "@/components/ui/input";
import { ApplicationUrls } from "@/const/application-urls";
import { useDeleteTreeNodeMutation } from "@/hooks/tanstack/tree-nodes/delete-tree-node.mutation";
import { useTreeNodeListQuery } from "@/hooks/tanstack/tree-nodes/tree-node-list.query";
import { cn } from "@/utils/cn";
import { FileDown, FileUp, Folder, MoreVertical, Plus } from "lucide-react";
import { useState } from "react";
import {
  CreateTreeNodeDialog,
  type CreateTreeNodeDialogProps,
} from "../create-tree-node";
import { DuplicateTreeNodeDialog } from "../duplicate-tree-node";
import { SidebarRequestTreeNode } from "./sidebar-request-tree-node";
import { SidebarTreeNode } from "./sidebar-tree-node";

interface SidebarProps {
  collapsed: boolean;
}

export function Sidebar({ collapsed }: SidebarProps) {
  const [filter, setFilter] = useState("");

  const [nodeToDelete, setNodeToDelete] = useState<string | null>(null);
  const [createType, setCreateType] = useState<
    CreateTreeNodeDialogProps["type"] | null
  >(null);
  const [parentNodeId, setParentNodeId] = useState<string | null>(null);
  const [nodeToDuplicate, setNodeToDuplicate] = useState<string | null>(null);

  const { data: treeNodes, isLoading: isTreeNodesLoading } =
    useTreeNodeListQuery();
  const { mutateAsync: deleteTreeNode, isPending: isDeleteNodeLoading } =
    useDeleteTreeNodeMutation();

  const deleteNodeHandler = async () => {
    if (!nodeToDelete) return;

    await deleteTreeNode(nodeToDelete);
    setNodeToDelete(null);
  };

  const closeCreateNodeDialog = () => {
    setCreateType(null);
    setParentNodeId(null);
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
          {treeNodes?.map((item) => (
            <li key={item.id}>
              {item.type === "remoteCall" && (
                <SidebarRequestTreeNode
                  to={ApplicationUrls.redactor.request(item.id)}
                  method={item.remoteCall?.method!}
                  name={item.name}
                  onDeleteNodeClick={() => setNodeToDelete(item.id)}
                  onDuplicateNodeClick={() => setNodeToDuplicate(item.id)}
                />
              )}
              {item.type === "node" && (
                <SidebarTreeNode
                  name={item.name}
                  item={item}
                  nodeId={item.id}
                  onDeleteNodeClick={setNodeToDelete}
                  onAddNodeClick={(type, parentId) => {
                    setCreateType(type);
                    parentId && setParentNodeId(parentId);
                  }}
                  onDuplicateNodeClick={setNodeToDuplicate}
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
            onClick={() => setCreateType("remoteCall")}
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
        <CreateTreeNodeDialog
          type={createType}
          parentNodeId={parentNodeId}
          isOpen={!!createType}
          onClose={closeCreateNodeDialog}
        />
      )}

      {nodeToDuplicate && (
        <DuplicateTreeNodeDialog
          nodeId={nodeToDuplicate}
          isOpen={!!nodeToDuplicate}
          onClose={() => setNodeToDuplicate(null)}
        />
      )}
    </>
  );
}
