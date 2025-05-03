import { RequestPanel } from "@/components/modules/request-panel";
import { ResponsePanel } from "@/components/modules/response-panel";

export const meta = () => [
  { title: "New React Router App" },
  { name: "description", content: "Welcome to React Router!" },
];

const RequestPage = () => {
  return (
    <div className="grid grid-cols-2 w-full overflow-hidden">
      <RequestPanel />
      <ResponsePanel />
    </div>
  );
};

export default RequestPage;
