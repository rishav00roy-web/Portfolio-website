"use client";

import React, { useEffect, useRef, useState } from "react";

export default function SmokeBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameIdRef = useRef<number | null>(null);
  
  // High-performance animation references (no React re-renders)
  const isIntersectingRef = useRef<boolean>(true);
  const scrollImpulseRef = useRef<number>(0);
  const lastScrollYRef = useRef<number>(0);
  const pointerRef = useRef<{x: number, y: number}>({ x: -1000, y: -1000 });
  const scheduledScrollFrameRef = useRef<boolean>(false);
  const scheduledPointerFrameRef = useRef<boolean>(false);
  
  // Sprite cache: 2D array [layerIndex][spriteIndex]
  const preprocessedSpritesRef = useRef<HTMLCanvasElement[][]>([[], [], []]);
  const spritesLoadedRef = useRef<boolean>(false);

  // Particle structure
  interface Particle {
    x: number;
    y: number;
    scale: number;
    rotation: number;
    rotationSpeed: number;
    baseRotationSpeed: number;
    opacity: number;
    baseOpacity: number;
    vx: number;
    vy: number;
    spriteIndex: number;
    layer: number; // 0=far, 1=mid, 2=near
    scrollMultiplier: number;
    cursorMultiplier: number;
  }

  const particlesRef = useRef<Particle[]>([]);

  // Pre-process black-background sprite PNGs into transparent tinted canvases
  const preprocessSprites = (): Promise<void> => {
    return new Promise((resolve) => {
      const spriteUrls = [
        "/assets/smoke/smoke1.jpg",
        "/assets/smoke/smoke2.jpg",
        "/assets/smoke/smoke3.jpg"
      ];
      
      const layerTints = [
        { r: 15, g: 15, b: 18 },   // Far
        { r: 30, g: 30, b: 34 },   // Mid
        { r: 45, g: 45, b: 50 },   // Near
      ];

      let loadedCount = 0;
      const tempCanvases: HTMLCanvasElement[][] = [[], [], []];

      spriteUrls.forEach((url, spriteIndex) => {
        const img = new Image();
        img.src = url;
        img.onload = () => {
          const size = 512;
          
          layerTints.forEach((tint, layerIndex) => {
            const offscreenCanvas = document.createElement("canvas");
            offscreenCanvas.width = size;
            offscreenCanvas.height = size;
            const ctx = offscreenCanvas.getContext("2d", { willReadFrequently: true });
            
            if (ctx) {
              ctx.drawImage(img, 0, 0, size, size);
              const imgData = ctx.getImageData(0, 0, size, size);
              const data = imgData.data;

              // Convert brightness to alpha transparency and tint smoke
              for (let i = 0; i < data.length; i += 4) {
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];
                
                // Extract brightness (average of color channels)
                const brightness = (r + g + b) / 3;
                
                data[i] = tint.r;      // R
                data[i + 1] = tint.g;  // G
                data[i + 2] = tint.b;  // B
                
                // Map brightness to alpha, scale down opacity so it is subtle
                data[i + 3] = Math.min(255, brightness * 0.8);
              }
              ctx.putImageData(imgData, 0, 0);
              tempCanvases[layerIndex][spriteIndex] = offscreenCanvas;
            }
          });

          loadedCount++;
          if (loadedCount === spriteUrls.length) {
            preprocessedSpritesRef.current = tempCanvases;
            spritesLoadedRef.current = true;
            resolve();
          }
        };

        img.onerror = () => {
          loadedCount++;
          if (loadedCount === spriteUrls.length) resolve();
        };
      });
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let width = 0;
    let height = 0;
    let isMobile = false;
    let prefersReduced = false;

    // Cache layout metrics on resize rather than reading DOM in animation frame loops
    const handleResize = () => {
      isMobile = window.matchMedia("(max-width: 768px)").matches;
      prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // Cap resolution at 1.5x on high-DPI retina screens for performance safeguards
      const dpr = Math.min(1.5, window.devicePixelRatio || 1);
      width = window.innerWidth;
      height = window.innerHeight;
      
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.scale(dpr, dpr);
      }

      // Re-initialize particles to distribute evenly in new bounds
      initParticles(isMobile);
    };

    // Initialize particles
    const initParticles = (mobileMode: boolean) => {
      const particles: Particle[] = [];
      const counts = mobileMode ? [3, 3, 3] : [6, 6, 6]; // 0=far, 1=mid, 2=near

      counts.forEach((count, layer) => {
        for (let i = 0; i < count; i++) {
          let scale = 1;
          let baseOpacity = 0.5;
          let scrollMultiplier = 1;
          let cursorMultiplier = 1;

          if (layer === 0) { // Far
            scale = 0.8 + Math.random() * 0.4;
            baseOpacity = 0.15 + Math.random() * 0.15;
            scrollMultiplier = 0.15;
            cursorMultiplier = 0.05;
          } else if (layer === 1) { // Mid
            scale = 1.2 + Math.random() * 0.5;
            baseOpacity = 0.3 + Math.random() * 0.2;
            scrollMultiplier = 0.4;
            cursorMultiplier = 0.3;
          } else if (layer === 2) { // Near
            scale = 1.6 + Math.random() * 0.8;
            baseOpacity = 0.4 + Math.random() * 0.3;
            scrollMultiplier = 1.0;
            cursorMultiplier = 1.0;
          }

          if (mobileMode) {
            baseOpacity *= 0.7; // softer overall on mobile
          }
          
          const rotSpeed = (Math.random() - 0.5) * 0.002;
          
          particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            scale: scale,
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: rotSpeed,
            baseRotationSpeed: rotSpeed,
            baseOpacity: baseOpacity,
            opacity: 0, // fade in initially
            vx: (Math.random() - 0.5) * 0.2 * (layer + 1), 
            vy: -0.1 - Math.random() * 0.2 * (layer + 1), 
            spriteIndex: Math.floor(Math.random() * 3),
            layer,
            scrollMultiplier,
            cursorMultiplier
          });
        }
      });
      
      // Sort so far renders first, near renders last
      particles.sort((a, b) => a.layer - b.layer);
      particlesRef.current = particles;
    };

    window.addEventListener("resize", handleResize, { passive: true });
    handleResize();

    // Setup scroll listener for impulse
    lastScrollYRef.current = window.scrollY;
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollYRef.current;
      scrollImpulseRef.current += delta * 0.5; // accumulate impulse
      lastScrollYRef.current = currentScrollY;
      
      if (scheduledScrollFrameRef.current) return;
      scheduledScrollFrameRef.current = true;
      requestAnimationFrame(() => {
        scheduledScrollFrameRef.current = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Setup pointer listener for cursor reactivity (desktop only)
    const onPointerMove = (e: PointerEvent) => {
      if (isMobile) return;
      pointerRef.current = { x: e.clientX, y: e.clientY };
      
      if (scheduledPointerFrameRef.current) return;
      scheduledPointerFrameRef.current = true;
      requestAnimationFrame(() => {
        scheduledPointerFrameRef.current = false;
      });
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    // Setup IntersectionObserver to pause loop when out of view
    const container = containerRef.current;
    let observer: IntersectionObserver | null = null;
    if (container) {
      observer = new IntersectionObserver(
        ([entry]) => {
          isIntersectingRef.current = entry.isIntersecting;
          if (entry.isIntersecting && !animationFrameIdRef.current && spritesLoadedRef.current) {
            animationFrameIdRef.current = requestAnimationFrame(loop);
          }
        },
        { threshold: 0, rootMargin: "100px" }
      );
      observer.observe(container);
    }

    const size = 512;

    const loop = (timestamp: number) => {
      if (!isIntersectingRef.current) {
        animationFrameIdRef.current = null;
        return;
      }

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        animationFrameIdRef.current = requestAnimationFrame(loop);
        return;
      }

      // Decay scroll impulse
      scrollImpulseRef.current *= 0.92;
      const impulse = scrollImpulseRef.current;

      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "source-over"; // normal alpha blending

      const particles = particlesRef.current;
      const sprites = preprocessedSpritesRef.current;
      const pointer = pointerRef.current;

      particles.forEach((p) => {
        if (!prefersReduced) {
          p.x += p.vx;
          p.y += p.vy;
          p.rotation += p.rotationSpeed;
          
          // Gradually return rotation speed to normal if disturbed by cursor
          p.rotationSpeed += (p.baseRotationSpeed - p.rotationSpeed) * 0.05;

          // Apply scroll impulse
          p.y -= impulse * p.scrollMultiplier;

          // Apply cursor repulsion and swirl
          if (p.cursorMultiplier > 0 && pointer.x > -1000) {
            const dx = p.x - pointer.x;
            const dy = p.y - pointer.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const maxDist = 350;

            if (dist < maxDist) {
              const force = Math.pow((maxDist - dist) / maxDist, 2); // easing
              
              // Radial outward force
              p.x += (dx / dist) * force * 3 * p.cursorMultiplier;
              p.y += (dy / dist) * force * 3 * p.cursorMultiplier;
              
              // Tangential curl (swirl) force
              p.x += (-dy / dist) * force * 2 * p.cursorMultiplier;
              p.y += (dx / dist) * force * 2 * p.cursorMultiplier;
              
              // Add some spin
              p.rotationSpeed += (dx > 0 ? 1 : -1) * force * 0.001 * p.cursorMultiplier;
            }
          }

          // Slow fade-in upon spawn
          if (p.opacity < p.baseOpacity) {
            p.opacity += 0.005;
          }

          // Screen wrapping
          const padding = size * p.scale * 0.5;
          
          if (p.y < -padding) {
            p.y = height + padding;
            p.x = Math.random() * width;
            p.opacity = 0;
          } else if (p.y > height + padding) {
            p.y = -padding;
            p.x = Math.random() * width;
            p.opacity = 0;
          }

          if (p.x < -padding) {
            p.x = width + padding;
          } else if (p.x > width + padding) {
            p.x = -padding;
          }
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        
        const drawSize = size * p.scale;
        ctx.globalAlpha = p.opacity;

        if (sprites[p.layer] && sprites[p.layer].length > 0) {
          const spriteCanvas = sprites[p.layer][p.spriteIndex % sprites[p.layer].length];
          if (spriteCanvas) {
            ctx.drawImage(spriteCanvas, -drawSize / 2, -drawSize / 2, drawSize, drawSize);
          }
        }
        ctx.restore();
      });

      animationFrameIdRef.current = requestAnimationFrame(loop);
    };

    preprocessSprites().then(() => {
      animationFrameIdRef.current = requestAnimationFrame(loop);
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointerMove);
      if (observer) observer.disconnect();
      if (animationFrameIdRef.current) cancelAnimationFrame(animationFrameIdRef.current);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="absolute top-0 left-0 right-0 h-[2200px] pointer-events-none overflow-hidden select-none z-0"
    >
      <canvas 
        ref={canvasRef} 
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-100"
      />
    </div>
  );
}
