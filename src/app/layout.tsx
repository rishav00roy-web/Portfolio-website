import type { Metadata } from "next";
import { Sora, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import FontPreloader from "@/components/FontPreloader";
import { Analytics } from "@vercel/analytics/next";
import ChatBotLoader from "@/components/ChatBotLoader";
const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Rishav Roy | Operations & Automation Specialist",
  description: "Six years running operations, HR and procurement, now building the software that removes the manual work. FOIA processing at scale, custom CRMs, and business automation.",
  keywords: ["Rishav Roy", "Operations Specialist", "Business Automation", "Remote Operations", "HR and Admin", "Custom CRM", "Kolkata"],
  metadataBase: new URL("https://byrishav.online"),
  openGraph: {
    title: "Rishav Roy | Operations & Automation Specialist",
    description: "Six years running operations, HR and procurement, now building the software that removes the manual work. FOIA processing at scale, custom CRMs, and business automation.",
    url: "https://byrishav.online",
    siteName: "Rishav Roy Portfolio",
    type: "website",
  },
  alternates: {
    canonical: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rishav Roy | Operations & Automation Specialist",
    description: "Six years running operations, HR and procurement, now building the software that removes the manual work. FOIA processing at scale, custom CRMs, and business automation.",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://api.github.com" />
        <FontPreloader />
      </head>
      <body className={`${sora.variable} ${jetbrainsMono.variable} flex flex-col bg-background text-foreground selection:bg-accent selection:text-background`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Person",
                "name": "Rishav Roy",
                "jobTitle": "Operations & Automation Specialist",
                "url": "https://byrishav.online",
                "description": "Six years running operations, HR and procurement, now building the software that removes the manual work. FOIA processing at scale, custom CRMs, and business automation.",
                "image": "https://byrishav.online/opengraph-image.jpg",
                "email": "rishav2000roy@gmail.com",
                "telephone": "+91-60019-14771",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Kolkata",
                  "addressRegion": "West Bengal",
                  "addressCountry": "IN"
                },
                "alumniOf": {
                  "@type": "CollegeOrUniversity",
                  "name": "Manipal University Jaipur"
                },
                "hasOccupation": {
                  "@type": "Occupation",
                  "name": "Operations & Automation Specialist",
                  "description": "Building commercial-grade local-first CRMs, enterprise FOIA workflows, and full-stack web applications."
                },
                "worksFor": {
                  "@type": "Organization",
                  "name": "Tea Country Holidays"
                },
                "knowsLanguage": ["English", "Hindi", "Assamese", "Bengali"],
                "sameAs": [
                  "https://github.com/rishav00roy-web",
                  "https://www.linkedin.com/in/rishav-the-roy/",
                  "https://instagram.com/justbeingpsunk_"
                ],
                "knowsAbout": [
                  "Next.js",
                  "React 19",
                  "Framer Motion",
                  "Tailwind CSS",
                  "Supabase",
                  "PostgreSQL",
                  "Python",
                  "Local-first Architecture",
                  "IndexedDB",
                  "Tesseract.js OCR",
                  "Technical SEO",
                  "Answer Engine Optimization (AEO)",
                  "FOIA Automation",
                  "Business Automation"
                ]
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "Rishav Roy Portfolio",
                "url": "https://byrishav.online"
              }
            ])
          }}
        />
        <noscript>
          <style>{`main { opacity: 1 !important; }`}</style>
        </noscript>
        {children}
        <ChatBotLoader />
        <Analytics />
      </body>
    </html>
  );
}
