import type { Metadata } from "next";
import AppV5 from "../../AppV5";

// Variation of v5 for comparison only: kept out of search, canonical to "/".
export const metadata: Metadata = {
  title: { absolute: "Rishav Roy | Design v7 (preview)" },
  robots: { index: false, follow: false },
  alternates: { canonical: "/" },
};

export default function V7() {
  return <AppV5 layout="grid" />;
}
