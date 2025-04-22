import type { RequestTab } from "@/entity";
import { nanoid } from "nanoid";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type TabsState = {
  tabs: RequestTab[];
  activeTabId: string | null;

  openNewTab: () => void;
  openTab: (tabId: string) => void;
  closeTab: (tabId: string) => void;
  setActiveTab: (tabId: string) => void;
};

const NEW_TAB_NAME = "New Tab";

export const useTabsStore = create<TabsState>()(
  persist(
    (set, get) => ({
      tabs: [],
      activeTabId: null,

      openTab: (tabId) =>
        set(() => ({
          activeTabId: tabId,
        })),

      openNewTab: () => {
        const id = nanoid();

        set((store) => ({
          activeTabId: id,
          tabs: [...store.tabs, { id, title: NEW_TAB_NAME }],
        }));
      },

      closeTab: (tabId) => {
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
    }),
    {
      name: "tabs-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
