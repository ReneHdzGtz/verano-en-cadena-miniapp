"use client";

import { type ReactNode } from "react";
import { base } from "wagmi/chains";
import { http } from "wagmi";
import { createConfig, WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { OnchainKitProvider } from "@coinbase/onchainkit";

// Create wagmi config
const config = createConfig({
  chains: [base],
  transports: {
    [base.id]: http(),
  },
});

// Create query client
const queryClient = new QueryClient();

export function Providers(props: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <OnchainKitProvider
          apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
          chain={base}
          config={{
            appearance: {
              mode: "auto",
              theme: "base",
              name: process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME || "Punk Horoscope",
            },
          }}
        >
          {props.children}
        </OnchainKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
