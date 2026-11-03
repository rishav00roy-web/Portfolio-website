import type { Metadata, Viewport } from "next";
import { Sora, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import ChatBotLoader from "@/components/ChatBotLoader";
import { PROFILE } from "@/lib/profile";
import { SITE_URL, personSchema, websiteSchema, jsonLd } from "@/lib/schema";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400"],
  display: "swap",
});

const TITLE = `${PROFILE.name} | ${PROFILE.role}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: `%s | ${PROFILE.name}`,
  },
  description: PROFILE.summary,
  applicationName: `${PROFILE.name} Portfolio`,
  authors: [{ name: PROFILE.name, url: SITE_URL }],
  creator: PROFILE.name,
  keywords: [
    "Rishav Roy",
    "Operations Specialist",
    "Automation Specialist",
    "Business Automation",
    "Remote Operations",
    "FOIA Specialist",
    "Custom CRM",
    "Next.js Developer",
    "Kolkata",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: TITLE,
    description: PROFILE.summary,
    url: "/",
    siteName: `${PROFILE.name} Portfolio`,
    locale: "en_IN",
    type: "profile",
    firstName: "Rishav",
    lastName: "Roy",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: PROFILE.summary,
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN" className={`${sora.variable} ${jetbrainsMono.variable}`}>
      <body className="flex min-h-dvh flex-col bg-background font-sans text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLd([personSchema(), websiteSchema()])}
        />
        {children}
        <ChatBotLoader />
        <Analytics />
      </body>
    </html>
  );
}
