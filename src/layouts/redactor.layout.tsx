import { Sidebar } from "@/components/modules/requests-sidebar/requests-sidebar";
import { RequestProvider } from "@/components/providers/request";
import { useState } from "react";
import { Outlet } from "react-router";

export const RedactorLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <RequestProvider>
      <div className="flex flex-col h-screen bg-background text-foreground">
        {/* <TopToolbar
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
        /> */}
        <div className="flex flex-1 overflow-hidden">
          <Sidebar collapsed={sidebarCollapsed} />
          <Outlet />
        </div>
      </div>
    </RequestProvider>
  );
};

export default RedactorLayout;
