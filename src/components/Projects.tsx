"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Tea Country Holidays",
    description: "Custom CMS module for 90+ travel packages and CRM migration via Python scraper.",
    tags: ["Next.js", "Supabase", "Tailwind CSS"],
    image: "/assets/projects/tea-country-hero.jpg",
  },
  {
    id: 2,
    title: "Gym CRM",
    description: "Offline-first localStorage CRM with OCR for rapid customer onboarding.",
    tags: ["HTML", "JavaScript", "OCR"],
    image: "/assets/projects/gym-crm-hero.jpg",
  },
  {
    id: 3,
    title: "ClashVault",
    description: "Escrow-style order management system with Razorpay integration and events engine.",
    tags: ["Next.js", "Supabase", "Razorpay"],
    image: "/assets/projects/clashvault-hero.jpg",
  },
];

type Project = {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
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

  // Each card gets a subtle "reveal" zoom as it slides into the center of
  // the viewport — same idea as the Hero's scroll-zoom, just per-card.
  const imageScale = useTransform(
    scrollYProgress,
    [start, start + step * 0.5, end],
    [1.15, 1, 1.15]
  );

  return (
    <div className="relative w-screen h-full flex items-center justify-center px-6 sm:px-12 shrink-0">
      <div className="w-full max-w-7xl relative h-[70vh] sm:h-[80vh] rounded-[2rem] sm:rounded-[3rem] overflow-hidden shadow-2xl bg-[#0a0a0a]">
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <motion.img
            style={{ scale: imageScale }}
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
        </div>

        <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-16">
          <div className="flex justify-between items-end">
            <div>
              <p className="font-mono text-xs sm:text-sm text-gray-400 mb-4 tracking-[0.2em] uppercase">
                Project 0{index + 1}
              </p>
              <h2 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tighter mb-4 drop-shadow-md">
                {project.title}
              </h2>
              <p className="text-lg sm:text-xl text-gray-300 max-w-xl leading-relaxed mb-8 drop-shadow-md">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-4 py-2 rounded-full border border-white/20 bg-black/50 backdrop-blur-md text-white text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="hidden sm:flex w-20 h-20 rounded-full bg-white text-black items-center justify-center hover:scale-105 transition-transform cursor-pointer shadow-lg">
              <ArrowUpRight className="w-8 h-8" />
            </div>
          </div>
        </div>
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
    stiffness: 45,
    damping: 24,
    mass: 0.7,
    restDelta: 0.0005,
  });

  // Track slides left by (count - 1) * 100vw total, driven by vertical scroll.
  const trackX = useTransform(smoothProgress, [0, 1], ["0%", `-${(count - 1) * 100}%`]);

  return (
    <section className="relative w-full bg-[#030303]">
      <div className="px-6 sm:px-12 xl:px-24 pt-24 pb-12">
        <h2 className="text-5xl sm:text-7xl font-extrabold tracking-tighter text-white">
          Selected Works
        </h2>
      </div>

      {/* Extra scroll room: one viewport height per project drives the horizontal track */}
      <div ref={outerRef} className="relative" style={{ height: `${count * 100}vh` }}>
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
