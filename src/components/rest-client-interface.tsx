import { Sidebar } from "@/components/modules/requests-sidebar/requests-sidebar";
import { useState } from "react";
import { RequestPanel } from "./modules/request-panel";
import { ResponsePanel } from "./modules/response-panel";
import { RequestProvider } from "./providers/request";

export const RestClientInterface = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <RequestProvider>
      <div className="flex flex-col h-screen bg-background text-foreground">
        {/* <TopToolbar
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
        /> */}
        <div className="flex flex-1 overflow-hidden">
          <Sidebar collapsed={sidebarCollapsed} />
          <div className="grid grid-cols-2 overflow-hidden">
            <RequestPanel />
            <ResponsePanel />
          </div>
        </div>
      </div>
    </RequestProvider>
  );
};
