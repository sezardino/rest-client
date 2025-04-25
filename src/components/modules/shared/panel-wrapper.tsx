import { cn } from "@/utils/cn";
import { Slot } from "@radix-ui/react-slot";
import type { ComponentProps } from "react";

export type PanelWrapperProps = ComponentProps<"section"> & {
  asChild?: boolean;
};

export const PanelWrapper = (props: PanelWrapperProps) => {
  const { asChild, className, children, ...rest } = props;
  const Comp = asChild ? Slot : "section";

  return (
    <Comp {...rest} className={cn("flex flex-col overflow-hidden", className)}>
      {children}
    </Comp>
  );
};
