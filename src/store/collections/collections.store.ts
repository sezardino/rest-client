import { nanoid } from "nanoid";
import { create } from "zustand";
import type {
  CollectionNode,
  CollectionsStoreState,
} from "./collections.types";

export const useCollectionsStore = create<CollectionsStoreState>(
  (set, get) => ({
    tree: {},

    addFolder: (name, parentId) => {
      const id = nanoid();
      const newNode: CollectionNode = {
        id,
        name,
        type: "folder",
        parentId,
      };
      set((state) => ({
        tree: {
          ...state.tree,
          [id]: newNode,
        },
      }));
      return id;
    },

    addRequestNode: (name, requestId, parentId) => {
      const id = nanoid();
      const newNode: CollectionNode = {
        id,
        name,
        type: "request",
        parentId,
        requestId,
      };
      set((state) => ({
        tree: {
          ...state.tree,
          [id]: newNode,
        },
      }));
      return id;
    },

    renameNode: (id, newName) => {
      const { tree } = get();
      const node = tree[id];
      if (!node) return;

      set({
        tree: {
          ...tree,
          [id]: { ...node, name: newName },
        },
      });
    },

    moveNode: (id, newParentId) => {
      const { tree } = get();
      const node = tree[id];
      if (!node) return;

      set({
        tree: {
          ...tree,
          [id]: { ...node, parentId: newParentId },
        },
      });
    },

    deleteNode: (id) => {
      const { tree } = get();

      // рекурсивно удаляем все дочерние узлы
      const collectDescendants = (targetId: string): string[] => {
        const children = Object.values(tree)
          .filter((n) => n.parentId === targetId)
          .flatMap((n) => [n.id, ...collectDescendants(n.id)]);
        return children;
      };

      const toDelete = [id, ...collectDescendants(id)];
      const newTree = { ...tree };
      toDelete.forEach((nodeId) => delete newTree[nodeId]);

      set({ tree: newTree });
    },

    removeRequestNode: (requestId) => {
      const { tree } = get();
      const nodeEntry = Object.entries(tree).find(
        ([, node]) => node.type === "request" && node.requestId === requestId
      );
      if (!nodeEntry) return;
      const [nodeId] = nodeEntry;
      const newTree = { ...tree };
      delete newTree[nodeId];
      set({ tree: newTree });
    },
  })
);
