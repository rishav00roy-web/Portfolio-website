"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { ReceiptPrinter, type ReceiptPrinterStage } from "../ReceiptPrinter";

/*
 * The invoice reader at work, as a receipt printer: it reads a sample
 * invoice, then prints what it pulled out (vendor, number, date, lines,
 * total). Loops while on screen; holds the printed receipt for reduced
 * motion. Sample data only, no client names or real prices.
 */

const LINES = [
  ["Printer paper, 20 reams", "6,200.00"],
  ["Toner cartridges", "9,800.00"],
  ["Delivery", "2,450.00"],
] as const;

const LABELS: Record<ReceiptPrinterStage, string> = {
  processing: "Reading the invoice",
  printing: "Writing out the fields",
  complete: "Ready for your sheet",
};

/** How long each stage lasts in the loop, in ms. */
const TIMING: Record<ReceiptPrinterStage, number> = { processing: 1800, printing: 2100, complete: 3800 };
const NEXT: Record<ReceiptPrinterStage, ReceiptPrinterStage> = { processing: "printing", printing: "complete", complete: "processing" };

export default function InvoicePrinterDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const reduce = useReducedMotion();
  const [stage, setStage] = useState<ReceiptPrinterStage>("processing");
  const shown: ReceiptPrinterStage = reduce ? "complete" : stage;

  useEffect(() => {
    if (reduce || !inView) return;
    const t = window.setTimeout(() => setStage((s) => NEXT[s]), TIMING[stage]);
    return () => window.clearTimeout(t);
  }, [stage, inView, reduce]);

  return (
    <div ref={ref} className="flex justify-center px-2 pt-2">
      <ReceiptPrinter.Root stage={shown} aria-label="Invoice reader, sample run">
        <ReceiptPrinter.Machine>
          <ReceiptPrinter.Header>
            <span className="text-sm font-medium text-[var(--rp-screen-ink,#f3eee8)]">Invoice reader</span>
            <span className="text-sm text-[var(--rp-screen-ink,#f3eee8)] opacity-70">Sample</span>
          </ReceiptPrinter.Header>
          <ReceiptPrinter.Screen>
            <ReceiptPrinter.Status>{LABELS[shown]}</ReceiptPrinter.Status>
            <p className="mt-3 font-mono text-sm opacity-75">INV-0412.pdf</p>
          </ReceiptPrinter.Screen>
        </ReceiptPrinter.Machine>
        <ReceiptPrinter.Output className="h-[21.5rem]">
          <ReceiptPrinter.Paper className="text-sm">
            <p className="text-center font-semibold tracking-wide">READ FROM INVOICE</p>
            <p className="mt-1 text-center opacity-70">Sample run</p>
            <dl className="mt-5 space-y-1.5">
              {[
                ["Vendor", "Sample Supplies Co."],
                ["Invoice", "INV-0412"],
                ["Date", "12 Oct 2026"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4">
                  <dt className="opacity-70">{k}</dt>
                  <dd className="text-right">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="my-4 border-t border-dashed border-current opacity-40" />
            <ul className="space-y-1.5">
              {LINES.map(([item, amt]) => (
                <li key={item} className="flex justify-between gap-4">
                  <span>{item}</span>
                  <span className="tabular-nums">{amt}</span>
                </li>
              ))}
            </ul>
            <div className="my-4 border-t border-dashed border-current opacity-40" />
            <p className="flex justify-between font-semibold">
              <span>Total</span>
              <span className="tabular-nums">₹ 18,450.00</span>
            </p>
          </ReceiptPrinter.Paper>
        </ReceiptPrinter.Output>
      </ReceiptPrinter.Root>
    </div>
  );
}
