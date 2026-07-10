"use client";

import React, { useState, useEffect, useRef } from "react";

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}

interface InteractiveGridPatternProps extends React.SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  squaresClassName?: string;
}

export function InteractiveGridPattern({
  width = 40,
  height = 40,
  className,
  squaresClassName,
  ...props
}: InteractiveGridPatternProps) {
  const containerRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState({ columns: 0, rows: 0 });
  const [hoveredSquare, setHoveredSquare] = useState<number | null>(null);

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const columns = Math.ceil(rect.width / width);
        const rows = Math.ceil(rect.height / height);
        setDimensions({ columns, rows });
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [width, height]);

  const { columns, rows } = dimensions;

  return (
    <svg
      ref={containerRef}
      width="100%"
      height="100%"
      className={cn(
        "absolute inset-0 h-full w-full border border-gray-400/5",
        className
      )}
      {...props}
    >
      {columns > 0 && rows > 0 && Array.from({ length: columns * rows }).map((_, index) => {
        const x = (index % columns) * width;
        const y = Math.floor(index / columns) * height;
        return (
          <rect
            key={index}
            x={x}
            y={y}
            width={width}
            height={height}
            className={cn(
              "stroke-white/[0.02] transition-all duration-100 ease-in-out not-[&:hover]:duration-1000",
              hoveredSquare === index ? "fill-white/[0.04]" : "fill-transparent",
              squaresClassName
            )}
            onMouseEnter={() => setHoveredSquare(index)}
            onMouseLeave={() => setHoveredSquare(null)}
          />
        );
      })}
    </svg>
  );
}

export default function Background() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-auto z-0">
      <InteractiveGridPattern />
    </div>
  );
}
