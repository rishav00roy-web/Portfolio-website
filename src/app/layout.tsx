import type { Metadata } from "next";
import "@fontsource/sora/400.css";
import "@fontsource/sora/500.css";
import "@fontsource/sora/600.css";
import "@fontsource/sora/700.css";
import "@fontsource/sora/800.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "./globals.css";

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
      <body className="flex flex-col bg-[#030303] text-white selection:bg-white/20 selection:text-white">
        {children}
      </body>
    </html>
  );
}
