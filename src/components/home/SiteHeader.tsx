import Link from "next/link";
import { PROFILE } from "@/lib/profile";

const NAV = [
  { href: "/#work", label: "Work" },
  { href: "/#about", label: "About" },
  { href: "/#experience", label: "Experience" },
  { href: "/#contact", label: "Contact" },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-background/80 backdrop-blur-xl">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:rounded-md focus:bg-foreground focus:px-3 focus:py-2 focus:text-background"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-2.5 font-semibold tracking-tight text-foreground">
          <span
            aria-hidden="true"
            className="grid h-8 w-8 place-items-center rounded-lg bg-accent font-mono text-sm font-bold text-background"
          >
            R
          </span>
          <span>{PROFILE.name}</span>
        </Link>

        <nav aria-label="Primary" className="flex items-center gap-1 text-sm">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`rounded-md px-3 py-2 text-muted transition-colors hover:text-foreground ${
                item.label === "Contact" ? "" : "hidden md:inline-block"
              }`}
            >
              {item.label}
            </a>
          ))}
          <a
            href={PROFILE.resume}
            className="ml-1 rounded-full border border-line-strong px-4 py-1.5 text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            Résumé
          </a>
        </nav>
      </div>
    </header>
  );
}
