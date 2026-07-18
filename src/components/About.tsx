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
      items: ["Git", "GitHub", "Vercel", "OCR (Tesseract)", "Razorpay", "PayPal", "ReportLab"],
    },
  ];

  const experience = [
    {
      role: "FOIA Specialist",
      company: "SSB Media Pvt. Ltd.",
      period: "Jan 2025 – Jul 2026",
      isRemote: true,
      bullets: [
        "Managed high-volume Freedom of Information Act (FOIA) requests (1,500+ total requests submitted) in a fully remote environment.",
        "Coordinated with U.S. police departments and public agencies to obtain body-worn camera footage (processed 60+ files monthly) and public records.",
        "Maintained accurate documentation, tracked deadlines, and ensured compliance across multiple jurisdictions, maintaining a database of 100+ agencies.",
        "Communicated professionally through email and phone while managing multiple concurrent cases (sustaining 300–400 weekly emails).",
        "Demonstrated strong time management, written communication, and independent problem-solving in an asynchronous remote workflow.",
      ],
    },
    {
      role: "HR, Administration & Purchase",
      company: "3RM Management Limited",
      period: "Jan 2023 – Jan 2024",
      bullets: [
        "Directed HR operations for 30–40 field employees and 8–10 office staff.",
        "Managed INR 4–5 lakh in biweekly operational funds covering procurement and administrative expenses across departments.",
        "Prepared quotations of up to INR 5,10,000 for rural energy infrastructure projects.",
      ],
    },
    {
      role: "Assistant Manager",
      company: "Yogesh Commercial Pvt. Ltd. (YCPL)",
      period: "Jan 2021 – Jan 2023",
      bullets: [
        "Oversaw daily operations for a team of 30–40 laborers and 8–10 office staff.",
        "Recruited and hired 15 sales representatives within a 2–3 week window.",
        "Allocated INR 8–10 lakh in monthly funds toward sourcing and logistics for active rural energy infrastructure projects.",
        "Modernized decades of paper account records using OCR and Claude AI, replacing manual physical archives — an early hands-on introduction to AI-orchestrated workflows.",
      ],
    },
    {
      role: "Founder & COO",
      company: "Shangrila Enterprise",
      period: "Jan 2020 – Jan 2021",
      bullets: [
        "Founded and ran an independent commodity trading venture, hiring laborers on an as-needed basis (5–6 at a time).",
        "Grew the venture to INR 3.5 Cr in cumulative turnover, with individual transactions as large as INR 1.4 Cr.",
        "Owned compliance, procurement, and logistics end-to-end across 95+ locations in India.",
        "Sustained relationships with international buyers across Japan, China, and Russia.",
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
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
          >
            {/* Bio paragraphs */}
            <motion.div className="space-y-8" variants={staggerContainer}>
              <motion.p
                variants={fadeUp}
                className="text-2xl sm:text-3xl text-white/95 leading-relaxed font-sans font-medium"
              >
                I got into software development by building commercial websites for
                real clients. From the beginning, I was drawn to solving real
                business problems rather than simply learning programming
                languages. Today, I design and build production software that
                focuses on reliability, maintainability, and measurable business
                value.
              </motion.p>
              <motion.p
                variants={fadeUp}
                className="text-lg sm:text-xl text-white/80 leading-relaxed font-sans"
              >
                I treat AI as a productivity multiplier, not a replacement for
                engineering. It helps me move faster through architecture,
                debugging, testing, and repetitive tasks, but every technical
                decision is mine. I design the systems, review every line that
                matters, validate the results, and take full responsibility for
                what reaches production. If something breaks, I own it.
              </motion.p>
              <motion.p
                variants={fadeUp}
                className="text-lg sm:text-xl text-white/80 leading-relaxed font-sans"
              >
                Before becoming a full-time developer, I spent more than six years
                in operations, working across HR, procurement, business
                administration, compliance, and team leadership. That experience
                fundamentally changed how I approach software. I understand the
                constraints businesses operate under because I&apos;ve worked on
                the other side of the table. I don&apos;t build features for the
                sake of shipping code. I build software that solves problems,
                improves workflows, and creates measurable value.
              </motion.p>
            </motion.div>

            {/* Work Experience */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-white/60 mb-6 border-b border-white/10 pb-2">
                Work Experience
              </h3>
              <motion.div
                className="flex flex-col gap-10"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
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
              viewport={{ once: true, margin: "-60px" }}
            >
              <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-white/60 mb-6 border-b border-white/10 pb-2">
                Skills
              </h3>
              <motion.div
                className="flex flex-col gap-6"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
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
              viewport={{ once: true, margin: "-60px" }}
            >
              <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-white/60 mb-6 border-b border-white/10 pb-2">
                Education
              </h3>
              <motion.div
                className="flex flex-col gap-6"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
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
              viewport={{ once: true, margin: "-60px" }}
            >
              <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-white/60 mb-6 border-b border-white/10 pb-2">
                Languages
              </h3>
              <motion.div
                className="grid grid-cols-2 sm:grid-cols-4 gap-4"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
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
