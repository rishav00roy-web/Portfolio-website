import type { Metadata } from "next";
import AppV5 from "../../AppV5";

// Work-in-progress redesign, shown beside the live homepage until it
// replaces it. Kept out of search and canonical to "/" so it never competes.
export const metadata: Metadata = {
  title: { absolute: "Rishav Roy | Design v5 (preview)" },
  robots: { index: false, follow: false },
  alternates: { canonical: "/" },
};

export default function V5() {
  return <AppV5 />;
}
