"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

// The chat pulls in @ai-sdk/react, which is dead weight during first paint and
// showed up as the bulk of PageSpeed's "unused JavaScript" on mobile. Load it
// after hydration instead. ssr:false is only legal inside a Client Component,
// which is the whole reason this wrapper exists rather than importing directly
// in the (server) root layout.
const ChatBot = dynamic(() => import("./ChatBot"), { ssr: false });

export default function ChatBotLoader() {
  // The chat lives in the root layout, so it survives client-side navigation.
  // Keying it by site gives the portfolio and Atelier separate conversations:
  // crossing between / and /atelier remounts it with an empty history.
  const site = usePathname()?.startsWith("/atelier") ? "atelier" : "portfolio";
  return <ChatBot key={site} />;
}
