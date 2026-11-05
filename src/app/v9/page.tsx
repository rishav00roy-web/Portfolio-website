import type { Metadata } from "next";
import AppV5 from "../../AppV5";

// The personal portfolio half of the two-page split (preview until it
// replaces "/"): kept out of search, canonical to "/".
export const metadata: Metadata = {
  title: { absolute: "Rishav Roy | Portfolio (preview)" },
  robots: { index: false, follow: false },
  alternates: { canonical: "/" },
};

export default function V9() {
  return <AppV5 portfolio />;
}
