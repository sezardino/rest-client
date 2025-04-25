import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/utils/cn";
import type { TabsProps } from "@radix-ui/react-tabs";
import { useState, type JSX } from "react";

export type PanelTab<T extends object> = {
  value: string;
  label: string;
  component: (props: T) => JSX.Element;
};

export type PanelTabsProps<T extends object> = TabsProps & {
  tabs: PanelTab<T>[];
  commonProps?: T;
};

export const PanelTabs = <T extends object>(props: PanelTabsProps<T>) => {
  const { tabs, commonProps, className, ...rest } = props;
  const [activeTab, setActiveTab] = useState(tabs[0].value);

  return (
    <Tabs
      {...rest}
      value={activeTab}
      onValueChange={setActiveTab}
      className={cn("flex-1 flex flex-col", className)}
    >
      <div className="border-b">
        <TabsList className="h-10 w-full justify-start rounded-none bg-transparent p-0">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      {tabs.map((tab) => (
        <TabsContent
          key={tab.value}
          value={tab.value}
          asChild
          className="flex-1 p-0 overflow-auto elative group"
        >
          <tab.component {...(commonProps || ({} as T))} />
        </TabsContent>
      ))}
    </Tabs>
  );
};
