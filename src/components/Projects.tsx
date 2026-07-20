"use client";

import Image from "next/image";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import CaseStudyModal from "./CaseStudyModal";

import { projects } from "../lib/projectsData";

type Project = {
  id: number;
  title: string;
  description: string;
  tags: string[];
  link: string;
  images: string[];
};

interface ProjectStatus {
  text: string;
  isLive?: boolean;
  isRepo?: boolean;
}

const projectAccents: Record<number, { text: string; dot: string; border: string; bg: string }> = {
  1: {
    text: "text-amber-400/90",
    dot: "bg-amber-400",
    border: "border-amber-500/20",
    bg: "bg-amber-500/5",
  },
  2: {
    text: "text-emerald-400/90",
    dot: "bg-emerald-400",
    border: "border-emerald-500/20",
    bg: "bg-emerald-500/5",
  },
  3: {
    text: "text-violet-400/90",
    dot: "bg-violet-400",
    border: "border-violet-500/20",
    bg: "bg-violet-500/5",
  },
};

function ProjectImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover"
      />
    </div>
  );
}

function Card({
  project,
  index,
  scrollYProgress,
  reducedMotion,
  onOpenCaseStudy,
}: {
  project: Project;
  index: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  reducedMotion: boolean | null;
  onOpenCaseStudy: (id: number) => void;
}) {
  const count = projects.length;
  const [status, setStatus] = useState<ProjectStatus | null>(
    project.id === 2
      ? { text: "Repository", isRepo: true }
      : project.id === 3
      ? { text: "In Progress", isRepo: true }
      : null
  );

  useEffect(() => {
    if (project.id === 1) {
      fetch("https://tea-country-holidays.vercel.app", { method: "HEAD", mode: "no-cors" })
        .then(() => {
          setStatus({ text: "Live", isLive: true });
        })
        .catch(() => {
          setStatus({ text: "Unreachable", isLive: false });
        });
    }
  }, [project.id]);
  
  const step = 1 / count;
  const start = index * step;
  const end = start + step;

  const centerScale = useTransform(
    scrollYProgress,
    [start, start + step * 0.4, start + step * 0.6, end],
    [0.94, 1.08, 1.08, 0.94]
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

        {/* Text content */}
        <div className="w-full lg:w-[38%] flex flex-col justify-center z-10 pb-20 lg:pb-0">
          <p className="font-coffekan text-3xl sm:text-5xl text-white/50 mb-4 tracking-wider">
            Project 0{index + 1}
          </p>

          <button
            onClick={() => onOpenCaseStudy(project.id)}
            className="group/title inline-flex items-center gap-3 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
          >
            <h2 className="text-4xl sm:text-5xl xl:text-6xl font-display uppercase tracking-tight text-white group-hover/title:text-white/80 transition-colors leading-[1.0] mb-4">
              {project.title}
            </h2>
            <ArrowUpRight className="w-8 h-8 opacity-0 group-hover/title:opacity-100 group-hover/title:translate-x-1 group-hover/title:-translate-y-1 transition-all duration-300 text-white/80" />
          </button>

          <p className="text-base sm:text-lg text-white/60 max-w-xl leading-relaxed mb-6 font-sans">
            {project.description}
          </p>

          <div className="flex flex-wrap items-center gap-3">
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

            {status && (
              <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border ${projectAccents[project.id].border} ${projectAccents[project.id].bg} ${projectAccents[project.id].text} text-xs font-mono backdrop-blur-md`}>
                <span className={`w-1.5 h-1.5 rounded-full ${status.isLive ? "bg-emerald-500 animate-pulse" : status.isRepo ? projectAccents[project.id].dot : "bg-gray-500"}`} />
                <span>{status.text}</span>
              </div>
            )}
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
              className="relative w-[72%] aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl border border-white/15 z-10 hover:shadow-[0_0_30px_rgba(255,255,255,0.08)] transition-shadow duration-300 cursor-pointer"
              onClick={() => onOpenCaseStudy(project.id)}
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
        <button
          onClick={() => onOpenCaseStudy(project.id)}
          className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 flex w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white text-black items-center justify-center hover:scale-105 transition-transform shadow-lg z-20 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          aria-label={`View ${project.title} case study`}
        >
          <ArrowUpRight className="w-6 h-6 sm:w-8 sm:h-8 group-hover:rotate-45 transition-transform duration-300" />
        </button>
      </div>
    </div>
  );
}

interface ProjectsProps {
  activeProjectId: number | null;
  setActiveProjectId: (id: number | null) => void;
}

export default function Projects({ activeProjectId, setActiveProjectId }: ProjectsProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const commercialProjects = projects.filter(p => p.id !== 4);
  const count = commercialProjects.length;
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
    <section id="projects" className="relative w-full bg-transparent">
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
            {commercialProjects.map((project, i) => (
              <Card
                key={project.id}
                project={project}
                index={i}
                scrollYProgress={scrollYProgress}
                reducedMotion={reducedMotion}
                onOpenCaseStudy={setActiveProjectId}
              />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Slide-over case study modal */}
      <CaseStudyModal
        projectId={activeProjectId}
        onClose={() => setActiveProjectId(null)}
      />
    </section>
  );
}
