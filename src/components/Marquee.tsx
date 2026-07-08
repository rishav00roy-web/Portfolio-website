"use client";

const items = [
  "FULL-STACK DEVELOPMENT",
  "AI & AUTOMATION SYSTEMS",
  "NEXT.JS / SUPABASE",
  "TRAVEL-TECH",
  "UI ENGINEERING",
];

export default function Marquee() {
  const track = [...items, ...items, ...items, ...items];

  return (
    <div className="relative w-full overflow-hidden border-y border-white/10 bg-[#030303] py-4">
      <div className="flex whitespace-nowrap animate-marquee w-max">
        {track.map((item, i) => (
          <span
            key={i}
            className="flex items-center px-6 font-mono text-xs sm:text-sm uppercase tracking-[0.25em] text-white/50"
          >
            {item}
            <span className="text-[#F5B301] ml-12">●</span>
          </span>
        ))}
      </div>
    </div>
  );
}
