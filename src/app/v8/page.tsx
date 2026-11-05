import type { Metadata } from "next";
import AppV5 from "../../AppV5";

// v7's grid inside the Atelier Systems studio section. Preview only:
// kept out of search and canonical to "/" until it replaces the homepage.
export const metadata: Metadata = {
  title: { absolute: "Rishav Roy | Design v8 (preview)" },
  robots: { index: false, follow: false },
  alternates: { canonical: "/" },
};

export default function V8() {
  return <AppV5 layout="grid" atelier />;
}
