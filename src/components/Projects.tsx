"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

const projects = [
  {
    id: 1,
    title: "Tea Country Holidays",
    description: "Custom CMS module for 90+ travel packages and CRM migration via Python scraper.",
    tags: ["Next.js", "Supabase", "Tailwind CSS"],
    image: "/assets/TEA COUNTRY SITE/Screenshot 2026-07-07 232203.png",
    href: "https://tea-country-holidays.vercel.app",
    accent: "border-amber-400/40 text-amber-100",
  },
  {
    id: 2,
    title: "Gym CRM",
    description: "Offline-first localStorage CRM with OCR for rapid customer onboarding.",
    tags: ["HTML", "JavaScript", "OCR"],
    image: "/assets/IQ IRON FITNESS GYM CRM/Screenshot 2026-07-07 232423.png",
    href: "https://github.com/rishav00roy-web/Gym-CRM",
    accent: "border-emerald-400/40 text-emerald-100",
  },
  {
    id: 3,
    title: "ClashVault",
    description: "Escrow-style order management system with Razorpay integration and events engine.",
    tags: ["Next.js", "Supabase", "Razorpay"],
    image: "/assets/CLASHVAULT/Screenshot 2026-07-07 231838.png",
    href: "https://github.com/rishav00roy-web/ClashVault",
    accent: "border-violet-400/40 text-violet-100",
  },
];

type Project = {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  href: string;
  accent: string;
};

function Card({ project, index, targetScale }: { project: Project, index: number, targetScale: number }) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll relative to this specific card's sticky container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Calculate the scale-down effect as the next card stacks on top
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  // Subtle internal parallax for the background image
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  return (
    <div ref={containerRef} className="h-screen flex items-center justify-center sticky top-0 px-6 sm:px-12 py-12">
      <motion.div
        style={{ scale, top: `calc(10vh + ${index * 40}px)` }}
        className="w-full max-w-7xl relative h-[70vh] sm:h-[80vh] rounded-[2rem] sm:rounded-[3rem] overflow-hidden shadow-2xl bg-[#0a0a0a]"
      >
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <motion.div style={{ scale: imageScale }} className="relative w-full h-full">
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, 1400px"
              priority={index === 0}
              className="object-cover"
            />
          </motion.div>
          {/* Gradient carries the contrast work now instead of a flat opacity dim,
              so the top of each screenshot stays crisp and readable. */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10" />
        </div>

        <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-16">
           <div className="flex justify-between items-end">
              <div>
                <p className="font-mono text-xs sm:text-sm text-gray-400 mb-4 tracking-[0.2em] uppercase">
                  Project 0{index + 1}
                </p>
                <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tighter mb-4 drop-shadow-md">
                  {project.title}
                </h2>
                <p className="text-lg sm:text-xl text-gray-300 max-w-xl leading-relaxed mb-8 drop-shadow-md">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className={`px-4 py-2 rounded-full border bg-black/50 backdrop-blur-md text-sm font-medium ${project.accent}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Mobile CTA — the round arrow button below is hidden on small screens,
                    so mobile visitors still get a tappable link */}
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sm:hidden mt-6 inline-flex items-center gap-1 text-white text-sm font-medium underline underline-offset-4"
                >
                  View project <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>

              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${project.title}`}
                className="hidden sm:flex w-20 h-20 rounded-full bg-white text-black items-center justify-center hover:scale-105 transition-transform cursor-pointer shadow-lg"
              >
                <ArrowUpRight className="w-8 h-8" />
              </a>
           </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Projects() {
  return (
    <section className="relative w-full bg-[#030303] pb-24">
       <div className="px-6 sm:px-12 xl:px-24 pt-24 pb-12">
          <h2 className="text-5xl sm:text-7xl font-black tracking-tighter text-white">
            Selected Works
          </h2>
       </div>

       {projects.map((project, i) => {
         const targetScale = 1 - ( (projects.length - i) * 0.05 );
         return <Card key={project.id} project={project} index={i} targetScale={targetScale} />
       })}
     </section>
  );
}
