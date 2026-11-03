import type { Metadata } from "next";
import AppV2 from "../../AppV2";

// A design candidate shown next to the live homepage for comparison. It
// must not compete with "/" in search, so it is noindexed and canonical to "/".
export const metadata: Metadata = {
  title: { absolute: "Rishav Roy | Design v2 (preview)" },
  robots: { index: false, follow: false },
  alternates: { canonical: "/" },
};

export default function V2() {
  return <AppV2 />;
}
