"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import LogoTraceLoader from "./LogoTraceLoader";

/*
 * The passage between Rishav's two sites: following a link from the
 * portfolio to Atelier Systems (or back) covers the screen in the
 * destination's colours while the AS mark traces itself, then resolves
 * into the filled mark as the new page arrives, and lifts away.
 */

/** Routes that get the passage, and the colours of the side being entered. */
const DESTINATIONS: Record<string, { bg: string; fg: string; label: string }> = {
  "/atelier": { bg: "#f3eee8", fg: "#17645f", label: "Opening Atelier Systems" },
  "/v10": { bg: "#08090b", fg: "#faf8f3", label: "Opening Rishav Roy's portfolio" },
};

/** If the new page never reports in, finish anyway after this long. */
const ARRIVAL_TIMEOUT_MS = 4000;

type Passage = { id: number; to: string; arrived: boolean; leaving: boolean };

export default function RouteTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const [passage, setPassage] = useState<Passage | null>(null);
  const timeout = useRef<number | undefined>(undefined);

  // Intercept same-tab clicks on links into the other site.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a || (a.target && a.target !== "_self") || a.hasAttribute("download")) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin || !(url.pathname in DESTINATIONS)) return;
      if (url.pathname === window.location.pathname) return;
      e.preventDefault();
      setPassage({ id: Date.now(), to: url.pathname, arrived: false, leaving: false });
      router.push(url.pathname + url.search + url.hash);
      window.clearTimeout(timeout.current);
      timeout.current = window.setTimeout(
        () => setPassage((p) => (p ? { ...p, arrived: true } : p)),
        ARRIVAL_TIMEOUT_MS,
      );
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  // The new page has rendered: let the mark resolve.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reacting to the router's pathname, an external store
    setPassage((p) => (p && p.to === pathname && !p.arrived ? { ...p, arrived: true } : p));
  }, [pathname]);

  useEffect(() => () => window.clearTimeout(timeout.current), []);

  if (!passage) return null;
  const d = DESTINATIONS[passage.to];

  return (
    <div
      className={`route-passage fixed inset-0 z-[1000] grid place-items-center ${passage.leaving ? "is-leaving" : ""}`}
      style={{ backgroundColor: d.bg, color: d.fg }}
      onTransitionEnd={(e) => {
        if (e.target === e.currentTarget && passage.leaving) setPassage(null);
      }}
    >
      <LogoTraceLoader
        key={passage.id}
        loading={!passage.arrived}
        isComplete={passage.arrived}
        size={160}
        strokeWidth={3}
        ariaLabel={d.label}
        onDone={() => {
          window.clearTimeout(timeout.current);
          // Hold the filled mark a beat, then lift the cover; a fallback clears it if no transition fires.
          window.setTimeout(() => setPassage((p) => (p && p.id === passage.id ? { ...p, leaving: true } : p)), 250);
          const id = passage.id;
          window.setTimeout(() => setPassage((p) => (p && p.id === id ? null : p)), 1200);
        }}
      />
    </div>
  );
}
