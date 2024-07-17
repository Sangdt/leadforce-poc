import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  isServer,
  QueryClientProvider,
} from "@tanstack/react-query";
//import { useState } from "react";

type QueryProviderProps = {
  children: React.ReactNode;
  queryClient: QueryClient;
};

export const HydrationReactQuery = ({
  children,
  queryClient,
}: QueryProviderProps) => {
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
};
