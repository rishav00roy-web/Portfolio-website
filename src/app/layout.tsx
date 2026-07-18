import type { Metadata } from "next";
import { Sora, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import FontPreloader from "@/components/FontPreloader";

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
  title: "Rishav Roy — Full-Stack Developer",
  description: "Building and shipping high-performance production web apps through AI-augmented development.",
  metadataBase: new URL("https://rishavroy.dev"),
  openGraph: {
    title: "Rishav Roy — Full-Stack Developer",
    description: "Building and shipping high-performance production web apps through AI-augmented development.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rishav Roy — Full-Stack Developer",
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
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Rishav Roy",
              "jobTitle": "Full-Stack Developer",
              "url": "https://rishavroy.dev",
              "description": "Building and shipping high-performance production web apps through AI-augmented development.",
              "sameAs": [
                "https://github.com/rishav00roy-web",
                "https://www.linkedin.com/in/rishav-roy-858b0b365/"
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
            })
          }}
        />
        <noscript>
          <style>{`main { opacity: 1 !important; }`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
