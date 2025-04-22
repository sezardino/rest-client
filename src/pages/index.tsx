import { RequestTabsList } from "@/components/modules/redactor/request-tabs-list";

export const meta = () => [
  { title: "New React Router App" },
  { name: "description", content: "Welcome to React Router!" },
];

const Home = () => {
  return (
    <>
      <RequestTabsList />
    </>
  );
};

export default Home;
