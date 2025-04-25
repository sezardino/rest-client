export const meta = () => [
  { title: "New React Router App" },
  { name: "description", content: "Welcome to React Router!" },
];

import { RestClientInterface } from "@/components/rest-client-interface";

const HomePage = () => {
  return <RestClientInterface />;
};

export default HomePage;
