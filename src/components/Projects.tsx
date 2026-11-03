"use client";

import Image from "next/image";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { ArrowUpRight } from "lucide-react";
import dynamic from "next/dynamic";

// Renders nothing until a card is opened; defer it out of the initial bundle.
const CaseStudyModal = dynamic(() => import("./CaseStudyModal"), { ssr: false });

import { projects, getSlugById } from "../lib/projectsData";

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
        className="object-cover pointer-events-none"
      />
    </div>
  );
}

function Card({
  project,
  index,
  onOpenCaseStudy,
}: {
  project: Project;
  index: number;
  onOpenCaseStudy: (id: number) => void;
}) {
  // Derived straight from the project id - no state, no effect.
  const status: ProjectStatus | null =
    project.id === 1 || project.id === 2
      ? { text: "Live", isLive: true }
      : project.id === 3
        ? { text: "In Progress", isRepo: true }
        : null;

  return (
    <div data-card className="relative w-full lg:w-screen h-auto lg:h-full flex items-center justify-center px-4 sm:px-12 xl:px-24 shrink-0 py-4 lg:py-0">
      <div className="w-full max-w-7xl relative h-auto lg:h-[75dvh] sm:lg:h-[80dvh] rounded-2xl sm:rounded-[28px] overflow-hidden bg-surface bg-[radial-gradient(70%_60%_at_100%_0%,rgba(245,179,1,0.09),transparent_65%)] border border-white/[0.07] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.85)] flex flex-col lg:flex-row p-5 sm:p-12 xl:p-16 gap-3 sm:gap-4 lg:gap-12">

        {/* Text content */}
        <div data-card-copy className="w-full lg:w-[38%] flex flex-col justify-start lg:justify-center z-10 pb-2 lg:pb-0 shrink-0">
          <p className="font-coffekan text-3xl sm:text-5xl text-accent mb-1 sm:mb-4 tracking-wide">
            Project 0{index + 1}
          </p>

          <a
            href={`/projects/${getSlugById(project.id)}`}
            onClick={(e) => { e.preventDefault(); onOpenCaseStudy(project.id); }}
            className="group/title inline-flex items-center gap-2 sm:gap-3 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
          >
            <h3 className="text-2xl sm:text-5xl xl:text-6xl font-display uppercase tracking-tight text-white group-hover/title:text-white/80 transition-colors leading-[1.0] mb-1 sm:mb-4">
              {project.title}
            </h3>
            <ArrowUpRight className="w-6 h-6 sm:w-8 sm:h-8 opacity-0 group-hover/title:opacity-100 group-hover/title:translate-x-1 group-hover/title:-translate-y-1 transition-all duration-300 text-white/80" />
          </a>

          <p className="text-xs sm:text-lg text-white/60 max-w-xl leading-relaxed mb-4 sm:mb-8 font-sans line-clamp-3 sm:line-clamp-none">
            {project.description}
          </p>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3 pr-2 sm:pr-24 lg:pr-0">
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {project.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 sm:px-4 sm:py-1.5 rounded-full border border-white/10 bg-surface-2 text-white/80 text-[10px] sm:text-sm font-sans"
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
        <div className="w-full lg:w-[62%] flex-1 min-h-[250px] sm:min-h-[350px] lg:min-h-0 lg:h-full relative flex items-center justify-center z-10 overflow-hidden lg:overflow-visible mt-6 sm:mt-8 pb-4 sm:pb-0">
          <div className="relative w-[100%] sm:w-[90%] h-[100%] sm:h-[90%] flex items-center justify-center">
            {/* Left card */}
            <div data-card-side="left" className="absolute left-[2%] sm:left-[-10%] w-[48%] sm:w-[56%] aspect-[16/10] rounded-2xl overflow-hidden shadow-lg border border-white/10 z-0 scale-95 opacity-80">
                <ProjectImage src={project.images[1]} alt={`${project.title} screenshot 2`} />
              </div>

            {/* Center card */}
            <div
              data-card-center
              className="relative w-[65%] sm:w-[72%] aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl border border-white/15 z-10 hover:shadow-[0_0_30px_rgba(255,255,255,0.08)] transition-shadow duration-300 cursor-pointer"
              onClick={() => onOpenCaseStudy(project.id)}
            >
              <ProjectImage src={project.images[0]} alt={`${project.title} screenshot 1`} />
            </div>

            {/* Right card */}
            <div data-card-side="right" className="absolute right-[2%] sm:right-[-10%] w-[48%] sm:w-[56%] aspect-[16/10] rounded-2xl overflow-hidden shadow-lg border border-white/10 z-0 scale-95 opacity-80">
                <ProjectImage src={project.images[2]} alt={`${project.title} screenshot 3`} />
              </div>
          </div>
        </div>

        {/* Floating action button */}
        <a
          href={`/projects/${getSlugById(project.id)}`}
          onClick={(e) => { e.preventDefault(); onOpenCaseStudy(project.id); }}
          className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 flex w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-accent text-background items-center justify-center hover:scale-105 transition-transform shadow-lg z-20 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          aria-label={`View ${project.title} case study`}
        >
          <ArrowUpRight className="w-6 h-6 sm:w-8 sm:h-8 group-hover:rotate-45 transition-transform duration-300" />
        </a>
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

  // Desktop: pin the section and slide the track sideways as you scroll down,
  // with each card's collage drifting against it. Phones and reduced motion
  // get a plain vertical stack.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const track = outerRef.current?.querySelector<HTMLElement>("[data-track]");
        if (!track) return;
        const distance = () => track.scrollWidth - window.innerWidth;
        const slide = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: outerRef.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        gsap.utils.toArray<HTMLElement>("[data-card]").forEach((card) => {
          const at = { trigger: card, containerAnimation: slide, start: "left right", end: "right left", scrub: true };
          gsap.fromTo(card.querySelector("[data-card-side='left']"), { yPercent: -10, rotate: -5 }, { yPercent: 10, rotate: 3, ease: "none", scrollTrigger: at });
          gsap.fromTo(card.querySelector("[data-card-side='right']"), { yPercent: 10, rotate: 5 }, { yPercent: -10, rotate: -3, ease: "none", scrollTrigger: at });
          gsap.fromTo(card.querySelector("[data-card-center]"), { scale: 0.92 }, { scale: 1.04, ease: "none", scrollTrigger: { ...at, end: "center center" } });
        });
        ScrollTrigger.refresh();
      });
      return () => mm.revert();
    },
    { scope: outerRef },
  );

  return (
    <section id="projects" className="relative w-full bg-transparent">
      {/* Section header */}
      <div className="px-6 sm:px-12 xl:px-24 pt-32 pb-12">
        <h2 className="text-[17vw] sm:text-[12vw] xl:text-[10vw] font-display uppercase tracking-[-0.02em] text-white leading-[0.85]">
          Paid Projects
        </h2>
        <p className="mt-4 max-w-xl text-base sm:text-lg text-white/65">
          <span className="font-coffekan text-3xl sm:text-4xl text-accent mr-2">for paying clients.</span>
          Commercial builds, each with a full case study.
        </p>
      </div>

      {/* Horizontal scroll track */}
      <div ref={outerRef} className="relative lg:h-[100dvh] lg:overflow-hidden">
        <div className="relative h-auto lg:h-[100dvh] w-full flex items-center">
          <div data-track className="flex flex-col lg:flex-row h-auto lg:h-full w-full gap-8 lg:gap-0 pb-24 lg:pb-0">
            {commercialProjects.map((project, i) => (
              <Card
                key={project.id}
                project={project}
                index={i}
                onOpenCaseStudy={setActiveProjectId}
              />
            ))}
          </div>
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
