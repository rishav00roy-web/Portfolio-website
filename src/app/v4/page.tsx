import type { Metadata } from "next";
import AppV2 from "../../AppV2";

// Design candidate for comparison only: kept out of search, canonical to "/".
export const metadata: Metadata = {
  title: { absolute: "Rishav Roy | Design v4 (preview)" },
  robots: { index: false, follow: false },
  alternates: { canonical: "/" },
};

export default function V3() {
  return <AppV2 variant="split" />;
}
