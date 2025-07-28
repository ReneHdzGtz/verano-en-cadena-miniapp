"use client";

import { type ReactNode } from "react";
import { base } from "wagmi/chains";
import { MiniKitProvider } from "@coinbase/onchainkit/minikit";

export function Providers(props: { children: ReactNode }) {
  return (
    <MiniKitProvider
      apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
      chain={base}
      config={{
        appearance: {
          mode: "auto",
          theme: "base",
          name: process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME || "Punk Horoscope",
          logo: process.env.NEXT_PUBLIC_APP_ICON,
        },
      }}
    >
      {props.children}
    </MiniKitProvider>
  );
}
