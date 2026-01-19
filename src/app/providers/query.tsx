import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, refetchOnWindowFocus: false }
  }
});

export function QueryProvider(node: React.ReactNode): JSX.Element {
  return <QueryClientProvider client={client}>{node}</QueryClientProvider>;
}
