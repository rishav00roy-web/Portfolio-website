"use client";

import { motion, MotionConfig } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] },
  },
} as const;

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
} as const;

export default function About() {
  const skills = [
    {
      category: "Languages & Frameworks",
      items: ["JavaScript", "Next.js", "React", "HTML5", "CSS3", "Tailwind CSS", "Python"],
    },
    {
      category: "Backend & Data",
      items: ["Supabase", "PostgreSQL", "REST APIs", "Database Design", "Authentication (PKCE OAuth)"],
    },
    {
      category: "AI-Orchestrated Development",
      items: [
        "Claude Code",
        "Codex",
        "Gemini",
        "Kimi K2",
        "Multi-Agent AI Workflows",
        "Prompt Engineering",
        "AI Code Review",
      ],
    },
    {
      category: "SEO & Performance",
      items: [
        "Technical SEO",
        "Answer Engine Optimization (AEO)",
        "Generative Engine Optimization (GEO)",
        "Schema.org Structured Data",
        "Core Web Vitals",
      ],
    },
    {
      category: "Tools & Platforms",
      items: ["Git", "GitHub", "Vercel", "OCR (Tesseract)", "Stripe", "PayPal"],
    },
  ];

  const experience = [
    {
      role: "FOIA Specialist",
      company: "SSB Media Pvt. Ltd.",
      period: "Jan 2025 to Jul 2026",
      isRemote: true,
      bullets: [
        "Processed a massive volume of Freedom of Information Act requests (1,500+ submitted) while working fully remotely.",
        "Collaborated with U.S. police departments and public agencies to secure body-worn camera footage, averaging 55 files per month with a personal best of 110.",
        "Ensured accurate documentation, monitored strict deadlines, and upheld compliance across various jurisdictions while overseeing a database of 100+ agencies.",
        "Managed multiple simultaneous cases via professional email and phone correspondence, handling between 300 and 400 emails each week.",
        "Developed exceptional time management, written communication, and autonomous problem-solving abilities within an asynchronous remote work environment.",
      ],
    },
    {
      role: "HR, Administration & Purchase",
      company: "3RM Management Limited",
      period: "Jan 2023 to Jan 2024",
      bullets: [
        "Directed HR operations supporting a team of 30 to 40 field employees and 8 to 10 office staff members.",
        "Administered INR 4 to 5 lakh in biweekly operational budgets covering procurement and general administrative expenses.",
        "Drafted project quotations reaching up to INR 5,10,000 for various rural energy infrastructure initiatives.",
      ],
    },
    {
      role: "Assistant Manager",
      company: "Yogesh Commercial Pvt. Ltd. (YCPL)",
      period: "Jan 2021 to Jan 2023",
      bullets: [
        "Supervised day-to-day operations for a workforce comprising 30 to 40 laborers and 8 to 10 office employees.",
        "Sourced and onboarded 15 new sales representatives during a tight 2 to 3 week timeframe.",
        "Distributed INR 8 to 10 lakh on a monthly basis to manage sourcing and logistics for ongoing rural energy infrastructure developments.",
        "Converted decades of physical account files into digital formats using OCR and Claude AI, completely phasing out paper archives. This initiative served as my introduction to practical AI-orchestrated workflows.",
      ],
    },
    {
      role: "Founder & COO",
      company: "Shangrila Enterprise",
      period: "Jan 2020 to Jan 2021",
      bullets: [
        "Established and operated an independent commodity trading business, bringing on laborers on an as-needed basis (typically 5 to 6 concurrently).",
        "Grew the business to achieve INR 3.5 Cr in total cumulative turnover, securing individual transactions valued up to INR 1.4 Cr.",
        "Managed all aspects of compliance, procurement, and logistics from start to finish across 95+ locations throughout India.",
        "Cultivated and sustained strong business relationships with international clients located in Japan, China, and Russia.",
      ],
    },
  ];

  const education = [
    {
      degree: "Bachelor of Computer Applications (BCA), Semester II",
      school: "Manipal University, Jaipur",
      period: "Currently Pursuing",
    },
    {
      degree: "Senior Secondary (Arts)",
      school: "Kendriya Vidyalaya, Vikaspuri, New Delhi",
      period: "2019",
    },
  ];

  const languages = [
    { name: "English", level: "Fluent" },
    { name: "Hindi", level: "Fluent" },
    { name: "Assamese", level: "Fluent" },
    { name: "Bangla", level: "Basic" },
  ];

  return (
    <MotionConfig reducedMotion="user">
      <section id="about" className="relative bg-transparent px-6 sm:px-12 xl:px-24 py-24 sm:py-32 border-t border-white/10">
        {/* Scrim layer — sits above the global grid, below the content */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/95 to-black/0 pointer-events-none" />

        {/* Faint background watermark */}
        <div className="absolute top-16 right-6 sm:right-12 xl:right-24 font-display text-[12rem] sm:text-[18rem] xl:text-[24rem] leading-none text-white/[0.015] pointer-events-none select-none">
          02
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row gap-16 lg:gap-24">
          {/* Sticky title */}
          <div className="lg:w-1/3">
            <h2 className="font-display font-extrabold text-5xl sm:text-7xl uppercase tracking-tight text-white sticky top-12">
              About
            </h2>
          </div>

          {/* Content */}
          <motion.div
            className="lg:w-2/3 flex flex-col gap-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {/* Bio paragraphs */}
            <motion.div className="space-y-8" variants={staggerContainer}>
              <motion.p
                variants={fadeUp}
                className="text-2xl sm:text-3xl text-white/95 leading-relaxed font-sans font-medium"
              >
                My path into software engineering didn&#39;t start with side projects—it
                started with shipping commercial platforms for paying clients. After
                six-plus years in operations, I got tired of watching businesses drown
                in manual work. So I started building the tools to fix it.
              </motion.p>
              <motion.p
                variants={fadeUp}
                className="text-lg sm:text-xl text-white/80 leading-relaxed font-sans"
              >
                Today I build production-ready web applications with a focus on
                reliability, easy maintenance, and real business value. My operational
                background runs through everything I build: I don&#39;t write code for
                the sake of it. I build systems that non-technical owners can actually
                run themselves—managing their own data, their own pricing, their own
                content—without calling a developer every time something needs to change.
              </motion.p>
              <motion.p
                variants={fadeUp}
                className="text-lg sm:text-xl text-white/80 leading-relaxed font-sans"
              >
                I use AI heavily as a development and productivity tool. It accelerates
                architecture decisions, debugging, testing, and routine work. But I
                don&#39;t treat it as a substitute for engineering judgment. I architect
                the systems, review every critical line of code, validate the outcomes,
                and take full responsibility for the final product. I&#39;m also actively
                deepening my understanding of AI systems—exploring areas like
                retrieval-augmented generation and model evaluation—while continuing
                to ship production software for real clients.
              </motion.p>
            </motion.div>

            {/* Work Experience */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-white/60 mb-6 border-b border-white/10 pb-2">
                Work Experience
              </h3>
              <motion.div
                className="flex flex-col gap-10"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {experience.map((exp, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    className="flex flex-col gap-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                      <div className="flex items-center flex-wrap gap-3">
                        <h4 className="text-xl sm:text-2xl font-bold text-white uppercase tracking-tight">
                          {exp.role}
                        </h4>
                        {"isRemote" in exp && exp.isRemote && (
                          <span className="px-2.5 py-1 rounded border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 font-mono text-xs uppercase tracking-widest font-bold">
                            Remote
                          </span>
                        )}
                      </div>
                      <span className="font-mono text-xs sm:text-sm text-white/60">
                        {exp.period}
                      </span>
                    </div>
                    <p className="text-white/85 font-mono text-xs sm:text-sm uppercase tracking-wider">
                      {exp.company}
                    </p>
                    <ul className="list-disc pl-4 text-white/85 text-sm sm:text-base space-y-2 mt-2 leading-relaxed font-sans">
                      {exp.bullets.map((bullet, idx) => (
                        <li key={idx}>{bullet}</li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Skills */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-white/60 mb-6 border-b border-white/10 pb-2">
                Skills
              </h3>
              <motion.div
                className="flex flex-col gap-6"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {skills.map((group, idx) => (
                  <motion.div key={idx} variants={fadeUp} className="space-y-2">
                    <h4 className="text-white/60 font-mono text-[10px] sm:text-xs uppercase tracking-widest">
                      {group.category}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map((skill, i) => (
                        <span
                          key={i}
                          className="px-3 py-1.5 border border-white/10 rounded-full font-mono text-[10px] sm:text-xs text-white/85 bg-white/[0.03] hover:bg-white/[0.08] backdrop-blur-md hover:border-white/30 hover:text-white transition-all shadow-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Education */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-white/60 mb-6 border-b border-white/10 pb-2">
                Education
              </h3>
              <motion.div
                className="flex flex-col gap-6"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {education.map((edu, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2"
                  >
                    <div>
                      <h4 className="text-base sm:text-lg font-bold text-white">
                        {edu.degree}
                      </h4>
                      <p className="text-white/80 text-sm font-mono mt-1">
                        {edu.school}
                      </p>
                    </div>
                    <span className="font-mono text-xs sm:text-sm text-white/60">
                      {edu.period}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Languages */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-white/60 mb-6 border-b border-white/10 pb-2">
                Languages
              </h3>
              <motion.div
                className="grid grid-cols-2 sm:grid-cols-4 gap-4"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {languages.map((lang, i) => (
                  <motion.div key={i} variants={fadeUp}>
                    <p className="text-white/90 text-sm sm:text-base font-medium">
                      {lang.name}
                    </p>
                    <p className="text-white/60 font-mono text-[10px] uppercase tracking-wider mt-1">
                      {lang.level}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}
