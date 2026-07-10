"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { useReducedMotion } from "framer-motion";

export default function CustomCursor() {
  const prefersReduced = useReducedMotion();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });
  const isHovering = useRef(false);
  const rafId = useRef<number>(0);

  // Determined client-side only, after mount — avoids hydration mismatch
  // (server always renders null since window is undefined there).
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const active = !isTouch && !prefersReduced;
    setShouldRender(active);
    // Only hide the native OS cursor when our custom one is actually
    // going to render — otherwise reduced-motion users end up with no
    // visible cursor at all.
    if (active) {
      document.documentElement.classList.add("custom-cursor-active");
    }
    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, [prefersReduced]);

  const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b;

  const animate = useCallback(() => {
    const damping = isHovering.current ? 0.18 : 0.12;

    pos.current.x = lerp(pos.current.x, target.current.x, damping);
    pos.current.y = lerp(pos.current.y, target.current.y, damping);

    if (dotRef.current) {
      dotRef.current.style.transform = `translate3d(${target.current.x}px, ${target.current.y}px, 0) translate(-50%, -50%)`;
    }
    if (ringRef.current) {
      ringRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
    }

    rafId.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    // Skip entirely on touch devices or reduced-motion — avoids running
    // an idle rAF loop when nothing will ever be rendered to update.
    if (!shouldRender) return;

    const onMouseMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
    };

    const onMouseOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      const isInteractive = el.closest("a, button, [role='button'], input, textarea, select, [data-cursor-hover]");
      if (isInteractive) {
        isHovering.current = true;
        ringRef.current?.classList.add("cursor-ring--hover");
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      const isInteractive = el.closest("a, button, [role='button'], input, textarea, select, [data-cursor-hover]");
      if (isInteractive) {
        isHovering.current = false;
        ringRef.current?.classList.remove("cursor-ring--hover");
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseover", onMouseOver, { passive: true });
    document.addEventListener("mouseout", onMouseOut, { passive: true });

    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
      cancelAnimationFrame(rafId.current);
    };
  }, [animate, shouldRender]);

  // Server always renders null (window is undefined there); client only
  // renders once we've determined it's a fine-pointer, motion-OK device.
  // This avoids the hydration mismatch the previous version had from
  // checking window directly during render.
  if (!shouldRender) {
    return null;
  }

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot"
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className="cursor-ring"
        aria-hidden="true"
      />
    </>
  );
}
