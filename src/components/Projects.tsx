"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Tea Country Holidays",
    description:
      "Commercial travel booking platform built for a travel agency client. Architected a custom CMS independently managing 94+ packages across 24 destinations, and automated client-ready PDF itinerary generation.",
    tags: ["Next.js 14", "React 19", "Supabase", "PostgreSQL", "Tailwind CSS", "Python (ReportLab)", "PKCE OAuth"],
    link: "https://tea-country-holidays.vercel.app",
    images: [
      "/assets/projects/tea-1.jpg",
      "/assets/projects/tea-2.jpg",
      "/assets/projects/tea-3.jpg",
    ],
  },
  {
    id: 2,
    title: "Gym CRM (IQ Iron Fitness)",
    description:
      "Commercial CRM solution designed, built, and sold to a local gym owner. Manages 500+ members with WhatsApp broadcast messaging, OCR-powered document scanning onboarding, and a companion billing generator.",
    tags: ["HTML", "JavaScript", "OCR (Tesseract)", "WhatsApp API", "Billing Engine"],
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
      "Escrow-enabled gaming marketplace built for a Clash of Clans YouTube creator's community. Features native order management, integrating Razorpay and PayPal to support secure cross-border transactions.",
    tags: ["Next.js", "Supabase", "Razorpay", "PayPal", "Escrow Engine"],
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

function ProjectImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
      />
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

        {/* Text content */}
        <div className="w-full lg:w-[38%] flex flex-col justify-center z-10">
          <p className="font-coffekan text-3xl sm:text-5xl text-white/50 mb-4 tracking-wider">
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
                <ProjectImage src={project.images[1]} alt={`${project.title} screenshot 2`} />
              </div>
            ) : (
              <motion.div
                style={{ y: leftY, x: leftX, rotate: leftRotate }}
                className="absolute left-[-10%] w-[56%] aspect-[16/10] rounded-2xl overflow-hidden shadow-lg border border-white/10 z-0 scale-95 opacity-80"
              >
                <ProjectImage src={project.images[1]} alt={`${project.title} screenshot 2`} />
              </motion.div>
            )}

            {/* Center card */}
            <motion.div
              style={reducedMotion ? {} : { scale: centerScale }}
              className="relative w-[72%] aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl border border-white/15 z-10 hover:shadow-[0_0_30px_rgba(255,255,255,0.08)] transition-shadow duration-300"
            >
              <ProjectImage src={project.images[0]} alt={`${project.title} screenshot 1`} />
            </motion.div>

            {/* Right card */}
            {reducedMotion ? (
              <div className="absolute right-[-10%] w-[56%] aspect-[16/10] rounded-2xl overflow-hidden shadow-lg border border-white/10 z-0 scale-95 opacity-80">
                <ProjectImage src={project.images[2]} alt={`${project.title} screenshot 3`} />
              </div>
            ) : (
              <motion.div
                style={{ y: rightY, x: rightX, rotate: rightRotate }}
                className="absolute right-[-10%] w-[56%] aspect-[16/10] rounded-2xl overflow-hidden shadow-lg border border-white/10 z-0 scale-95 opacity-80"
              >
                <ProjectImage src={project.images[2]} alt={`${project.title} screenshot 3`} />
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
          Paid Projects
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
