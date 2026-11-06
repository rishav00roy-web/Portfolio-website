/**
 * Profile content for the homepage. Kept apart from the components so the
 * same facts feed the rendered page and the JSON-LD in layout.tsx.
 */

export const PROFILE = {
  name: "Rishav Roy",
  role: "Operations & Automation Specialist",
  tagline: "Ex-ops guy who got tired of manual work. Now I build tools so nobody else has to.",
  summary:
    "Six years in operations, HR and procurement, now building software that removes manual work: FOIA processing at scale, custom CRMs and automation.",
  location: "Kolkata, India",
  hometown: "Jorhat, Assam",
  email: "rishav2000roy@gmail.com",
  phone: "+91 60019 14771",
  phoneHref: "tel:+916001914771",
  resume: "/Rishav-Roy-CV.pdf",
  resumeUpdated: "July 2026",
  currently: ["Tea Country Holidays", "IQ Iron Fitness", "Clash Bazar"],
  socials: [
    { label: "GitHub", handle: "@rishav00roy-web", url: "https://github.com/rishav00roy-web" },
    { label: "LinkedIn", handle: "Rishav Roy", url: "https://www.linkedin.com/in/rishav-the-roy/" },
    { label: "Instagram", handle: "@justbeingpsunk_", url: "https://instagram.com/justbeingpsunk_" },
  ],
} as const;

export const bio = [
  "My path into software engineering didn't start with side projects. It started with shipping commercial platforms for paying clients. After six-plus years in operations, I got tired of watching businesses drown in manual work. So I started building the tools to fix it.",
  "Today I build production-ready web applications with a focus on reliability, easy maintenance, and real business value. My operational background runs through everything I build: I don't write code for the sake of it. I build systems that non-technical owners can actually run themselves: managing their own data, their own pricing, their own content, without calling a developer every time something needs to change.",
  "I use AI heavily as a development and productivity tool. It accelerates architecture decisions, debugging, testing, and routine work. But I don't treat it as a substitute for engineering judgment. I architect the systems, review every critical line of code, validate the outcomes, and take full responsibility for the final product. I'm also actively deepening my understanding of AI systems, exploring areas like retrieval-augmented generation and model evaluation, while continuing to ship production software for real clients.",
];

export const highlights = [
  { value: "6+", label: "Years in operations" },
  { value: "1,500+", label: "FOIA requests filed" },
  { value: "INR 3.5 Cr", label: "Turnover as founder" },
  { value: "110+", label: "Gym members on my CRM" },
];

export const experience = [
  {
    role: "FOIA Specialist",
    company: "SSB Media Pvt. Ltd.",
    period: "Jan 2025 to Jul 2026",
    remote: true,
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

export const skills = [
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
    items: ["Claude Code", "Codex", "Gemini", "Kimi K2", "Multi-Agent AI Workflows", "Prompt Engineering", "AI Code Review"],
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

export const education = [
  {
    degree: "Bachelor of Computer Applications (BCA), Semester II",
    school: "Manipal University, Jaipur",
  },
  {
    degree: "Senior Secondary (Arts)",
    school: "Kendriya Vidyalaya, Vikaspuri, New Delhi",
    period: "2019",
  },
];

export const languages = [
  { name: "English", level: "Fluent" },
  { name: "Hindi", level: "Fluent" },
  { name: "Assamese", level: "Fluent" },
  { name: "Bangla", level: "Basic" },
];

export const certificates = [
  {
    title: "Introduction to AI",
    issuer: "Google, via Coursera",
    pdf: "/certificates/Coursera-Certificate-1.pdf",
    image: "/certificates/Coursera-Certificate-1.png",
  },
  {
    title: "Maximize Productivity With AI Tools",
    issuer: "Google, via Coursera",
    pdf: "/certificates/Coursera-Certificate-2.pdf",
    image: "/certificates/Coursera-Certificate-2.png",
  },
];
