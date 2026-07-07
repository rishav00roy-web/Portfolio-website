"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Tea Country Holidays",
    description: "Custom CMS module for 90+ travel packages and CRM migration via Python scraper.",
    tags: ["Next.js", "Supabase", "Tailwind CSS"],
    image: "/assets/TEA COUNTRY SITE/Screenshot 2026-07-07 232203.png", 
  },
  {
    id: 2,
    title: "Gym CRM",
    description: "Offline-first localStorage CRM with OCR for rapid customer onboarding.",
    tags: ["HTML", "JavaScript", "OCR"],
    image: "/assets/IQ IRON FITNESS GYM CRM/Screenshot 2026-07-07 232423.png",
  },
  {
    id: 3,
    title: "ClashVault",
    description: "Escrow-style order management system with Razorpay integration and events engine.",
    tags: ["Next.js", "Supabase", "Razorpay"],
    image: "/assets/projects/tea2.png", 
  },
];

type Project = {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
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
        style={{ scale, top: "calc(10vh + px)" }} 
        className="w-full max-w-7xl relative h-[70vh] sm:h-[80vh] rounded-[2rem] sm:rounded-[3rem] overflow-hidden shadow-2xl glass-panel shadow-neon-hover border border-white/5"
      >
        <div className="absolute inset-0 w-full h-full overflow-hidden rounded-[2rem] sm:rounded-[3rem]">
          <motion.img 
            style={{ scale: imageScale }}
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </div>
        
        <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-16 z-10">
           <div className="flex justify-between items-end">
              <div>
                <p className="font-heading text-xs sm:text-sm text-app-accent mb-4 tracking-[0.2em] uppercase font-bold">
                  Project 0{index + 1}
                </p>
                <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tighter mb-4 drop-shadow-lg font-heading">
                  {project.title}
                </h2>
                <p className="text-lg sm:text-xl text-gray-300 max-w-xl leading-relaxed mb-8 drop-shadow-md">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag: string) => (
                    <span key={tag} className="px-4 py-2 rounded-full border border-white/20 bg-black/50 backdrop-blur-md text-white text-sm font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="hidden sm:flex w-20 h-20 rounded-full bg-app-accent text-black items-center justify-center hover:scale-105 transition-transform cursor-pointer shadow-lg shadow-app-accent/20 hover:shadow-app-accent/40">
                <ArrowUpRight className="w-8 h-8" />
              </div>
           </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function FeaturedProjects() {
  return (
    <section id="projects" className="relative w-full border-t border-app-border pb-24">
       {/* Background Glow */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-app-accent rounded-full filter blur-[150px] opacity-[0.03] pointer-events-none" />

       <div className="px-6 sm:px-12 xl:px-24 pt-28 pb-12 max-w-6xl mx-auto">
          <h2 className="font-heading text-xs uppercase tracking-[0.2em] text-app-accent mb-3 font-bold">
            Featured Work
          </h2>
          <p className="font-heading text-4xl sm:text-5xl font-black tracking-tight">
            Problem-Solution Narratives
          </p>
       </div>

       {projects.map((project, i) => {
         const targetScale = 1 - ( (projects.length - i) * 0.05 );
         return <Card key={project.id} project={project} index={i} targetScale={targetScale} />
       })}
    </section>
  );
}
