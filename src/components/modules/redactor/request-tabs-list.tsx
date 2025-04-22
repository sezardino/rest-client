import { useTabsStore } from "@/store/tabs.store";
import { cn } from "@/utils/cn";
import { Plus } from "lucide-react";
import type { ComponentProps } from "react";
import { RequestTabItem } from "./request-tab-item";

export type RequestTabsListProps = ComponentProps<"ul"> & {};

export const RequestTabsList = (props: RequestTabsListProps) => {
  const { className, ...rest } = props;

  const tabsStore = useTabsStore();

  return (
    <ul
      {...rest}
      className={cn(
        "flex items-center p-px gap-px overflow-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden bg-foreground",
        className
      )}
    >
      {tabsStore.tabs.map((tab) => (
        <li key={tab.id}>
          <RequestTabItem
            tab={tab}
            isActive={tabsStore.activeTabId === tab.id}
            onCloseTabClick={() => tabsStore.closeTab(tab.id)}
            onTabClick={() => tabsStore.setActiveTab(tab.id)}
          />
        </li>
      ))}
      <li>
        <button
          type="button"
          className="p-2 bg-muted-foreground text-muted select-none cursor-pointer"
          onClick={() => tabsStore.openTab()}
          aria-label="New tab"
        >
          <Plus />
        </button>
      </li>
    </ul>
  );
};
