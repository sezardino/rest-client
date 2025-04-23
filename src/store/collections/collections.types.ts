export type CollectionNode = {
  id: string;
  name: string;
  type: "folder" | "request";
  parentId: string | null;
  requestId?: string;
};

export type CollectionsStoreState = {
  tree: Record<string, CollectionNode>;
  addFolder: (name: string, parentId: string | null) => string;
  addRequestNode: (
    name: string,
    requestId: string,
    parentId: string | null
  ) => string;
  renameNode: (id: string, newName: string) => void;
  moveNode: (id: string, newParentId: string | null) => void;
  deleteNode: (id: string) => void;
  removeRequestNode: (requestId: string) => void;
};
