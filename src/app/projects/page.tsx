import Link from "next/link";
import { caseStudiesData, projects } from "../../lib/projectsData";
import { ExternalLink, GitBranch, ArrowLeft, Terminal, Layout, ShieldAlert } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies | Rishav Roy",
  description: "Deep dives into commercial builds, tools, and technical experiments.",
};

export default function ProjectsPage() {
  const allCases = Object.keys(caseStudiesData).map(k => ({
    id: Number(k),
    ...caseStudiesData[Number(k)],
  }));

  return (
    <div className="min-h-screen bg-[#030303] text-white selection:bg-white/20">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full backdrop-blur-xl border-b border-white/5 bg-[#030303]/80">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-white/70 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <div className="font-mono text-xs text-white/40 uppercase tracking-widest">
            Case Studies
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-24 sm:py-32">
        {/* Intro */}
        <div className="max-w-3xl mb-24">
          <h1 className="text-4xl sm:text-6xl font-sans tracking-tight mb-6">
            Detailed Case Studies
          </h1>
          <p className="text-lg sm:text-xl text-white/50 leading-relaxed font-sans">
            A comprehensive look at the commercial builds, tools, and experiments I&apos;ve engineered. Each case study details the architecture, challenges overcome, and the ultimate business value delivered.
          </p>
        </div>

        {/* Case Studies List */}
        <div className="space-y-32 sm:space-y-48">
          {allCases.map((caseStudy, index) => {
            const projectMeta = projects.find(p => p.id === caseStudy.id);
            
            return (
              <article 
                key={caseStudy.id} 
                className="relative"
                id={`case-study-${caseStudy.id}`}
              >
                {/* Visual Anchor Line */}
                <div className="absolute -left-6 sm:-left-12 top-0 bottom-0 w-px bg-white/5 hidden md:block" />
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
                  {/* Left Column: Context & Metadata */}
                  <div className="lg:col-span-4 space-y-8">
                    <div>
                      <h2 className="text-3xl font-semibold mb-3">{caseStudy.title}</h2>
                      <p className="text-white/50 text-sm font-medium">{caseStudy.tagline}</p>
                    </div>

                    <div className="py-6 border-y border-white/5 space-y-4">
                      <div>
                        <span className="block text-xs font-mono text-white/30 uppercase tracking-wider mb-1">Client</span>
                        <span className="text-sm text-white/80">{caseStudy.client}</span>
                      </div>
                      <div>
                        <span className="block text-xs font-mono text-white/30 uppercase tracking-wider mb-1">Timeline</span>
                        <span className="text-sm text-white/80">{caseStudy.period}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {caseStudy.tags.map((tag: string) => (
                        <span 
                          key={tag}
                          className="px-2 py-1 text-[10px] font-mono tracking-wider uppercase bg-white/5 text-white/60 rounded border border-white/5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="pt-4 flex flex-col gap-4">
                      {caseStudy.links.map((link: any, i: number) => (
                        <a
                          key={i}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-xl text-white font-medium hover:bg-white/10 hover:border-white/40 transition-all shadow-xl text-sm w-fit"
                        >
                          <span>{link.label}</span>
                          {link.icon === "github" ? (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#2EA44F] group-hover:scale-110 transition-transform">
                              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                            </svg>
                          ) : (
                            <ExternalLink className="w-5 h-5 text-orange-400 group-hover:scale-110 transition-transform" />
                          )}
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Deep Explanation */}
                  <div className="lg:col-span-8 space-y-16">
                    
                    {/* The Problem & Solution */}
                    <div className="space-y-8">
                      <section>
                        <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: caseStudy.color }} />
                          The Problem
                        </h3>
                        <p className="text-white/60 leading-relaxed text-sm sm:text-base">
                          {caseStudy.problem}
                        </p>
                      </section>
                      <section>
                        <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: caseStudy.color }} />
                          The Solution
                        </h3>
                        <p className="text-white/60 leading-relaxed text-sm sm:text-base">
                          {caseStudy.solution}
                        </p>
                      </section>
                    </div>

                    {/* Architecture */}
                    <section className="bg-white/5 rounded-2xl p-6 sm:p-8 border border-white/5">
                      <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                        <Layout className="w-5 h-5 text-white/40" />
                        Architecture & Flow
                      </h3>
                      <p className="text-white/50 text-sm mb-6 pb-6 border-b border-white/5">
                        {caseStudy.architecture.description}
                      </p>
                      <div className="space-y-6">
                        {caseStudy.architecture.steps.map((step: any, i: number) => (
                          <div key={i} className="flex gap-4">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/10 text-white/50 flex items-center justify-center text-xs font-mono">
                              {i + 1}
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-white/90 mb-1">{step.title}</h4>
                              <p className="text-sm text-white/50">{step.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>

                    {/* Challenges */}
                    <section>
                      <h3 className="text-lg font-medium mb-6 flex items-center gap-2 text-white/90">
                        <ShieldAlert className="w-5 h-5 text-white/40" />
                        Key Challenges & Fixes
                      </h3>
                      <div className="grid gap-6">
                        {caseStudy.challenges.map((challenge: any, i: number) => (
                          <div key={i} className="pl-4 border-l-2 border-white/10 space-y-3">
                            <h4 className="text-base font-medium text-white/80">{challenge.title}</h4>
                            <p className="text-sm text-white/40 leading-relaxed">
                              <strong className="text-white/60 font-medium">Issue:</strong> {challenge.description}
                            </p>
                            <p className="text-sm text-white/40 leading-relaxed">
                              <strong className="text-white/60 font-medium">Fix:</strong> {challenge.fix}
                            </p>
                          </div>
                        ))}
                      </div>
                    </section>

                    {/* Metrics Grid */}
                    <section>
                      <h3 className="text-lg font-medium mb-6 flex items-center gap-2 text-white/90">
                        <Terminal className="w-5 h-5 text-white/40" />
                        Impact & Metrics
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {caseStudy.metrics.map((metric: any, i: number) => (
                          <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5">
                            <div className="text-2xl font-medium mb-2" style={{ color: caseStudy.color }}>
                              {metric.value}
                            </div>
                            <div className="text-[10px] uppercase tracking-wider font-mono text-white/40">
                              {metric.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>

                    {/* Conclusion / Business Value */}
                    <section className="space-y-4">
                      <h3 className="text-lg font-medium">Business Value</h3>
                      <p className="text-white/60 leading-relaxed text-sm sm:text-base">
                        {caseStudy.businessValue}
                      </p>
                    </section>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </main>

      <footer className="py-12 border-t border-white/5 text-center text-sm text-white/30 font-mono">
        Rishav Roy — Case Studies Archive
      </footer>
    </div>
  );
}
