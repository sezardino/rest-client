import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { PropsWithChildren } from "react";

import { QueryClientProvider } from "@tanstack/react-query";

import { QueryClient } from "@tanstack/react-query";

export const tanstackQueryClient = new QueryClient();

export const TanstackQueryProvider = (props: PropsWithChildren) => {
  const { children } = props;

  return (
    <QueryClientProvider client={tanstackQueryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
