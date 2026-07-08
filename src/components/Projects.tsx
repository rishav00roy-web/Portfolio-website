"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Tea Country Holidays",
    description: "Custom CMS module for 90+ travel packages and CRM migration via Python scraper.",
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
    description: "Offline-first localStorage CRM with OCR for rapid customer onboarding.",
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
    description: "Escrow-style order management system with Razorpay integration and events engine.",
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

function Card({
  project,
  index,
  scrollYProgress,
}: {
  project: Project;
  index: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const count = projects.length;
  const step = 1 / count;
  const start = index * step;
  const end = start + step;

  // 3D parallax shifts (X, Y, and rotation) for the screenshot collage layers
  const centerScale = useTransform(
    scrollYProgress,
    [start, start + step * 0.5, end],
    [0.96, 1.06, 0.96]
  );
  
  const leftY = useTransform(scrollYProgress, [start, end], [-90, 90]);
  const rightY = useTransform(scrollYProgress, [start, end], [90, -90]);

  const leftX = useTransform(scrollYProgress, [start, end], [-45, 15]);
  const rightX = useTransform(scrollYProgress, [start, end], [45, -15]);

  const leftRotate = useTransform(scrollYProgress, [start, end], [-12, 3]);
  const rightRotate = useTransform(scrollYProgress, [start, end], [12, -3]);

  return (
    <div className="relative w-screen h-full flex items-center justify-center px-4 sm:px-12 xl:px-24 shrink-0">
      <div className="w-full max-w-7xl relative h-[75vh] sm:h-[80vh] rounded-[2.5rem] overflow-hidden shadow-2xl bg-[#0a0a0a]/90 border border-white/5 flex flex-col lg:flex-row items-center p-8 sm:p-12 xl:p-16 gap-8 lg:gap-12">
        {/* Subtle grid background inside the card for Stitch-inspired vibe design */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:30px_30px] opacity-60 pointer-events-none z-0" />
        
        {/* Left Side: Text Details (w-[38%]) */}
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

        {/* Right Side: Beautiful 3D Parallax 3-Image Collage (w-[62%], enlarged and dynamic) */}
        <div className="w-full lg:w-[62%] h-[40vh] lg:h-full relative flex items-center justify-center z-10 overflow-hidden lg:overflow-visible">
          <div className="relative w-[90%] h-[90%] flex items-center justify-center">
            
            {/* Image 2 (Left Overlap, Staggered 3D Parallax) */}
            <motion.div
              style={{ y: leftY, x: leftX, rotate: leftRotate }}
              className="absolute left-[-10%] w-[56%] aspect-[16/10] rounded-2xl overflow-hidden shadow-lg border border-white/10 z-0 scale-95 opacity-80"
            >
              <img
                src={project.images[1]}
                alt=""
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20" />
            </motion.div>

            {/* Image 1 (Center Main, Zooming and responsive on hover) */}
            <motion.div
              style={{ scale: centerScale }}
              className="relative w-[72%] aspect-[16/10] rounded-2.5rem overflow-hidden shadow-2xl border border-white/15 z-10 transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.08)]"
            >
              <img
                src={project.images[0]}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Image 3 (Right Overlap, Staggered 3D Parallax) */}
            <motion.div
              style={{ y: rightY, x: rightX, rotate: rightRotate }}
              className="absolute right-[-10%] w-[56%] aspect-[16/10] rounded-2xl overflow-hidden shadow-lg border border-white/10 z-0 scale-95 opacity-80"
            >
              <img
                src={project.images[2]}
                alt=""
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20" />
            </motion.div>
            
          </div>
        </div>

        {/* Floating Working Button Link */}
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

  // Track slides left by (count - 1) * 100vw total, driven by vertical scroll.
  // Fixed unit calculation: changed from percentage strings to viewport width (vw)
  // to prevent early cards scroll-offs and completely blank screens.
  const trackX = useTransform(smoothProgress, [0, 1], ["0vw", `-${(count - 1) * 100}vw`]);

  return (
    <section className="relative w-full bg-transparent">
      <div className="px-6 sm:px-12 xl:px-24 pt-32 pb-12">
        <h2 className="text-5xl sm:text-7xl xl:text-8xl font-display uppercase tracking-tight text-white leading-none">
          Selected Works
        </h2>
      </div>

      {/* Scroll container height exactly matched to remove dead scroll and blank space */}
      <div ref={outerRef} className="relative" style={{ height: `${(count - 1) * 120 + 100}vh` }}>
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">
          <motion.div style={{ x: trackX }} className="flex h-full">
            {projects.map((project, i) => (
              <Card key={project.id} project={project} index={i} scrollYProgress={scrollYProgress} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
