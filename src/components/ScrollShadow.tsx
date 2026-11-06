"use client";

import { type ComponentPropsWithoutRef, forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from "react";
import { cn } from "@/lib/utils";

/*
 * ScrollShadow: a scrolling area whose edges fade out when there is more
 * content beyond them, like HeroUI's Scroll Shadow, without adding the
 * library. The fade is a CSS mask driven by two data attributes that are
 * set on scroll and resize (no re-renders); see .scroll-shadow in
 * globals.css. `size` is the fade length in px.
 */

type ScrollShadowProps = ComponentPropsWithoutRef<"div"> & {
  /** Fade length in px. */
  size?: number;
  orientation?: "vertical" | "horizontal";
  /** Hide the scrollbar while keeping the area scrollable. */
  hideScrollBar?: boolean;
};

const ScrollShadow = forwardRef<HTMLDivElement, ScrollShadowProps>(function ScrollShadow(
  { size = 40, orientation = "vertical", hideScrollBar = false, className, style, children, onScroll, ...props },
  forwarded,
) {
  const ref = useRef<HTMLDivElement>(null);
  useImperativeHandle(forwarded, () => ref.current as HTMLDivElement);

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const v = orientation === "vertical";
    const pos = v ? el.scrollTop : el.scrollLeft;
    const max = v ? el.scrollHeight - el.clientHeight : el.scrollWidth - el.clientWidth;
    el.dataset.start = String(pos > 1);
    el.dataset.end = String(pos < max - 1);
  }, [orientation]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    // content growing (new chat messages) also changes what is hidden
    const mo = new MutationObserver(update);
    mo.observe(el, { childList: true, subtree: true, characterData: true });
    return () => {
      ro.disconnect();
      mo.disconnect();
    };
  }, [update]);

  return (
    <div
      ref={ref}
      data-orientation={orientation}
      className={cn("scroll-shadow", hideScrollBar && "scroll-shadow-hide-bar", orientation === "vertical" ? "overflow-y-auto" : "overflow-x-auto", className)}
      style={{ ["--scroll-shadow-size" as string]: `${size}px`, ...style }}
      onScroll={(e) => {
        update();
        onScroll?.(e);
      }}
      {...props}
    >
      {children}
    </div>
  );
});

export default ScrollShadow;
