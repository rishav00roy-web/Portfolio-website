"use client";

export default function About() {
  const skills = [
    {
      category: "Languages & Frameworks",
      items: ["JavaScript", "React", "Next.js", "Python", "Tailwind CSS"],
    },
    {
      category: "Backend & Database",
      items: ["Supabase", "PostgreSQL", "REST APIs", "Authentication"],
    },
    {
      category: "AI & Search Optimization",
      items: [
        "AI-Assisted Workflows",
        "Technical SEO",
        "AEO (AI Engine Optimization)",
        "GEO (Generative Engine Optimization)",
      ],
    },
    {
      category: "Tools & Infrastructure",
      items: ["Git", "GitHub", "Vercel"],
    },
  ];

  const experience = [
    {
      role: "FOIA Specialist",
      company: "SSB Media Pvt. Ltd.",
      period: "2025 to Present",
      bullets: [
        "Submitted and tracked 1,500+ FOIA requests to U.S. police departments.",
        "Managed and processed large volumes of bodycam footage.",
        "Built and maintained a nationwide contact database of police department PIO/FOIA officers.",
      ],
    },
    {
      role: "HR, Administration & Purchase",
      company: "3RM Management Limited",
      period: "2023 to 2024",
      bullets: [
        "Owned employee onboarding, records management, daily administration, and procurement processes.",
        "Coordinated procurement across departments with a proactive, professional approach.",
      ],
    },
    {
      role: "Assistant Manager",
      company: "Yogesh Commercial Pvt. Ltd. (YCPL)",
      period: "2021 to 2023",
      bullets: [
        "Oversaw documentation and compliance across infrastructure projects worth approximately ₹1.2 crore.",
        "Managed daily team operations and supported performance monitoring.",
      ],
    },
    {
      role: "Chief of Operations Officer",
      company: "Shangrila Interprise",
      period: "2020 to 2021",
      bullets: [
        "Led workforce allocation for up to 40 employees, optimizing labour costs while maintaining compliance.",
        "Supervised logistics, supply chain, procurement, and delivery.",
      ],
    },
  ];

  const education = [
    {
      degree: "Bachelor of Computer Applications (BCA), Semester II",
      school: "Manipal University, Jaipur",
      period: "2025, In Progress",
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
    <section className="relative bg-[#030303] px-6 sm:px-12 xl:px-24 py-24 sm:py-32 border-t border-white/10">
      <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
        {/* Title */}
        <div className="lg:w-1/3">
          <h2 className="font-sans font-extrabold text-5xl sm:text-7xl uppercase tracking-tight text-white sticky top-12">
            About
          </h2>
        </div>

        {/* Content */}
        <div className="lg:w-2/3 flex flex-col gap-16">
          {/* Bio / Story */}
          <div className="space-y-6">
            <p className="text-xl sm:text-2xl text-white/80 leading-relaxed font-sans font-medium">
              I got into software development by building commercial websites for real clients. From the beginning, I was drawn to solving real business problems rather than simply learning programming languages. Today, I design and build production software that focuses on reliability, maintainability, and measurable business value.
            </p>
            <p className="text-base sm:text-lg text-white/60 leading-relaxed font-sans">
              I treat AI as a productivity multiplier, not a replacement for engineering. It helps me move faster through architecture, debugging, testing, and repetitive tasks, but every technical decision is mine. I design the systems, review every line that matters, validate the results, and take full responsibility for what reaches production. If something breaks, I own it.
            </p>
            <p className="text-base sm:text-lg text-white/60 leading-relaxed font-sans">
              Before becoming a full-time developer, I spent more than six years in operations, working across HR, procurement, business administration, compliance, and team leadership. That experience fundamentally changed how I approach software. I understand the constraints businesses operate under because I&apos;ve worked on the other side of the table. I don&apos;t build features for the sake of shipping code. I build software that solves problems, improves workflows, and creates measurable value.
            </p>
          </div>

          {/* Work Experience */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-white/40 mb-6 border-b border-white/10 pb-2">
              Work Experience
            </h3>
            <div className="flex flex-col gap-10">
              {experience.map((exp, i) => (
                <div key={i} className="flex flex-col gap-3">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                    <h4 className="text-xl font-bold text-white uppercase tracking-tight">{exp.role}</h4>
                    <span className="font-mono text-xs text-white/40">{exp.period}</span>
                  </div>
                  <p className="text-white/70 font-mono text-xs uppercase tracking-wider">{exp.company}</p>
                  <ul className="list-disc pl-4 text-white/60 text-sm space-y-2 mt-2 leading-relaxed">
                    {exp.bullets.map((bullet, idx) => (
                      <li key={idx}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack & Skills */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-white/40 mb-6 border-b border-white/10 pb-2">
              Skills
            </h3>
            <div className="flex flex-col gap-6">
              {skills.map((group, idx) => (
                <div key={idx} className="space-y-2">
                  <h4 className="text-white/40 font-mono text-[10px] uppercase tracking-widest">{group.category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 border border-white/10 rounded-full font-mono text-[10px] sm:text-xs text-white/70 hover:border-white/40 hover:text-white transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-white/40 mb-6 border-b border-white/10 pb-2">
              Education
            </h3>
            <div className="flex flex-col gap-6">
              {education.map((edu, i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <div>
                    <h4 className="text-base font-bold text-white">{edu.degree}</h4>
                    <p className="text-white/60 text-sm font-mono mt-1">{edu.school}</p>
                  </div>
                  <span className="font-mono text-xs text-white/40">{edu.period}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-white/40 mb-6 border-b border-white/10 pb-2">
              Languages
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {languages.map((lang, i) => (
                <div key={i}>
                  <p className="text-white/80 text-sm font-medium">{lang.name}</p>
                  <p className="text-white/40 font-mono text-[10px] uppercase tracking-wider mt-1">{lang.level}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
