import { Button } from "@/components/ui/button";
import { useRequestTabsStore } from "@/store/request-tabs/request-tabs.store";
import { cn } from "@/utils/cn";
import { ArrowLeft, ArrowRight, Plus } from "lucide-react";
import { useEffect, useRef, type ComponentProps } from "react";
import { RequestTabItem } from "./request-tab-item";

export type RequestTabsListProps = ComponentProps<"div"> & {};

const SCROLL_STEP = 100;

export const RequestTabsList = (props: RequestTabsListProps) => {
  const { className, ...rest } = props;
  const listRef = useRef<HTMLUListElement>(null);
  const componentRef = useRef<HTMLDivElement>(null);

  const tabsStore = useRequestTabsStore();

  const hasScroll =
    (componentRef.current?.scrollWidth || 0) <
    (listRef.current?.scrollWidth || 0);

  useEffect(() => {
    if (!listRef.current) return;

    scrollList(listRef.current.scrollWidth, false);
  }, [tabsStore.activeTabId]);

  const scrollList = (left: number, isStep = true) => {
    if (!listRef.current) return;

    const currentScrollLeft = listRef.current.scrollLeft;

    listRef.current.scrollTo({
      left: isStep ? currentScrollLeft + left : left,
      behavior: "smooth",
    });
  };

  return (
    <div
      {...rest}
      ref={componentRef}
      className={cn(
        "flex items-center justify-between gap-1 p-px bg-muted-foreground/50 w-full",
        className
      )}
    >
      {hasScroll && (
        <Button
          size={"icon"}
          variant={"ghost"}
          className="text-muted"
          onClick={() => scrollList(-SCROLL_STEP)}
          aria-label="Scroll left"
        >
          <ArrowLeft />
        </Button>
      )}
      <ul
        ref={listRef}
        className="flex items-center gap-px overflow-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {tabsStore.tabs.map((tab) => (
          <li key={tab.id}>
            <RequestTabItem
              tab={tab}
              isActive={tabsStore.activeTabId === tab.id}
              onCloseTabClick={() => tabsStore.delete(tab.id)}
              onTabClick={() => tabsStore.setActiveTab(tab.id)}
            />
          </li>
        ))}
      </ul>
      {hasScroll && (
        <Button
          size={"icon"}
          variant={"ghost"}
          className="text-muted"
          onClick={() => scrollList(SCROLL_STEP)}
          aria-label="Scroll right"
        >
          <ArrowRight />
        </Button>
      )}
      <Button
        size={"icon"}
        variant={"ghost"}
        className="text-muted"
        onClick={() => tabsStore.create()}
        aria-label="New tab"
      >
        <Plus />
      </Button>
    </div>
  );
};
