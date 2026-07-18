import type { Metadata } from "next";
import "@fontsource/sora/400.css";
import "@fontsource/sora/500.css";
import "@fontsource/sora/600.css";
import "@fontsource/sora/700.css";
import "@fontsource/sora/800.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "./globals.css";
import FontPreloader from "@/components/FontPreloader";

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
        <FontPreloader />
      </head>
      <body className="flex flex-col bg-background text-foreground selection:bg-accent selection:text-background">
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
