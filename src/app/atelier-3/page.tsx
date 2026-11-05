import type { Metadata } from "next";
import AtelierApp from "../../AtelierApp";

// The studio page as a showroom (preview): out of search.
export const metadata: Metadata = {
  title: { absolute: "Atelier Systems | Preview (showroom)" },
  robots: { index: false, follow: false },
  alternates: { canonical: "/atelier" },
};

export default function Atelier3() {
  return <AtelierApp showcase />;
}
