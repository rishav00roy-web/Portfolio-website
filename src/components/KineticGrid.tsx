"use client";

// Kinetic Grid — adapted from an Originkit Framer component.
// Stripped of Framer-only plumbing (static-renderer stub, layout
// annotations, default color scheme) and rebuilt as a plain background
// layer for the site: fixed to the viewport, monochrome to match the
// brutalist white/black palette, and paused when off-tab or when the
// visitor has requested reduced motion.

import { useEffect, useRef } from "react";
import { useReducedMotion, motion, useScroll, useTransform } from "framer-motion";

interface Dot {
  hx: number;
  hy: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

interface TrailPoint {
  x: number;
  y: number;
  t: number;
}

interface KineticGridProps {
  /** Grid spacing in px. Larger = fewer dots = cheaper to animate. */
  spacing?: number;
  /** Cursor attraction radius in px. */
  radius?: number;
  /** Attraction strength, 1-10. */
  strength?: number;
  /** Show the fading cursor trail line. */
  trail?: boolean;
  /** Base opacity for dots/lines at rest (before cursor proximity boost). */
  baseOpacity?: number;
  /** Line and trail colour (hex). */
  color?: string;
  /** How much lines brighten near the cursor (added to baseOpacity at full proximity). */
  boost?: number;
}

const DOT_COLOR = "#F4EDE3";
const LINE_COLOR_DEFAULT = "#F5B301";

export default function KineticGrid({
  spacing = 44,
  radius = 260,
  strength = 4,
  trail = true,
  baseOpacity = 0.05,
  color = LINE_COLOR_DEFAULT,
  boost = 0.5,
}: KineticGridProps) {
  const LINE_COLOR = color;
  const TRAIL_COLOR = color;
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });
  const trailRef = useRef<TrailPoint[]>([]);
  const prefersReducedMotion = useReducedMotion();

  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 600], [0, 1]);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const GAP = Math.max(8, spacing);
    const R = Math.max(1, radius);
    const PULL = (Math.max(1, Math.min(10, strength)) / 10) * 4;

    let W = 1;
    let H = 1;
    let cols: Dot[][] = [];
    let dots: Dot[] = [];

    const build = (mw?: number, mh?: number) => {
      const r = host.getBoundingClientRect();
      W = Math.max(1, Math.floor(mw ?? r.width));
      H = Math.max(1, Math.floor(mh ?? r.height));
      // Cap DPR at 2 — a full-viewport canvas at 3x device pixel ratio is a
      // lot of pixels to redraw every frame for a background decoration.
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(W * dpr);
      canvas.height = Math.floor(H * dpr);
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cols = [];
      dots = [];
      const nCols = Math.floor(W / GAP) + 2;
      const nRows = Math.floor(H / GAP) + 2;
      for (let c = 0; c < nCols; c++) {
        const col: Dot[] = [];
        for (let rIdx = 0; rIdx < nRows; rIdx++) {
          const hx = c * GAP;
          const hy = rIdx * GAP;
          const d = { hx, hy, x: hx, y: hy, vx: 0, vy: 0 };
          col.push(d);
          dots.push(d);
        }
        cols.push(col);
      }
    };

    // Single static frame — used when the visitor prefers reduced motion,
    // so there's still a grid visual but nothing moves.
    const drawStatic = () => {
      ctx.clearRect(0, 0, W, H);
      ctx.globalAlpha = baseOpacity;
      ctx.strokeStyle = LINE_COLOR;
      ctx.lineWidth = 0.75;
      for (let c = 0; c < cols.length; c++) {
        for (let rIdx = 0; rIdx < cols[c].length; rIdx++) {
          const d = cols[c][rIdx];
          const right = cols[c + 1]?.[rIdx];
          const down = cols[c]?.[rIdx + 1];
          if (right) {
            ctx.beginPath();
            ctx.moveTo(d.hx, d.hy);
            ctx.lineTo(right.hx, right.hy);
            ctx.stroke();
          }
          if (down) {
            ctx.beginPath();
            ctx.moveTo(d.hx, d.hy);
            ctx.lineTo(down.hx, down.hy);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = baseOpacity * 8;
      ctx.fillStyle = DOT_COLOR;
      for (const d of dots) {
        ctx.beginPath();
        ctx.arc(d.hx, d.hy, 1.1, 0, 2 * Math.PI);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    build();

    const ro =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver((entries) => {
            const cr = entries[0]?.contentRect;
            build(cr?.width, cr?.height);
            if (prefersReducedMotion) drawStatic();
          })
        : null;
    ro?.observe(host);

    if (prefersReducedMotion) {
      drawStatic();
      return () => ro?.disconnect();
    }

    const setMouse = (clientX: number, clientY: number) => {
      const r = canvas.getBoundingClientRect();
      const mx = clientX - r.left;
      const my = clientY - r.top;
      mouseRef.current.x = mx;
      mouseRef.current.y = my;
      mouseRef.current.active = true;
      const now = performance.now();
      const t = trailRef.current;
      t.push({ x: mx, y: my, t: now });
      if (t.length > 80) t.shift();
    };

    const onMove = (e: MouseEvent) => {
      setMouse(e.clientX, e.clientY);
      wake();
    };
    const onLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    };
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) setMouse(t.clientX, t.clientY);
      wake();
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("touchend", onLeave);

    // Pause the animation loop when the tab isn't visible — a fixed
    // full-viewport canvas has no natural "off-screen" state to lean on,
    // so this is the one that actually saves battery/CPU on long pages.
    // It also sleeps while the hero covers the viewport: the hero paints over
    // it completely, and a full-screen canvas redrawing underneath was the
    // main cost of scrolling the hero on slower phones.
    let tabVisible = !document.hidden;
    let heroCovering = false;
    let running = tabVisible;
    const resume = () => {
      const next = tabVisible && !heroCovering;
      if (next && !running) {
        running = true;
        asleep = false;
        raf = requestAnimationFrame(frame);
      }
      running = next;
    };
    const onVisibility = () => {
      tabVisible = !document.hidden;
      resume();
    };
    document.addEventListener("visibilitychange", onVisibility);
    const hero = document.getElementById("hero");
    const heroWatch = hero
      ? new IntersectionObserver(([entry]) => {
          // "Covering" = the hero still fills most of the screen.
          heroCovering = entry.intersectionRect.height > window.innerHeight * 0.6;
          resume();
        }, { threshold: Array.from({ length: 11 }, (_, i) => i / 10) })
      : null;
    if (hero) heroWatch?.observe(hero);

    let raf = 0;
    // Sleep once the mesh has settled and the pointer is still, so an idle
    // page costs nothing; the next pointer move wakes it.
    let asleep = false;
    let lastPointer = performance.now();
    function wake() {
      lastPointer = performance.now();
      if (asleep && running) {
        asleep = false;
        raf = requestAnimationFrame(frame);
      }
    }
    const frame = () => {
      if (!running) return;
      const m = mouseRef.current;
      ctx.clearRect(0, 0, W, H);
      let maxV = 0;

      for (const d of dots) {
        let ax = (d.hx - d.x) * 0.08;
        let ay = (d.hy - d.y) * 0.08;
        if (m.active) {
          const dx = m.x - d.x;
          const dy = m.y - d.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < R && dist > 0.001) {
            const f = (1 - dist / R) * PULL;
            ax += (dx / dist) * f;
            ay += (dy / dist) * f;
          }
        }
        d.vx = (d.vx + ax) * 0.82;
        d.vy = (d.vy + ay) * 0.82;
        d.x += d.vx;
        d.y += d.vy;
        if (Math.abs(d.vx) + Math.abs(d.vy) > maxV) maxV = Math.abs(d.vx) + Math.abs(d.vy);
      }

      // Lines far from the pointer share one path (one stroke call); only the
      // few near it are drawn one by one with their brighter, thicker style.
      ctx.globalAlpha = baseOpacity;
      ctx.strokeStyle = LINE_COLOR;
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      const near: { d: Dot; prox: number; right?: Dot; down?: Dot }[] = [];
      for (let c = 0; c < cols.length; c++) {
        for (let rIdx = 0; rIdx < cols[c].length; rIdx++) {
          const d = cols[c][rIdx];
          const right = cols[c + 1]?.[rIdx];
          const down = cols[c]?.[rIdx + 1];
          const prox = m.active
            ? Math.max(0, 1 - Math.sqrt((m.x - d.x) ** 2 + (m.y - d.y) ** 2) / R)
            : 0;
          if (prox > 0) {
            near.push({ d, prox, right, down });
            continue;
          }
          if (right) {
            ctx.moveTo(d.x, d.y);
            ctx.lineTo(right.x, right.y);
          }
          if (down) {
            ctx.moveTo(d.x, d.y);
            ctx.lineTo(down.x, down.y);
          }
        }
      }
      ctx.stroke();
      for (const { d, prox, right, down } of near) {
        {
          if (right) {
            ctx.globalAlpha = baseOpacity + prox * boost;
            ctx.strokeStyle = LINE_COLOR;
            ctx.lineWidth = 0.5 + prox * 1.5;
            ctx.beginPath();
            ctx.moveTo(d.x, d.y);
            ctx.lineTo(right.x, right.y);
            ctx.stroke();
          }
          if (down) {
            ctx.globalAlpha = baseOpacity + prox * boost;
            ctx.strokeStyle = LINE_COLOR;
            ctx.lineWidth = 0.5 + prox * 1.5;
            ctx.beginPath();
            ctx.moveTo(d.x, d.y);
            ctx.lineTo(down.x, down.y);
            ctx.stroke();
          }
        }
      }

      for (const d of dots) {
        const prox = m.active
          ? Math.max(0, 1 - Math.sqrt((m.x - d.x) ** 2 + (m.y - d.y) ** 2) / R)
          : 0;
        ctx.globalAlpha = baseOpacity * 4 + prox * boost * 1.2;
        ctx.fillStyle = DOT_COLOR;
        ctx.beginPath();
        ctx.arc(d.x, d.y, 0.8 + prox * 2.2, 0, 2 * Math.PI);
        ctx.fill();
      }

      if (trail) {
        const now = performance.now();
        const tr = trailRef.current;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        for (let i = 1; i < tr.length; i++) {
          const a = tr[i - 1];
          const b = tr[i];
          const age = now - b.t;
          if (age > 260) continue;
          ctx.globalAlpha = Math.max(0, 1 - age / 260) * 0.5;
          ctx.strokeStyle = TRAIL_COLOR;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      ctx.globalAlpha = 1;
      // Settled and the pointer has been still for a moment (trail faded): sleep.
      if (maxV < 0.02 && performance.now() - lastPointer > 400) {
        asleep = true;
        return;
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro?.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      heroWatch?.disconnect();
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("touchend", onLeave);
    };
  }, [spacing, radius, strength, trail, baseOpacity, boost, prefersReducedMotion, LINE_COLOR, TRAIL_COLOR]);

  return (
    <motion.div
      ref={hostRef}
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-auto"
      style={{ overflow: "hidden", opacity }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      />
    </motion.div>
  );
}
