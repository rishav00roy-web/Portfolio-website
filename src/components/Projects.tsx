"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Tea Country Holidays",
    description:
      "Custom CMS module for 90+ travel packages and CRM migration via Python scraper.",
    tags: ["Next.js", "Supabase", "Tailwind CSS", "Claude Code"],
    link: "https://tea-country-holidays.vercel.app",
    images: [
      "/assets/projects/tea-1.jpg",
      "/assets/projects/tea-2.jpg",
      "/assets/projects/tea-3.jpg",
    ],
  },
  {
    id: 2,
    title: "Gym CRM",
    description:
      "Offline-first localStorage CRM with OCR for rapid customer onboarding.",
    tags: ["HTML", "JavaScript", "OCR", "Codex"],
    link: "https://github.com/rishav00roy-web/Gym-CRM",
    images: [
      "/assets/projects/gym-1.jpg",
      "/assets/projects/gym-2.jpg",
      "/assets/projects/gym-3.jpg",
    ],
  },
  {
    id: 3,
    title: "ClashVault",
    description:
      "Escrow-style order management system with Razorpay integration and events engine.",
    tags: ["Next.js", "Supabase", "Razorpay", "Antigravity"],
    link: "https://github.com/rishav00roy-web/ClashVault",
    images: [
      "/assets/projects/clash-1.jpg",
      "/assets/projects/clash-2.jpg",
      "/assets/projects/clash-3.jpg",
    ],
  },
];

type Project = {
  id: number;
  title: string;
  description: string;
  tags: string[];
  link: string;
  images: string[];
};

function BrowserMockup({
  image,
  url,
  reducedMotion,
}: {
  image: string;
  url: string;
  reducedMotion: boolean | null;
}) {
  return (
    <div className="main-container relative w-full h-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
      <svg id="browser" className="loader w-full h-full" viewBox="0 0 800 500" preserveAspectRatio="none">
        <defs>
          <linearGradient id="traceGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00ccff" stopOpacity="0" />
            <stop offset="50%" stopColor="#00ccff" stopOpacity="1" />
            <stop offset="100%" stopColor="#00ccff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="traceGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff007f" stopOpacity="0" />
            <stop offset="50%" stopColor="#ff007f" stopOpacity="1" />
            <stop offset="100%" stopColor="#ff007f" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="traceGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#39ff14" stopOpacity="0" />
            <stop offset="50%" stopColor="#39ff14" stopOpacity="1" />
            <stop offset="100%" stopColor="#39ff14" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="traceGradient4" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffb300" stopOpacity="0" />
            <stop offset="50%" stopColor="#ffb300" stopOpacity="1" />
            <stop offset="100%" stopColor="#ffb300" stopOpacity="0" />
          </linearGradient>
          <clipPath id="browserContentClip">
            <rect x="0" y="40" width="800" height="460" rx="0" ry="0" />
          </clipPath>
        </defs>

        {/* Browser Frame Background */}
        <rect className="browser-frame" width="800" height="500" rx="12" ry="12" />

        {/* Grid lines (background) */}
        <g className="opacity-25">
          <line className="grid-line" x1="100" y1="40" x2="100" y2="500" />
          <line className="grid-line" x1="200" y1="40" x2="200" y2="500" />
          <line className="grid-line" x1="300" y1="40" x2="300" y2="500" />
          <line className="grid-line" x1="400" y1="40" x2="400" y2="500" />
          <line className="grid-line" x1="500" y1="40" x2="500" y2="500" />
          <line className="grid-line" x1="600" y1="40" x2="600" y2="500" />
          <line className="grid-line" x1="700" y1="40" x2="700" y2="500" />
          <line className="grid-line" x1="0" y1="100" x2="800" y2="100" />
          <line className="grid-line" x1="0" y1="200" x2="800" y2="200" />
          <line className="grid-line" x1="0" y1="300" x2="800" y2="300" />
          <line className="grid-line" x1="0" y1="400" x2="800" y2="400" />
        </g>

        {/* Embedded Project Image */}
        <image
          href={image}
          x="0"
          y="40"
          width="800"
          height="460"
          preserveAspectRatio="xMidYMidSlice"
          clipPath="url(#browserContentClip)"
        />

        {/* Glowing Trace Flows (flowing over the image) */}
        {!reducedMotion && (
          <g>
            <path className="trace-flow" d="M 0,100 L 800,100" />
            <path className="trace-flow" d="M 200,40 L 200,500" />
            <path className="trace-flow" d="M 0,300 L 800,300" />
            <path className="trace-flow" d="M 600,40 L 600,500" />
          </g>
        )}

        {/* Browser Top Bar */}
        <rect className="browser-top" width="800" height="40" />

        {/* Window controls */}
        <circle cx="20" cy="20" r="5" fill="#ff5f56" />
        <circle cx="36" cy="20" r="5" fill="#ffbd2e" />
        <circle cx="52" cy="20" r="5" fill="#27c93f" />

        {/* URL bar */}
        <rect x="80" y="8" width="640" height="24" rx="4" ry="4" fill="#2d2d2d" stroke="#444" strokeWidth="0.5" />
        <text x="90" y="24" fill="#e4e4e4" fontSize="10" fontFamily="sans-serif" opacity="0.8">
          {url}
        </text>
      </svg>
    </div>
  );
}

function Card({
  project,
  index,
  scrollYProgress,
  reducedMotion,
}: {
  project: Project;
  index: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  reducedMotion: boolean | null;
}) {
  const count = projects.length;
  const step = 1 / count;
  const start = index * step;
  const end = start + step;

  // Center card scale — staged steps for more deliberate feel
  const centerScale = useTransform(
    scrollYProgress,
    [start, start + step * 0.4, start + step * 0.6, end],
    [0.94, 1.08, 1.08, 0.94]
  );

  // Side card transforms — skip entirely if reduced motion
  const leftY = useTransform(scrollYProgress, [start, end], [-90, 90]);
  const rightY = useTransform(scrollYProgress, [start, end], [90, -90]);
  const leftX = useTransform(scrollYProgress, [start, end], [-45, 15]);
  const rightX = useTransform(scrollYProgress, [start, end], [45, -15]);
  const leftRotate = useTransform(scrollYProgress, [start, end], [-12, 3]);
  const rightRotate = useTransform(scrollYProgress, [start, end], [12, -3]);

  return (
    <div className="relative w-screen h-full flex items-center justify-center px-4 sm:px-12 xl:px-24 shrink-0">
      <div className="w-full max-w-7xl relative h-[75vh] sm:h-[80vh] rounded-[2.5rem] overflow-hidden shadow-2xl bg-[#0a0a0a]/90 border border-white/5 flex flex-col lg:flex-row items-center p-8 sm:p-12 xl:p-16 gap-8 lg:gap-12">
        {/* Subtle grid texture */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:30px_30px] opacity-60 pointer-events-none z-0" />

        {/* Text content */}
        <div className="w-full lg:w-[38%] flex flex-col justify-center z-10">
          <p className="font-coffekan text-lg sm:text-2xl text-white/50 mb-3 tracking-wide">
            Project 0{index + 1}
          </p>

          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group/title inline-flex items-center gap-3"
          >
            <h2 className="text-4xl sm:text-5xl xl:text-6xl font-display uppercase tracking-tight text-white group-hover/title:text-white/80 transition-colors leading-[1.0] mb-4">
              {project.title}
            </h2>
            <ArrowUpRight className="w-8 h-8 opacity-0 group-hover/title:opacity-100 group-hover/title:translate-x-1 group-hover/title:-translate-y-1 transition-all duration-300 text-white/80" />
          </a>

          <p className="text-base sm:text-lg text-white/60 max-w-xl leading-relaxed mb-6 font-sans">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag: string) => (
              <span
                key={tag}
                className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white/80 text-xs sm:text-sm font-sans"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Image collage */}
        <div className="w-full lg:w-[62%] h-[40vh] lg:h-full relative flex items-center justify-center z-10 overflow-hidden lg:overflow-visible">
          <div className="relative w-[90%] h-[90%] flex items-center justify-center">
            {/* Left card */}
            {reducedMotion ? (
              <div className="absolute left-[-10%] w-[56%] aspect-[16/10] rounded-2xl overflow-hidden shadow-lg border border-white/10 z-0 scale-95 opacity-80">
                <BrowserMockup image={project.images[1]} url={project.link} reducedMotion={reducedMotion} />
              </div>
            ) : (
              <motion.div
                style={{ y: leftY, x: leftX, rotate: leftRotate }}
                className="absolute left-[-10%] w-[56%] aspect-[16/10] rounded-2xl overflow-hidden shadow-lg border border-white/10 z-0 scale-95 opacity-80"
              >
                <BrowserMockup image={project.images[1]} url={project.link} reducedMotion={reducedMotion} />
              </motion.div>
            )}

            {/* Center card */}
            <motion.div
              style={reducedMotion ? {} : { scale: centerScale }}
              className="relative w-[72%] aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl border border-white/15 z-10 hover:shadow-[0_0_30px_rgba(255,255,255,0.08)] transition-shadow duration-300"
            >
              <BrowserMockup image={project.images[0]} url={project.link} reducedMotion={reducedMotion} />
            </motion.div>

            {/* Right card */}
            {reducedMotion ? (
              <div className="absolute right-[-10%] w-[56%] aspect-[16/10] rounded-2xl overflow-hidden shadow-lg border border-white/10 z-0 scale-95 opacity-80">
                <BrowserMockup image={project.images[2]} url={project.link} reducedMotion={reducedMotion} />
              </div>
            ) : (
              <motion.div
                style={{ y: rightY, x: rightX, rotate: rightRotate }}
                className="absolute right-[-10%] w-[56%] aspect-[16/10] rounded-2xl overflow-hidden shadow-lg border border-white/10 z-0 scale-95 opacity-80"
              >
                <BrowserMockup image={project.images[2]} url={project.link} reducedMotion={reducedMotion} />
              </motion.div>
            )}
          </div>
        </div>

        {/* Floating action button */}
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 flex w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white text-black items-center justify-center hover:scale-105 transition-transform shadow-lg z-20 group"
        >
          <ArrowUpRight className="w-6 h-6 sm:w-8 sm:h-8 group-hover:rotate-45 transition-transform duration-300" />
        </a>
      </div>
    </div>
  );
}

export default function Projects() {
  const outerRef = useRef<HTMLDivElement>(null);
  const count = projects.length;
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 30,
    damping: 20,
    mass: 0.8,
    restDelta: 0.0005,
  });

  const trackX = useTransform(
    smoothProgress,
    [0, 1],
    ["0vw", `-${(count - 1) * 100}vw`]
  );

  return (
    <section className="relative w-full bg-transparent">
      {/* Section header */}
      <div className="px-6 sm:px-12 xl:px-24 pt-32 pb-12">
        <h2 className="text-5xl sm:text-7xl xl:text-8xl font-display uppercase tracking-tight text-white leading-none">
          Selected Works
        </h2>
      </div>

      {/* Horizontal scroll track */}
      <div
        ref={outerRef}
        className="relative"
        style={{ height: `${(count - 1) * 120 + 100}vh` }}
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">
          <motion.div style={{ x: trackX }} className="flex h-full">
            {projects.map((project, i) => (
              <Card
                key={project.id}
                project={project}
                index={i}
                scrollYProgress={scrollYProgress}
                reducedMotion={reducedMotion}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
