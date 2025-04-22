import { RequestTabsList } from "@/components/modules/redactor/request-tabs-list";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export const meta = () => [
  { title: "New React Router App" },
  { name: "description", content: "Welcome to React Router!" },
];

const Home = () => {
  return (
    <main className="max-h-dvh h-dvh overflow-hidden">
      <ResizablePanelGroup direction="horizontal" className="h-full">
        <ResizablePanel defaultSize={30} minSize={10} maxSize={30}>
          sidebar
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={70} minSize={70}>
          <RequestTabsList />
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={50} minSize={10}>
              request
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={50} minSize={10}>
              response
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </main>
  );
};

export default Home;
