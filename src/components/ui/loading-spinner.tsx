import { cn } from "@/utils/cn";
import type { ComponentProps } from "react";

export type LoadingSpinnerProps = ComponentProps<"div"> & {
  label?: string;
};

export const LoadingSpinner = (props: LoadingSpinnerProps) => {
  const { label, className, ...rest } = props;

  return (
    <div
      {...rest}
      className={cn(
        "flex flex-col gap-2 items-center justify-center",
        className
      )}
    >
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      {label && <p className="text-sm text-muted-foreground">{label}</p>}
    </div>
  );
};
