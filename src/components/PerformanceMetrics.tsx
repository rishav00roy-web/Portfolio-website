"use client";

import { useEffect, useState } from "react";
import { Activity } from "lucide-react";

export default function PerformanceMetrics() {
  const [metrics, setMetrics] = useState({
    ttfb: 0,
    fcp: 0,
    network: "...",
  });
  
  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateMetrics = () => {
      let ttfb = 0;
      let fcp = 0;
      let network = "4G";

      // 1. Real TTFB (Time to First Byte)
      const navEntry = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
      if (navEntry) {
        ttfb = Math.round(navEntry.responseStart - navEntry.startTime);
      }

      // 2. Real FCP (First Contentful Paint)
      const paintEntries = performance.getEntriesByType("paint");
      const fcpEntry = paintEntries.find(entry => entry.name === "first-contentful-paint");
      if (fcpEntry) {
        fcp = Math.round(fcpEntry.startTime);
      } else {
        // Fallback observer if FCP hasn't fired yet
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntriesByName("first-contentful-paint")) {
            setMetrics(prev => ({ ...prev, fcp: Math.round(entry.startTime) }));
            observer.disconnect();
          }
        });
        observer.observe({ type: "paint", buffered: true });
      }

      // 3. Real Network Connection Type
      // @ts-expect-error Network Information API is not fully typed in standard TS DOM
      const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      if (connection && connection.effectiveType) {
        network = connection.effectiveType.toUpperCase();
      }

      setMetrics({ ttfb, fcp, network });
    };

    // Delay slightly to ensure metrics are recorded by the browser
    const timer = setTimeout(updateMetrics, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full sm:w-[320px] p-5 rounded-2xl border border-white/10 bg-[#0a0a0a]/50 backdrop-blur-md relative overflow-hidden group">
      {/* Background hover glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      
      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="flex items-center gap-2">
          <div className="relative flex items-center justify-center">
            <Activity className="w-4 h-4 text-emerald-400" />
            <div className="absolute inset-0 bg-emerald-400 blur-sm opacity-40 animate-pulse" />
          </div>
          <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">
            Live Telemetry
          </h3>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span className="font-mono text-[9px] uppercase tracking-wider text-emerald-500/80">Active</span>
        </div>
      </div>

      <div className="space-y-3 relative z-10">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[11px] text-white/40">FCP (First Contentful Paint)</span>
          <span className="font-mono text-[11px] text-white/80 font-medium">
            {metrics.fcp === 0 ? "-- ms" : `${metrics.fcp} ms`}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="font-mono text-[11px] text-white/40">TTFB (Time to First Byte)</span>
          <span className="font-mono text-[11px] text-white/80 font-medium">
            {metrics.ttfb === 0 ? "-- ms" : `${metrics.ttfb} ms`}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-mono text-[11px] text-white/40">Client Network</span>
          <div className="flex gap-1.5 bg-emerald-500/10 px-2 py-0.5 rounded text-emerald-400 font-mono text-[11px] font-medium border border-emerald-500/20">
            {metrics.network}
          </div>
        </div>
      </div>
    </div>
  );
}
