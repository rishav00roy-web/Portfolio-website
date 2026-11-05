import type { Metadata } from "next";
import AppV5 from "../../AppV5";

// Bolder, artistic portfolio preview: kept out of search, canonical to "/".
export const metadata: Metadata = {
  title: { absolute: "Rishav Roy | Portfolio (preview v10)" },
  robots: { index: false, follow: false },
  alternates: { canonical: "/" },
};

export default function V10() {
  return <AppV5 portfolio journal />;
}
