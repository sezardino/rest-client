"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { DropdownMenuProps } from "@radix-ui/react-dropdown-menu";
import { type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

type DropdownOptionColor = "default" | "red" | "green";

export type DropdownOption = {
  label: string;
  id: string;
  icon?: LucideIcon;
  color?: DropdownOptionColor;
  onClick: () => void;
};

export type DropdownProps = DropdownMenuProps & {
  options: DropdownOption[];
  children: ReactNode;
};

const dropdownTextColorsMap: Record<DropdownOptionColor, string> = {
  default: "",
  red: "text-red-500",
  green: "text-green-500",
};

export const Dropdown = (props: DropdownProps) => {
  const { options, children, ...rest } = props;

  return (
    <DropdownMenu {...rest}>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {options.map((option) => (
          <DropdownMenuItem
            key={option.id}
            className={dropdownTextColorsMap[option.color || "default"]}
            onClick={option.onClick}
          >
            {option.icon && <option.icon className="mr-2 h-4 w-4" />}
            <span>{option.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
