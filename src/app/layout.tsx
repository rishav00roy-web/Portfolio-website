import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
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
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-app-bg text-app-fg transition-colors duration-300">
        {children}
      </body>
    </html>
  );
}
