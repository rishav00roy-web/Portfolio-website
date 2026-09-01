"use client";

import dynamic from "next/dynamic";

// The chat pulls in @ai-sdk/react, which is dead weight during first paint and
// showed up as the bulk of PageSpeed's "unused JavaScript" on mobile. Load it
// after hydration instead. ssr:false is only legal inside a Client Component,
// which is the whole reason this wrapper exists rather than importing directly
// in the (server) root layout.
const ChatBot = dynamic(() => import("./ChatBot"), { ssr: false });

export default function ChatBotLoader() {
  return <ChatBot />;
}
