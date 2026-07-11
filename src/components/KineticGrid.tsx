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
}

const DOT_COLOR = "#FFFFFF";
const LINE_COLOR = "#FFFFFF";
const TRAIL_COLOR = "rgba(255,255,255,0.9)";

export default function KineticGrid({
  spacing = 44,
  radius = 260,
  strength = 4,
  trail = true,
  baseOpacity = 0.05,
}: KineticGridProps) {
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

    const onMove = (e: MouseEvent) => setMouse(e.clientX, e.clientY);
    const onLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    };
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) setMouse(t.clientX, t.clientY);
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("touchend", onLeave);

    // Pause the animation loop when the tab isn't visible — a fixed
    // full-viewport canvas has no natural "off-screen" state to lean on,
    // so this is the one that actually saves battery/CPU on long pages.
    let running = !document.hidden;
    const onVisibility = () => {
      running = !document.hidden;
      if (running) raf = requestAnimationFrame(frame);
    };
    document.addEventListener("visibilitychange", onVisibility);

    let raf = 0;
    const frame = () => {
      if (!running) return;
      const m = mouseRef.current;
      ctx.clearRect(0, 0, W, H);

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
      }

      for (let c = 0; c < cols.length; c++) {
        for (let rIdx = 0; rIdx < cols[c].length; rIdx++) {
          const d = cols[c][rIdx];
          const right = cols[c + 1]?.[rIdx];
          const down = cols[c]?.[rIdx + 1];
          const prox = m.active
            ? Math.max(0, 1 - Math.sqrt((m.x - d.x) ** 2 + (m.y - d.y) ** 2) / R)
            : 0;
          if (right) {
            ctx.globalAlpha = baseOpacity + prox * 0.5;
            ctx.strokeStyle = LINE_COLOR;
            ctx.lineWidth = 0.5 + prox * 1.5;
            ctx.beginPath();
            ctx.moveTo(d.x, d.y);
            ctx.lineTo(right.x, right.y);
            ctx.stroke();
          }
          if (down) {
            ctx.globalAlpha = baseOpacity + prox * 0.5;
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
        ctx.globalAlpha = baseOpacity * 4 + prox * 0.6;
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
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro?.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("touchend", onLeave);
    };
  }, [spacing, radius, strength, trail, baseOpacity, prefersReducedMotion]);

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
