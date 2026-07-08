"use client";

import { useState } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";

type Project = {
  id: string;
  index: string;
  title: string;
  years: string;
  tags: string[];
  image: string;
  href?: string;
};

const projects: Project[] = [
  {
    id: "tea-country",
    index: "01",
    title: "Tea Country Holidays",
    years: "2025 — 2026",
    tags: ["Next.js", "Supabase", "Tailwind CSS", "Travel-Tech"],
    image: "/assets/TEA COUNTRY SITE/Screenshot 2026-07-07 232203.png",
  },
  {
    id: "clashvault",
    index: "02",
    title: "ClashVault",
    years: "2026",
    tags: ["Next.js", "Supabase", "Razorpay", "Escrow Systems"],
    image: "/assets/CLASHVERSE/Screenshot 2026-07-07 231838.png",
  },
  {
    id: "gym-crm",
    index: "03",
    title: "IQ Iron Fitness — Gym CRM",
    years: "2026",
    tags: ["JavaScript", "LocalStorage", "OCR", "WhatsApp API"],
    image: "/assets/IQ IRON FITNESS GYM CRM/Screenshot 2026-07-07 232423.png",
  },
];

const additionalWork: { title: string; href: string }[] = [];

function Row({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false);
  const y = useMotionValue(0);
  const springY = useSpring(y, { stiffness: 300, damping: 30, mass: 0.5 });

  return (
    <motion.a
      href={project.href ?? "#"}
      onMouseEnter={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        y.set(e.clientY - rect.top - 95); // Centers vertically (190px / 2 = 95px)
        setHovered(true);
      }}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        y.set(e.clientY - rect.top - 95);
      }}
      className={`group relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 py-8 sm:py-10 px-1 ${hovered ? "z-30" : "z-0"}`}
    >
      <div className="flex items-baseline gap-4 sm:gap-8">
        <span className="font-mono text-xs sm:text-sm text-white/30 tabular-nums">
          {project.index}
        </span>
        <h3 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-white transition-colors duration-300 group-hover:text-[#F5B301]">
          {project.title}
        </h3>
      </div>

      <div className="flex items-center gap-6 pl-9 sm:pl-0">
        <div className="hidden md:flex flex-wrap gap-2 max-w-xs justify-end">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[10px] uppercase tracking-widest text-white/40"
            >
              {tag}
            </span>
          ))}
        </div>
        <span className="font-mono text-xs text-white/40">
          {project.years}
        </span>
        <ArrowUpRight className="w-5 h-5 text-white/40 transition-transform duration-300 group-hover:rotate-45 group-hover:text-[#F5B301]" />
      </div>

      <AnimatePresence>
        {hovered && (
          <motion.div
            style={{ top: springY }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-none absolute right-4 sm:right-24 z-20 hidden lg:block w-[280px] h-[190px] rounded-xl overflow-hidden shadow-2xl"
          >
            <Image
              src={project.image}
              alt={project.title}
              width={280}
              height={190}
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.a>
  );
}

export default function Projects() {
  return (
    <section className="relative bg-[#030303] px-6 sm:px-12 xl:px-24 py-24 sm:py-32">
      <div className="flex items-end justify-between mb-12">
        <h2 className="font-display font-black text-5xl sm:text-7xl uppercase tracking-tight text-white">
          Selected Work
        </h2>
        <span className="font-mono text-xs text-white/30 hidden sm:block">
          ( 03 Projects )
        </span>
      </div>

      <div>
        {projects.map((project) => (
          <Row key={project.id} project={project} />
        ))}
      </div>

      <div className="mt-24">
        <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-white/40 mb-6">
          Additional Work
        </h3>
        <div className="flex flex-col">
          <p className="text-white/40 text-base sm:text-lg font-mono">
            More projects coming soon — including an F1 telemetry visualization.
          </p>
        </div>
      </div>
    </section>
  );
}
