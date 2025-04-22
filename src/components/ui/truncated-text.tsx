import { cn } from "@/utils/cn";
import type { ComponentProps } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";

export type TypographyLevel =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "span"
  | "dt"
  | "dd";
type TypographyWeight = "thin" | "light" | "normal" | "medium" | "bold";

const weightMap: Record<TypographyWeight, string> = {
  thin: "font-thin",
  light: "font-light",
  normal: "font-normal",
  medium: "font-medium",
  bold: "font-bold",
};

type Props = {
  level?: TypographyLevel;
  weight?: TypographyWeight;
  isUnderlined?: boolean;
  isUppercase?: boolean;
  ellipsisLength?: number;
  text?: string;
};

export type TypographyProps = ComponentProps<"p"> & Props;

export type TruncatedTextProps = ComponentProps<"p"> & Props;

export const TruncatedText = (props: TruncatedTextProps) => {
  const {
    level,
    weight = "normal",
    isUppercase = false,
    isUnderlined,
    text = "",
    ellipsisLength = 24,
    className,
    ...rest
  } = props;

  const Comp = level ? level : "p";

  const classNames = cn(
    weightMap[weight],
    isUnderlined && "underline",
    isUppercase && "uppercase",
    className
  );

  if (text?.length > ellipsisLength)
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Comp
            {...rest}
            className={cn("line-clamp-1 select-none", classNames)}
          >
            {`${text.slice(0, ellipsisLength).trim()}...`}
          </Comp>
        </TooltipTrigger>
        <TooltipContent className="max-w-[300px]">
          <Comp {...rest} className={cn("text-white", classNames)}>
            {text}
          </Comp>
        </TooltipContent>
      </Tooltip>
    );

  return (
    <Comp {...rest} className={cn("line-clamp-1 select-none", classNames)}>
      {text}
    </Comp>
  );
};
