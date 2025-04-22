import { Button } from "@/components/ui/button";
import { TruncatedText } from "@/components/ui/truncated-text";
import type { RequestTab } from "@/entity";
import { cn } from "@/utils/cn";
import { X } from "lucide-react";
import type { ComponentProps, MouseEventHandler } from "react";

export type RequestTabProps = ComponentProps<"article"> & {
  tab: RequestTab;
  isActive: boolean;
  onCloseTabClick: () => void;
  onTabClick: () => void;
};

export const RequestTabItem = (props: RequestTabProps) => {
  const { isActive, tab, onCloseTabClick, onTabClick, className, ...rest } =
    props;

  const closeTabHandler: MouseEventHandler<HTMLButtonElement> = (evt) => {
    evt.stopPropagation();
    onCloseTabClick();
  };

  return (
    <article
      {...rest}
      className={cn(
        "flex items-center min-w-max gap-1 p-2 bg-muted-foreground text-muted select-none cursor-pointer transition-colors duration-200",
        isActive ? "bg-muted text-foreground" : "hover:bg-muted-foreground/50",
        className
      )}
      onClick={onTabClick}
    >
      <TruncatedText
        text={tab.title}
        ellipsisLength={16}
        level="p"
        weight="medium"
        className="text-sm"
      />
      <Button
        variant={"ghost"}
        size="xs"
        type="button"
        className="cursor-pointer"
        onClick={closeTabHandler}
        aria-label="Close tab"
      >
        <X className="size-3" />
      </Button>
    </article>
  );
};
