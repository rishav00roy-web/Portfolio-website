import SiteHeader from "@/components/home/SiteHeader";
import Hero from "@/components/home/Hero";
import Work from "@/components/home/Work";
import { About, Experience, Skills } from "@/components/home/About";
import { Contact, SiteFooter } from "@/components/home/Contact";
import { profilePageSchema, jsonLd } from "../lib/schema";

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(profilePageSchema())} />
      <SiteHeader />
      <main id="main">
        <Hero />
        <Work />
        <About />
        <Experience />
        <Skills />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
