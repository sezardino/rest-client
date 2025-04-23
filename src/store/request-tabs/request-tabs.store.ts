import { nanoid } from "nanoid";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { NEW_REQUEST_TAB_NAME } from "./request-tabs.const";
import type { RequestTabsStoreState } from "./request-tabs.types";

export const useRequestTabsStore = create<RequestTabsStoreState>()(
  persist(
    (set, get) => ({
      tabs: [],
      activeTabId: null,

      create: (requestId) => {
        const id = nanoid();

        set((store) => ({
          activeTabId: id,
          tabs: [...store.tabs, { id, requestId, title: NEW_REQUEST_TAB_NAME }],
        }));

        return id;
      },

      update: (tabId, payload) => {
        const { tabs } = get();

        const neededTab = tabs.find((tab) => tab.id === tabId);

        if (!neededTab) return;

        const newTabs = tabs.map((tab) => {
          if (tab.id === tabId) return { ...tab, ...payload };

          return tab;
        });

        set({ tabs: newTabs });
      },

      delete: (tabId) => {
        const { activeTabId, tabs } = get();

        const tabIndex = tabs.findIndex((tab) => tab.id === tabId);

        if (tabIndex === -1) return;

        const isActiveTab = activeTabId === tabId;
        const newTabs = tabs.filter((t) => t.id !== tabId);
        const newActiveTabId = isActiveTab
          ? tabs[tabIndex - 1]?.id ?? tabs[tabIndex + 1]?.id ?? null
          : activeTabId;

        set({ tabs: newTabs, activeTabId: newActiveTabId });
      },

      setActiveTab: (tabId) => {
        const { tabs, activeTabId } = get();

        if (tabId === activeTabId) return;

        const neededTab = tabs.find((tab) => tab.id === tabId);

        if (!neededTab) return;

        set({ activeTabId: tabId });
      },

      closeAllTabsForRequest: (requestId) => {},
    }),
    {
      name: "tabs-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
