import type { Metadata } from "next";
import { Sora, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import FontPreloader from "@/components/FontPreloader";
import { Analytics } from "@vercel/analytics/next";
import ChatBot from "@/components/ChatBot";
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
  title: "Rishav Roy — Agentic Engineer",
  description: "Building and shipping high-performance production web apps through AI-augmented development.",
  keywords: ["Rishav Roy", "Agentic Developer", "Full-Stack Developer", "Kolkata Developer", "React", "Next.js", "Portfolio"],
  metadataBase: new URL("https://byrishav.online"),
  openGraph: {
    title: "Rishav Roy — Agentic Engineer",
    description: "Building and shipping high-performance production web apps through AI-augmented development.",
    url: "https://byrishav.online",
    siteName: "Rishav Roy Portfolio",
    type: "website",
  },
  alternates: {
    canonical: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rishav Roy — Agentic Engineer",
    description: "Building and shipping high-performance production web apps through AI-augmented development.",
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
                "jobTitle": "Agentic Engineer",
                "url": "https://byrishav.online",
                "description": "Building and shipping high-performance production web apps through AI-augmented development.",
                "sameAs": [
                  "https://github.com/rishav00roy-web",
                  "https://www.linkedin.com/in/rishav-roy-858b0b365/",
                  "https://instagram.com/justbeingpsunk_"
                ],
                "knowsAbout": [
                  "Next.js",
                  "React",
                  "Supabase",
                  "PostgreSQL",
                  "Python",
                  "Technical SEO",
                  "OCR Onboarding"
                ]
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "Rishav Roy Portfolio",
                "url": "https://byrishav.online"
              },
              {
                "@context": "https://schema.org",
                "@type": "ProfilePage",
                "dateCreated": "2026-08-01T00:00:00+00:00",
                "mainEntity": {
                  "@type": "Person",
                  "name": "Rishav Roy"
                }
              }
            ])
          }}
        />
        <noscript>
          <style>{`main { opacity: 1 !important; }`}</style>
        </noscript>
        {children}
        <ChatBot />
        <Analytics />
      </body>
    </html>
  );
}
