"use client";

import React, { useEffect, useRef, useState } from "react";

export default function SmokeBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameIdRef = useRef<number | null>(null);
  
  // High-performance animation references (no React re-renders)
  const isIntersectingRef = useRef<boolean>(true);
  const scrollYRef = useRef<number>(0);
  const lastScrollYRef = useRef<number>(0);
  const scheduledScrollFrameRef = useRef<boolean>(false);
  const tickCountRef = useRef<number>(0);
  
  // Sprite cache
  const preprocessedSpritesRef = useRef<HTMLCanvasElement[]>([]);
  const spritesLoadedRef = useRef<boolean>(false);

  // Particle structure
  interface Particle {
    x: number;
    y: number;
    scale: number;
    rotation: number;
    rotationSpeed: number;
    opacity: number;
    baseOpacity: number;
    vx: number;
    vy: number;
    spriteIndex: number;
  }

  const particlesRef = useRef<Particle[]>([]);

  // Pre-process black-background sprite PNGs into transparent tinted canvases
  const preprocessSprites = (): Promise<void> => {
    return new Promise((resolve) => {
      const spriteUrls = [
        "/assets/smoke/smoke1.png",
        "/assets/smoke/smoke2.png",
        "/assets/smoke/smoke3.png"
      ];
      
      let loadedCount = 0;
      const tempCanvases: HTMLCanvasElement[] = [];

      spriteUrls.forEach((url, index) => {
        const img = new Image();
        img.src = url;
        img.onload = () => {
          const offscreenCanvas = document.createElement("canvas");
          const size = 512;
          offscreenCanvas.width = size;
          offscreenCanvas.height = size;
          const ctx = offscreenCanvas.getContext("2d");
          
          if (ctx) {
            ctx.drawImage(img, 0, 0, size, size);
            const imgData = ctx.getImageData(0, 0, size, size);
            const data = imgData.data;

            // Convert brightness to alpha transparency and tint smoke to dark charcoal-gray
            for (let i = 0; i < data.length; i += 4) {
              const r = data[i];
              const g = data[i + 1];
              const b = data[i + 2];
              
              // Extract brightness (average of color channels)
              const brightness = (r + g + b) / 3;
              
              // Set to charcoal gray color range
              data[i] = 65;      // R
              data[i + 1] = 65;  // G
              data[i + 2] = 70;  // B
              
              // Map brightness to alpha, scale down opacity so it is subtle
              data[i + 3] = Math.min(255, brightness * 0.5);
            }
            ctx.putImageData(imgData, 0, 0);
            tempCanvases[index] = offscreenCanvas;
          }

          loadedCount++;
          if (loadedCount === spriteUrls.length) {
            preprocessedSpritesRef.current = tempCanvases.filter(Boolean);
            spritesLoadedRef.current = true;
            resolve();
          }
        };

        // Fallback in case of asset load failures (draw synthetic smoke circles)
        img.onerror = () => {
          loadedCount++;
          if (loadedCount === spriteUrls.length) {
            resolve();
          }
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
      const count = mobileMode ? 6 : 14; // Reduced count on mobile
      const tempParticles: Particle[] = [];

      for (let i = 0; i < count; i++) {
        // Distribute y coordinates across screen height initially
        const scale = 0.8 + Math.random() * 1.2;
        const opacityMultiplier = mobileMode ? 0.35 : 0.45; // softer on mobile
        
        tempParticles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          scale: scale,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.002,
          baseOpacity: 0.12 + Math.random() * 0.18,
          opacity: 0, // fade in initially
          vx: (Math.random() - 0.5) * 0.15, // slow drift sideways
          vy: -0.08 - Math.random() * 0.12, // slow drift upwards
          spriteIndex: Math.floor(Math.random() * 3)
        });
      }
      particlesRef.current = tempParticles;
    };

    // Setup viewport resize listener
    window.addEventListener("resize", handleResize, { passive: true });
    
    // Initialize sizing
    handleResize();

    // Setup passive scroll listener
    scrollYRef.current = window.scrollY;
    lastScrollYRef.current = window.scrollY;

    const onScroll = () => {
      scrollYRef.current = window.scrollY;
      if (scheduledScrollFrameRef.current) return;
      scheduledScrollFrameRef.current = true;
      
      requestAnimationFrame(() => {
        scheduledScrollFrameRef.current = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Setup IntersectionObserver to pause loop when canvas container scrolls out of view
    const container = containerRef.current;
    let observer: IntersectionObserver | null = null;
    if (container) {
      observer = new IntersectionObserver(
        ([entry]) => {
          isIntersectingRef.current = entry.isIntersecting;
          // Reactivate loop if scrolled back into view
          if (entry.isIntersecting && !animationFrameIdRef.current && spritesLoadedRef.current) {
            lastTickTime = performance.now();
            animationFrameIdRef.current = requestAnimationFrame(loop);
          }
        },
        { threshold: 0, rootMargin: "100px" } // trigger slightly before scrolling out
      );
      observer.observe(container);
    }

    // Animation Loop Variables
    let lastTickTime = performance.now();
    const size = 512;

    const loop = (timestamp: number) => {
      // Exit loop if out of view
      if (!isIntersectingRef.current) {
        animationFrameIdRef.current = null;
        return;
      }

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        animationFrameIdRef.current = requestAnimationFrame(loop);
        return;
      }

      // Performance Safeguard: check update rate decimation on mobile
      tickCountRef.current++;
      const isMobileFrameSkip = isMobile && tickCountRef.current % 2 !== 0;

      // Calculate scroll difference
      const scrollDelta = scrollYRef.current - lastScrollYRef.current;
      
      // Only update lastScrollY when we are actually applying the physics this frame
      // so that scroll delta accumulates correctly across skipped frames on mobile.
      if (!prefersReduced && !isMobileFrameSkip) {
        lastScrollYRef.current = scrollYRef.current;
      }

      // Clear Canvas
      ctx.clearRect(0, 0, width, height);

      // Draw all active particles
      const particles = particlesRef.current;
      const sprites = preprocessedSpritesRef.current;

      particles.forEach((p) => {
        // 1. Particle Physics Updates (only run if animation is enabled and not skipped)
        if (!prefersReduced && !isMobileFrameSkip) {
          // Normal upward and sideways drift
          p.x += p.vx;
          p.y += p.vy;
          p.rotation += p.rotationSpeed;

          // Scroll Influence: apply displacement based on scroll speed
          // Scrolling down (scrollDelta > 0) accelerates the smoke upwards relative to the screen
          p.y -= scrollDelta * 0.45; // Increased from 0.18 for more obvious parallax

          // Slow fade-in upon spawn
          if (p.opacity < p.baseOpacity) {
            p.opacity += 0.003;
          }

          // Screen wrapping / recycle bounds
          const padding = size * p.scale * 0.5;
          
          if (p.y < -padding) {
            p.y = height + padding;
            p.x = Math.random() * width;
            p.opacity = 0; // reset fade-in
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

        // 2. Rendering
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        
        const drawSize = size * p.scale;
        ctx.globalAlpha = p.opacity;

        // If sprites are successfully pre-processed, draw them, otherwise fallback to soft circles
        if (sprites.length > 0) {
          const spriteCanvas = sprites[p.spriteIndex % sprites.length];
          ctx.drawImage(spriteCanvas, -drawSize / 2, -drawSize / 2, drawSize, drawSize);
        } else {
          // Synthetic fallback if assets are not loaded
          const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, drawSize / 2);
          gradient.addColorStop(0, "rgba(75, 75, 80, 0.15)");
          gradient.addColorStop(0.5, "rgba(65, 65, 70, 0.05)");
          gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(0, 0, drawSize / 2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      });

      animationFrameIdRef.current = requestAnimationFrame(loop);
    };

    // Preprocess sprites first, then launch loop
    preprocessSprites().then(() => {
      lastTickTime = performance.now();
      animationFrameIdRef.current = requestAnimationFrame(loop);
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", onScroll);
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
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 mix-blend-screen opacity-90"
      />
    </div>
  );
}
