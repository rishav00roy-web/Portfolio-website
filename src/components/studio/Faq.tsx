import { Plus } from "lucide-react";
import { FAQ } from "@/lib/studio";

/*
 * Questions people ask before they start a project. Plain <details>, so it
 * opens by tap, click or keyboard with no script, and every answer is in the
 * HTML for search and AI answer engines. The same list feeds the FAQPage
 * schema on /atelier and the studio section of llms.txt.
 */
export default function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="mx-auto max-w-[1440px] px-6 pb-24 sm:px-12 xl:px-20">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-24">
        <h2 id="faq-title" data-rise className="font-display text-5xl leading-[0.95] sm:text-6xl">
          Questions people ask
        </h2>
        <ul className="border-t border-ink/10">
          {FAQ.map((f) => (
            <li key={f.q} className="border-b border-ink/10">
              <details className="group">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-5 text-xl text-ink [&::-webkit-details-marker]:hidden">
                  <h3 className="text-2xl">{f.q}</h3>
                  <Plus
                    aria-hidden="true"
                    strokeWidth={1.5}
                    className="size-5 shrink-0 text-rust transition-transform duration-200 group-open:rotate-45"
                  />
                </summary>
                <p className="max-w-2xl pb-6 text-lg leading-relaxed text-ink/70">{f.a}</p>
              </details>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
