"use client";

import React, { useState, useEffect, useRef } from "react";
import telemetryData from "../data/f1-mock-telemetry.json";

export default function F1TrackMap() {
  const { race, trackBounds, drivers, totalFrames, frameIntervalSeconds } = telemetryData;
  const maxTime = totalFrames * frameIntervalSeconds; // 30 seconds total

  // React states for playback controls (which are low-frequency UI toggles)
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  // Core animation loop references to avoid React re-render thrashing
  const animFrameIdRef = useRef<number | null>(null);
  const currentTimeRef = useRef<number>(0);
  const lastTickTimeRef = useRef<number>(0);
  const tickCountRef = useRef<number>(0);

  // DOM Refs for high-performance updates at 60fps
  const dotGroupsRef = useRef<{ [code: string]: SVGGElement | null }>({});
  const rangeSliderRef = useRef<HTMLInputElement>(null);
  const frameIndicatorRef = useRef<HTMLSpanElement>(null);
  const timeIndicatorRef = useRef<HTMLSpanElement>(null);
  const feedSpeedRefs = useRef<{ [code: string]: HTMLSpanElement | null }>({});
  const feedXRefs = useRef<{ [code: string]: HTMLSpanElement | null }>({});
  const feedYRefs = useRef<{ [code: string]: HTMLSpanElement | null }>({});

  // Generate the SVG track path outline by tracing the telemetry points of VER (driver 0)
  const traceDriver = drivers[0];
  const svgPathD = traceDriver
    ? `M ${traceDriver.frames.map((f) => `${f.x} ${f.y}`).join(" L ")} Z`
    : "";

  // Play / Pause Toggle
  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  // Adjust Playback Speed (cycles 1.0x -> 2.0x -> 4.0x)
  const cycleSpeed = () => {
    setPlaybackSpeed((prev) => (prev === 1 ? 2 : prev === 2 ? 4 : 1));
  };

  // Handle Scrubbing the timeline slider
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    currentTimeRef.current = value;
    updateVisuals(value);
  };

  // Direct DOM update function - bypassing React component render overhead
  const updateVisuals = (time: number) => {
    // 1. Calculate frame indexes and interpolation fraction
    const floatIndex = time / frameIntervalSeconds;
    const index = Math.floor(floatIndex) % totalFrames;
    const nextIndex = (index + 1) % totalFrames;
    const fraction = floatIndex - Math.floor(floatIndex);

    // 2. Update Range Slider progress
    if (rangeSliderRef.current) {
      rangeSliderRef.current.value = time.toFixed(2);
      // CSS gradient fill progress background
      const percent = (time / maxTime) * 100;
      rangeSliderRef.current.style.background = `linear-gradient(to right, var(--color-app-accent) ${percent}%, #262626 ${percent}%)`;
    }

    // 3. Update Text Indicators
    if (frameIndicatorRef.current) {
      frameIndicatorRef.current.textContent = index.toString();
    }
    if (timeIndicatorRef.current) {
      timeIndicatorRef.current.textContent = `${time.toFixed(1)}s`;
    }

    // 4. Update Driver Dot Positions and Live Info Feed
    drivers.forEach((driver) => {
      const p1 = driver.frames[index];
      const p2 = driver.frames[nextIndex];
      if (!p1 || !p2) return;

      // Linear interpolation (lerp) for smooth intermediate coordinates
      const x = p1.x + (p2.x - p1.x) * fraction;
      const y = p1.y + (p2.y - p1.y) * fraction;

      // Update SVG dot position via transform attribute
      const dotGroup = dotGroupsRef.current[driver.code];
      if (dotGroup) {
        dotGroup.setAttribute("transform", `translate(${x.toFixed(1)}, ${y.toFixed(1)})`);
      }

      // Calculate speed based on spatial distance between frames
      const dx = p2.x - p1.x;
      const dy = p2.y - p1.y;
      const distance = Math.hypot(dx, dy);
      // Calibrated multiplier to output realistic scale F1 speeds (e.g. 80km/h in chicane, 320km/h on straight)
      const calculatedSpeed = Math.min(345, Math.round(distance * 14));

      // Update feed telemetry panel
      const spdEl = feedSpeedRefs.current[driver.code];
      if (spdEl) {
        spdEl.textContent = `${calculatedSpeed} km/h`;
      }
      const xEl = feedXRefs.current[driver.code];
      if (xEl) {
        xEl.textContent = `X: ${x.toFixed(1)}`;
      }
      const yEl = feedYRefs.current[driver.code];
      if (yEl) {
        yEl.textContent = `Y: ${y.toFixed(1)}`;
      }
    });
  };

  // Main high-performance Animation Loop
  useEffect(() => {
    if (!isPlaying) {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
        animFrameIdRef.current = null;
      }
      return;
    }

    // Check device capacity for mobile frame-decimation
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    lastTickTimeRef.current = performance.now();

    const loop = (timestamp: number) => {
      const deltaMs = timestamp - lastTickTimeRef.current;
      lastTickTimeRef.current = timestamp;

      // Convert delta ms to seconds and scale by playback speed (1x, 2x, 4x)
      let nextTime = currentTimeRef.current + (deltaMs / 1000) * playbackSpeed;
      if (nextTime >= maxTime) {
        nextTime = 0; // Loop wrap around
      }
      currentTimeRef.current = nextTime;

      tickCountRef.current += 1;

      // Mobile Frame Decimation: skip rendering every 2nd raf frame on mobile (reduces CPU to 30fps)
      if (isMobile) {
        if (tickCountRef.current % 2 === 0) {
          updateVisuals(nextTime);
        }
      } else {
        updateVisuals(nextTime);
      }

      animFrameIdRef.current = requestAnimationFrame(loop);
    };

    animFrameIdRef.current = requestAnimationFrame(loop);

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [isPlaying, playbackSpeed]);

  // Handle Autoplay & Reduced Motion rules upon entry
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!prefersReduced) {
      // Small timeout to let hydration settle before playing
      const timer = setTimeout(() => {
        setIsPlaying(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <section id="f1-track" className="py-28 px-6 max-w-6xl mx-auto border-t border-app-border relative">
      {/* Background Glow */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-app-accent rounded-full filter blur-[150px] opacity-[0.03] pointer-events-none" />

      <div className="mb-16">
        <h2 className="font-heading text-xs uppercase tracking-[0.2em] text-app-accent mb-3 font-bold">
          Interactive Lab
        </h2>
        <p className="font-heading text-4xl sm:text-5xl font-black tracking-tight">
          F1 Telemetry Visualizer
        </p>
        <p className="mt-4 text-app-muted text-sm sm:text-base max-w-2xl leading-relaxed">
          Abu Dhabi Grand Prix (Yas Marina Circuit) telemetry playback. Dots represent real spatial telemetry coordinate indexes.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Track View Canvas */}
        <div className="lg:col-span-3 aspect-[10/6] rounded-2xl glass-panel relative overflow-hidden shadow-2xl p-6 flex flex-col justify-between">
          
          {/* Visual Grid lines */}
          <div className="absolute inset-0 pointer-events-none tech-dots opacity-40" />

          {/* Top telemetry status */}
          <div className="relative z-10 flex justify-between items-start font-mono text-[10px] text-app-muted border-b border-app-border/40 pb-3">
            <div>
              <p className="text-app-fg font-bold uppercase tracking-wider">{race}</p>
              <p className="text-[9px]">COORDS: GPS_PROJECTED_LOCAL_GRID</p>
            </div>
            <div className="text-right">
              <p>TICK: {frameIntervalSeconds}s</p>
              <p className="text-app-accent">TARGET: 60 FPS (MOBILE: 30 FPS)</p>
            </div>
          </div>

          {/* SVG Map Canvas */}
          <div className="flex-1 flex items-center justify-center relative p-8">
            <svg 
              viewBox={`${trackBounds.minX} ${trackBounds.minY} ${trackBounds.maxX} ${trackBounds.maxY}`}
              className="w-full h-full max-h-[380px] object-contain opacity-95"
            >
              {/* Circuit Outline - Outer Neon Blur */}
              <path 
                d={svgPathD}
                fill="none"
                stroke="currentColor"
                strokeWidth="7"
                className="text-app-accent opacity-20 filter blur-[3px]"
              />
              {/* Circuit Outline - Main Stroke */}
              <path 
                d={svgPathD}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                className="text-app-fg/20"
              />
              {/* Circuit Outline - Inner Dash Line */}
              <path 
                d={svgPathD}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeDasharray="4 8"
                className="text-app-accent/80"
              />

              {/* Start-Finish Grid Marker */}
              {traceDriver && (
                <g transform={`translate(${traceDriver.frames[0].x}, ${traceDriver.frames[0].y}) rotate(-45)`}>
                  <line x1="-12" y1="0" x2="12" y2="0" stroke="currentColor" strokeWidth="2.5" className="text-app-accent" />
                  <text x="-12" y="-8" fontSize="8" fontWeight="bold" fontFamily="var(--font-jetbrains-mono), monospace" className="fill-app-accent tracking-widest">START</text>
                </g>
              )}

              {/* Driver Dots (Dynamically Updated via loop) */}
              {drivers.map((driver) => {
                const pos = driver.frames[0] || { x: 0, y: 0 };
                const dotFillColor =
                  driver.code === "VER" ? "#00f2fe" : driver.code === "HAM" ? "#f59e0b" : "#10b981";

                return (
                  <g 
                    key={driver.code} 
                    ref={(el) => {
                      if (el) dotGroupsRef.current[driver.code] = el;
                    }}
                    transform={`translate(${pos.x}, ${pos.y})`}
                    style={{ willChange: "transform" }}
                  >
                    {/* Ripple halo around the dot */}
                    <circle 
                      cx="0" 
                      cy="0" 
                      r="10" 
                      fill="none" 
                      stroke={dotFillColor} 
                      strokeWidth="1.5" 
                      opacity="0.3" 
                      className="animate-pulse"
                    />
                    {/* Primary Dot */}
                    <circle 
                      cx="0" 
                      cy="0" 
                      r="5" 
                      fill={dotFillColor}
                      className="shadow-lg"
                    />
                    {/* Driver label text */}
                    <text 
                      x="8" 
                      y="3" 
                      fontSize="9.5" 
                      fontWeight="bold" 
                      fontFamily="var(--font-jetbrains-mono), monospace"
                      fill="currentColor"
                      className="text-app-fg select-none drop-shadow-[0_2px_3px_rgba(0,0,0,0.9)]"
                    >
                      {driver.code}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Control Bar UI (Frosted Glass Cockpit Panel) */}
          <div className="relative z-10 bg-black/40 backdrop-blur-md border border-white/5 rounded-xl p-4 flex flex-col sm:flex-row items-center gap-4 shadow-lg">
            {/* Play/Pause control buttons */}
            <div className="flex items-center gap-3">
              <button 
                type="button"
                onClick={togglePlay}
                className="w-10 h-10 rounded-lg bg-app-accent/10 text-app-accent border border-app-accent/25 flex items-center justify-center cursor-pointer hover:bg-app-accent/20 active:scale-95 transition-all shadow-inner"
                aria-label={isPlaying ? "Pause telemetry" : "Play telemetry"}
              >
                {isPlaying ? (
                  /* Pause Icon */
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                  </svg>
                ) : (
                  /* Play Icon */
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>
              
              <button
                type="button"
                onClick={cycleSpeed}
                className="text-[10px] font-mono font-bold px-3 py-2 rounded-lg bg-white/5 border border-white/5 text-app-fg hover:bg-white/10 active:scale-95 transition-all cursor-pointer"
                aria-label={`Change playback speed, current speed ${playbackSpeed}x`}
              >
                {playbackSpeed.toFixed(1)}x
              </button>
            </div>

            {/* Scrub Slider */}
            <div className="flex-1 w-full flex items-center gap-4">
              <span className="font-mono text-[10px] text-app-muted">0.0s</span>
              <input
                ref={rangeSliderRef}
                type="range"
                min="0"
                max={maxTime.toString()}
                step="0.05"
                defaultValue="0"
                onChange={handleSliderChange}
                className="flex-1 h-1.5 rounded-full appearance-none bg-neutral-800 cursor-pointer outline-none transition-all"
                style={{
                  background: "linear-gradient(to right, var(--color-app-accent) 0%, #262626 0%)",
                }}
                aria-label="Lap telemetry timeline scrub"
              />
              <span className="font-mono text-[10px] text-app-muted">{maxTime.toFixed(1)}s</span>
            </div>

            {/* Frame indicator */}
            <div className="font-mono text-[10px] text-app-muted whitespace-nowrap bg-black/35 px-3.5 py-2 rounded-lg border border-white/5">
              FRAME <span ref={frameIndicatorRef} className="text-app-accent font-bold">0</span> / {totalFrames}
            </div>
          </div>
        </div>

        {/* Info panel */}
        <div className="lg:col-span-1 flex flex-col justify-between gap-6 border border-app-border rounded-2xl p-6 bg-app-card/30 backdrop-blur relative overflow-hidden">
          <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-app-accent rounded-full filter blur-[50px] opacity-[0.05] pointer-events-none" />

          <div className="space-y-6">
            <h3 className="font-heading text-xs font-bold uppercase tracking-[0.25em] text-app-accent pb-2 border-b border-app-border/40">
              Live Feed
            </h3>
            
            <div className="space-y-4 font-mono text-xs">
              {drivers.map((driver) => {
                const colorClass = 
                  driver.code === "VER" 
                    ? "text-cyan-400" 
                    : driver.code === "HAM" 
                    ? "text-amber-400" 
                    : "text-emerald-400";
                
                return (
                  <div key={driver.code} className="border-b border-app-border/40 pb-3 last:border-0 last:pb-0">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-app-fg">{driver.name}</span>
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded bg-black/40 border border-white/5 ${colorClass}`}>
                        {driver.code}
                      </span>
                    </div>
                    <div className="text-[10px] text-app-muted flex flex-col gap-0.5">
                      <div className="flex justify-between">
                        <span ref={(el) => { if (el) feedXRefs.current[driver.code] = el; }}>X: 0.0</span>
                        <span ref={(el) => { if (el) feedYRefs.current[driver.code] = el; }}>Y: 0.0</span>
                      </div>
                      <div className="flex justify-between font-bold text-app-fg text-[9px] mt-0.5">
                        <span>VELOCITY:</span>
                        <span ref={(el) => { if (el) feedSpeedRefs.current[driver.code] = el; }}>0 km/h</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="p-4 bg-black/25 border border-white/5 rounded-xl text-[10px] font-mono text-app-muted space-y-2">
            <p className="font-bold text-app-fg uppercase tracking-wider text-[8px] text-app-accent">Telemetry Pipeline</p>
            <p>• DYNAMIC_IMPORT (SSR: FALSE)</p>
            <p>• RAF_TIMER_TICK</p>
            <p>• GPU_COMPOSITE_MAPPING</p>
          </div>
        </div>
      </div>
    </section>
  );
}
