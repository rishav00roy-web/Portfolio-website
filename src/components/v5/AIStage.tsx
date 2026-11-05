"use client";

import { useId, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

/*
 * The studio's three AI products on one stage. A tab picks the product and
 * the stage shows it doing its one job: the job tracker's real board, a
 * sample support chat, a sample invoice being read. The chat and invoice
 * are drawn as the product and labelled as samples.
 */

type ProductId = "tracker" | "support" | "invoice";

const PRODUCTS: { id: ProductId; name: string; line: string; points: string[] }[] = [
  {
    id: "tracker",
    name: "Job tracker",
    line: "Runs a job hunt on its own.",
    points: [
      "Pulls listings from 54 job platforms and scores each one",
      "Moves each card when an interview or rejection email lands",
      "Tailors the résumé per role and refuses claims it cannot back up",
    ],
  },
  {
    id: "support",
    name: "Support agent",
    line: "Answers a business's customers, any hour.",
    points: [
      "Answers from the business's own information",
      "Hands over to a person when it should",
      "The chat on this site is one, running live",
    ],
  },
  {
    id: "invoice",
    name: "Invoice reader",
    line: "Turns invoices and receipts into clean data.",
    points: [
      "Reads the vendor, date and amounts off the page",
      "No more typing receipts into a spreadsheet",
      "Being set up now, demos on request",
    ],
  },
];

const TRACKER_CODE = "https://github.com/rishav00roy-web/JOB-TRACKER-AND-EMAIL-TRACKER";

const openChat = () =>
  document.querySelector<HTMLButtonElement>('[aria-label="Open Psunk AI Chat"]')?.click();

function TrackerStage() {
  return (
    <div className="relative h-full min-h-[18rem] overflow-hidden rounded-2xl ring-1 ring-moon/25 shadow-[0_40px_120px_-40px_rgba(159,194,214,0.25)]">
      <Image
        src="/assets/projects/job-tracker-full.png"
        alt="The job tracker's board, with applications sorted into columns"
        fill
        sizes="(max-width: 1023px) 100vw, 60vw"
        className="object-cover object-left-top"
      />
    </div>
  );
}

export function SupportStage() {
  const turns = [
    { me: false, text: "Hi! Ask me anything about our packages or prices." },
    { me: true, text: "Do you have a 5-day Kerala trip in December?" },
    { me: false, text: "Yes, the Backwaters and Hills package runs 5 days. Shall I send the itinerary, or put you through to the team?" },
  ];
  return (
    <div className="flex h-full flex-col rounded-2xl border border-moon/20 bg-paper-2/80 p-5 sm:p-7">
      <div className="flex items-center justify-between border-b border-ink/10 pb-4">
        <span className="text-base text-ink/85">Support agent</span>
        <span className="text-sm text-ink/50">Sample conversation</span>
      </div>
      <ol className="flex flex-1 flex-col justify-end gap-3 py-6">
        {turns.map((t) => (
          <li
            key={t.text}
            className={`max-w-[85%] rounded-2xl px-4 py-3 text-base leading-relaxed ${
              t.me ? "self-end rounded-br-md bg-moon text-paper" : "self-start rounded-bl-md bg-ink/[0.07] text-ink/85"
            }`}
          >
            {t.text}
          </li>
        ))}
      </ol>
      <div aria-hidden="true" className="rounded-full border border-ink/15 px-5 py-3 text-base text-ink/40">
        Type a question
      </div>
    </div>
  );
}

export function InvoiceStage() {
  const lines = [
    ["Printer paper, 20 reams", "6,200.00"],
    ["Toner cartridges", "9,800.00"],
    ["Delivery", "2,450.00"],
  ];
  const fields = [
    { label: "Vendor", value: "Sample Supplies Co." },
    { label: "Date", value: "12 Oct 2026" },
    { label: "Total", value: "₹ 18,450.00" },
  ];
  const mark = "rounded bg-moon/35 px-1 ring-2 ring-moon";
  return (
    <div className="grid h-full gap-4 sm:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
      <div className="rounded-2xl bg-[#f4ede3] p-6 text-[#1b140d] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.9)]">
        <div className="flex items-start justify-between gap-4">
          <span className={`${mark} font-semibold`}>Sample Supplies Co.</span>
          <span className="text-sm opacity-60">Invoice</span>
        </div>
        <p className="mt-3 text-sm opacity-70">
          Date: <span className={`${mark} font-medium`}>12 Oct 2026</span>
        </p>
        <ul className="mt-6 space-y-2 text-base">
          {lines.map(([item, amt]) => (
            <li key={item} className="flex justify-between gap-4 border-b border-black/10 pb-2">
              <span>{item}</span>
              <span className="tabular-nums">{amt}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 flex justify-between text-base font-semibold">
          <span>Total</span>
          <span className={`${mark} tabular-nums`}>₹ 18,450.00</span>
        </p>
      </div>
      <div className="flex flex-col rounded-2xl border border-moon/20 bg-paper-2/80 p-6">
        <span className="text-sm text-ink/50">Read from the sample</span>
        <dl className="mt-4 flex-1 space-y-4">
          {fields.map((f) => (
            <div key={f.label} className="border-b border-ink/10 pb-3">
              <dt className="text-sm text-moon">{f.label}</dt>
              <dd className="mt-1 text-lg text-ink/90">{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

const button =
  "inline-flex items-center gap-1.5 rounded-full bg-moon px-6 py-3.5 text-base font-semibold text-paper hover:opacity-90 transition-opacity";

export default function AIStage() {
  const [active, setActive] = useState<ProductId>("tracker");
  const uid = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const product = PRODUCTS.find((p) => p.id === active)!;

  // Arrow keys move between tabs, as screen-reader users expect.
  const onKey = (e: React.KeyboardEvent, i: number) => {
    const step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = (i + step + PRODUCTS.length) % PRODUCTS.length;
    setActive(PRODUCTS[next].id);
    tabs.current[next]?.focus();
  };

  return (
    <div className="mt-14 sm:mt-20">
      <div role="tablist" aria-label="AI products" className="flex flex-wrap gap-2">
        {PRODUCTS.map((p, i) => {
          const on = p.id === active;
          return (
            <button
              key={p.id}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`${uid}-tab-${p.id}`}
              aria-selected={on}
              aria-controls={`${uid}-panel`}
              tabIndex={on ? 0 : -1}
              onClick={() => setActive(p.id)}
              onKeyDown={(e) => onKey(e, i)}
              className={`min-h-11 rounded-full px-5 py-2.5 text-base transition-colors duration-300 ${
                on ? "bg-moon font-semibold text-paper" : "border border-ink/20 text-ink/75 hover:border-moon hover:text-ink"
              }`}
            >
              {p.name}
            </button>
          );
        })}
      </div>

      <div
        id={`${uid}-panel`}
        role="tabpanel"
        aria-labelledby={`${uid}-tab-${active}`}
        className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:items-stretch"
      >
        <div key={`${active}-copy`} className="stage-in flex min-w-0 flex-col">
          <h3 className="text-3xl sm:text-4xl font-medium tracking-[-0.01em]">{product.name}</h3>
          <p className="mt-3 text-xl leading-snug text-ink/80">{product.line}</p>
          <ul className="mt-8 space-y-4">
            {product.points.map((pt) => (
              <li
                key={pt}
                className="relative pl-6 text-lg leading-relaxed text-ink/70 before:absolute before:left-0 before:top-[0.65em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-moon"
              >
                {pt}
              </li>
            ))}
          </ul>
          <div className="mt-10 lg:mt-auto lg:pt-10">
            {active === "tracker" && (
              <a href={TRACKER_CODE} target="_blank" rel="noopener noreferrer" className={button}>
                Read the code <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            )}
            {active === "support" && (
              <button type="button" onClick={openChat} className={button}>
                Try it now <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </button>
            )}
            {active === "invoice" && (
              <a href="#contact" className={button}>
                Book a demo <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            )}
          </div>
        </div>

        <div key={`${active}-stage`} className="stage-in min-h-[22rem] min-w-0 sm:min-h-[26rem]">
          {active === "tracker" && <TrackerStage />}
          {active === "support" && <SupportStage />}
          {active === "invoice" && <InvoiceStage />}
        </div>
      </div>
    </div>
  );
}
