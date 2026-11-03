import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function SectionHeading({
  id,
  eyebrow,
  title,
  intro,
  action,
}: {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
  action?: { href: string; label: string };
}) {
  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{eyebrow}</p>
        <h2 id={id} className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
          {title}
        </h2>
        {intro && <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{intro}</p>}
      </div>
      {action && (
        <Link
          href={action.href}
          className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-foreground hover:text-accent"
        >
          {action.label}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </Link>
      )}
    </div>
  );
}
