"use client";

import { useChat } from "@ai-sdk/react";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowUp, MessageCircle, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import ScrollShadow from "./ScrollShadow";
import { Skeleton } from "./Skeleton";

/*
 * Psunk, the site chat. One component, dressed for whichever site it is on:
 * Atelier gets ivory, teal and coral; the portfolio gets midnight, ivory and
 * lime. Solid surfaces (no backdrop blur) and a still launcher button, so
 * the chat costs nothing while you scroll.
 */

type Site = "atelier" | "portfolio";

const THEME: Record<Site, Record<string, string>> = {
  atelier: {
    "--c-panel": "#f3eee8",
    "--c-head": "#17645f",
    "--c-head-ink": "#f3eee8",
    "--c-ink": "#0f3532",
    "--c-muted": "rgba(15,53,50,0.62)",
    "--c-bot": "#e6ded2",
    "--c-user": "#17645f",
    "--c-user-ink": "#f3eee8",
    "--c-accent": "#ff6845",
    "--c-accent-ink": "#0f3532",
    "--c-line": "rgba(15,53,50,0.14)",
    "--c-launcher": "#17645f",
    "--c-launcher-ink": "#f3eee8",
  },
  portfolio: {
    "--c-panel": "#111214",
    "--c-head": "#17181b",
    "--c-head-ink": "#faf8f3",
    "--c-ink": "#faf8f3",
    "--c-muted": "rgba(250,248,243,0.62)",
    "--c-bot": "#1d1e22",
    "--c-user": "#cdf22b",
    "--c-user-ink": "#08090b",
    "--c-accent": "#cdf22b",
    "--c-accent-ink": "#08090b",
    "--c-line": "rgba(250,248,243,0.12)",
    "--c-launcher": "#cdf22b",
    "--c-launcher-ink": "#08090b",
  },
};

const COPY: Record<Site, { subtitle: string; hello: string; prompts: string[]; nudge: string }> = {
  atelier: {
    nudge: "Try Psunk, our AI assistant",
    subtitle: "Atelier Systems' assistant",
    hello: "Hi, I'm Psunk. Ask about our work, what we build, or starting a project.",
    prompts: ["What do you build?", "How does a project work?", "Tell me about Pheonix"],
  },
  portfolio: {
    nudge: "Try Psunk, my AI assistant",
    subtitle: "Ask me anything about Rishav",
    hello: "Hi, I'm Psunk. I can tell you about Rishav's experience, skills and what he's built.",
    prompts: ["What's his experience?", "What can he build?", "How do I contact him?"],
  },
};

const NUDGE_KEY = "psunk-nudge-dismissed";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const { messages, status, sendMessage } = useChat();
  const reduce = useReducedMotion();
  // The agent answers for whichever site it is on: the studio or the portfolio.
  const site: Site = usePathname()?.startsWith("/atelier") ? "atelier" : "portfolio";
  const copy = COPY[site];
  const isLoading = status === "submitted" || status === "streaming";
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);
  const [nudge, setNudge] = useState(false);

  // A small "Try Psunk" note beside the launcher, a few seconds after the page
  // settles. Once closed or once the chat is opened, it stays away.
  useEffect(() => {
    let dismissed = false;
    try {
      dismissed = localStorage.getItem(NUDGE_KEY) === "1";
    } catch {}
    if (dismissed) return;
    const t = window.setTimeout(() => setNudge(true), 5000);
    return () => window.clearTimeout(t);
  }, []);

  const dismissNudge = () => {
    setNudge(false);
    try {
      localStorage.setItem(NUDGE_KEY, "1");
    } catch {}
  };

  const openChat = () => {
    dismissNudge();
    setIsOpen(true);
  };

  // The command-menu trigger is fixed bottom-left. On phones the chat panel
  // spans nearly the full width, so publish open state and let CSS hide it.
  useEffect(() => {
    document.documentElement.setAttribute("data-chat-open", String(isOpen));
    return () => document.documentElement.removeAttribute("data-chat-open");
  }, [isOpen]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [messages, isLoading]);

  useEffect(() => {
    // Focus the message box on open; hand focus back to the launcher on close.
    if (isOpen) inputRef.current?.focus();
    else if (wasOpen.current) launcherRef.current?.focus();
    wasOpen.current = isOpen;
  }, [isOpen]);

  const send = (text: string) => {
    if (!text.trim() || isLoading) return;
    sendMessage({ text }, { body: { site } });
    setInput("");
  };

  return (
    <div style={THEME[site] as React.CSSProperties}>
      {/* Launcher: still, solid, no looping animation */}
      <button
        ref={launcherRef}
        type="button"
        onClick={openChat}
        aria-label="Open Psunk AI Chat"
        aria-expanded={isOpen}
        tabIndex={isOpen ? -1 : 0}
        className={`chat-launcher fixed bottom-[calc(1.5rem+env(safe-area-inset-bottom))] right-6 z-50 grid size-14 place-items-center rounded-full bg-[var(--c-launcher)] text-[var(--c-launcher-ink)] shadow-[0_8px_20px_-6px_rgba(0,0,0,0.45)] transition-[transform,opacity] duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-accent)] focus-visible:ring-offset-2 ${
          isOpen ? "pointer-events-none scale-75 opacity-0" : ""
        }`}
      >
        <MessageCircle className="size-6" strokeWidth={1.75} aria-hidden="true" />
      </button>

      <AnimatePresence>
        {nudge && !isOpen && (
          <motion.div
            initial={reduce ? false : { opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="fixed bottom-[calc(1.5rem+env(safe-area-inset-bottom))] right-[5.25rem] z-50 flex h-14 items-center"
          >
            <div className="flex items-center gap-1 rounded-full border border-[var(--c-line)] bg-[var(--c-panel)] py-1.5 pl-5 pr-1.5 text-[var(--c-ink)] shadow-[0_10px_24px_-12px_rgba(0,0,0,0.4)]">
              <button type="button" onClick={openChat} className="whitespace-nowrap text-base font-medium hover:opacity-80 focus-visible:outline-none focus-visible:underline">
                {/* Short on phones so it fits between the menu pill and the chat button */}
                <span className="sm:hidden">Try Psunk</span>
                <span className="hidden sm:inline">{copy.nudge}</span>
              </button>
              <button
                type="button"
                onClick={dismissNudge}
                aria-label="Dismiss"
                className="grid size-9 place-items-center rounded-full text-[var(--c-muted)] hover:bg-[var(--c-bot)] hover:text-[var(--c-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-accent)]"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.section
            role="dialog"
            aria-label="Chat with Psunk"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            onKeyDown={(e) => e.key === "Escape" && setIsOpen(false)}
            className="fixed bottom-[calc(1.5rem+env(safe-area-inset-bottom))] left-4 right-4 z-50 flex h-[560px] max-h-[82vh] flex-col overflow-hidden rounded-3xl border border-[var(--c-line)] bg-[var(--c-panel)] text-[var(--c-ink)] shadow-[0_24px_48px_-16px_rgba(0,0,0,0.45)] sm:left-auto sm:right-6 sm:w-[400px]"
          >
            {/* Header */}
            <header className="flex items-center justify-between gap-3 bg-[var(--c-head)] px-5 py-4 text-[var(--c-head-ink)]">
              <div className="flex items-center gap-3">
                <span aria-hidden="true" className="grid size-10 place-items-center rounded-full bg-[var(--c-accent)] text-base font-semibold text-[var(--c-accent-ink)]">
                  P
                </span>
                <div>
                  <h3 className="text-base font-semibold leading-tight">Psunk</h3>
                  <p className="text-sm opacity-75">{copy.subtitle}</p>
                </div>
              </div>
              <button type="button" onClick={() => setIsOpen(false)} aria-label="Close chat" className="grid size-10 place-items-center rounded-full transition-colors hover:bg-white/10">
                <X className="size-5" aria-hidden="true" />
              </button>
            </header>

            {/* Messages */}
            <ScrollShadow size={48} hideScrollBar className="flex-1 space-y-3 overscroll-contain px-5 py-5" aria-live="polite">
              <p className="max-w-[85%] rounded-2xl rounded-bl-md bg-[var(--c-bot)] px-4 py-3 text-[15px] leading-relaxed">{copy.hello}</p>

              {messages.length === 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {copy.prompts.map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => send(q)}
                      className="min-h-10 rounded-full border border-[var(--c-line)] px-4 text-sm transition-colors hover:border-[var(--c-accent)]"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}

              {messages.map((m) => {
                const text = m.parts ? m.parts.map((p) => (p.type === "text" ? p.text : "")).join("") : ((m as { content?: string }).content ?? "");
                const mine = m.role === "user";
                return (
                  <p
                    key={m.id}
                    className={`w-fit max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-[15px] leading-relaxed ${
                      mine ? "ml-auto rounded-br-md bg-[var(--c-user)] text-[var(--c-user-ink)]" : "rounded-bl-md bg-[var(--c-bot)]"
                    }`}
                  >
                    {text}
                  </p>
                );
              })}

              {isLoading && messages[messages.length - 1]?.role === "user" && (
                <div role="status" aria-label="Psunk is writing" className="w-3/4 space-y-2.5 rounded-2xl rounded-bl-md bg-[var(--c-bot)] px-4 py-4">
                  <Skeleton className="h-3 w-4/5" />
                  <Skeleton className="h-3 w-3/5" />
                  <Skeleton className="h-3 w-2/5" />
                </div>
              )}
              <div ref={endRef} />
            </ScrollShadow>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 border-t border-[var(--c-line)] px-4 py-3"
            >
              <label htmlFor="psunk-input" className="sr-only">
                Your question
              </label>
              <input
                id="psunk-input"
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question…"
                autoComplete="off"
                className="min-h-11 flex-1 rounded-full border border-[var(--c-line)] bg-transparent px-4 text-[15px] text-[var(--c-ink)] placeholder:!text-[var(--c-muted)] focus:border-[var(--c-accent)] focus:outline-none focus-visible:!outline-none"
              />
              <button
                type="submit"
                aria-label="Send"
                disabled={isLoading || !input.trim()}
                className="grid size-11 shrink-0 place-items-center rounded-full bg-[var(--c-accent)] text-[var(--c-accent-ink)] transition-opacity disabled:opacity-40"
              >
                <ArrowUp className="size-5" aria-hidden="true" />
              </button>
            </form>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
