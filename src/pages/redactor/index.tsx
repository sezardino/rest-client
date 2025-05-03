import { PanelWrapper } from "@/components/modules/shared/panel-wrapper";

export const meta = () => [
  { title: "New React Router App" },
  { name: "description", content: "Welcome to React Router!" },
];

const RedactorPage = () => {
  return (
    <PanelWrapper className="flex-1 text-center items-center justify-center">
      <p className="text-sm text-muted-foreground">
        Select a request to see the configuration
      </p>
    </PanelWrapper>
  );
};

export default RedactorPage;
