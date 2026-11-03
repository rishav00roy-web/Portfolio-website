import { ArrowUpRight, Mail, Phone } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import { PROFILE } from "@/lib/profile";
import SectionHeading from "./SectionHeading";

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeading
            id="contact-title"
            eyebrow="Contact"
            title="Let's build something."
            intro="Open to operations and automation roles, freelance builds and consulting. The quickest way to reach me is email or WhatsApp."
          />

          <ul className="mt-10 space-y-3">
            <li>
              <a
                href={`mailto:${PROFILE.email}`}
                className="group flex items-center gap-4 rounded-xl border border-line bg-surface p-4 transition-colors hover:border-line-strong"
              >
                <Mail className="h-5 w-5 text-accent" aria-hidden="true" />
                <span className="flex-1">
                  <span className="block text-xs text-subtle">Email</span>
                  <span className="text-foreground">{PROFILE.email}</span>
                </span>
              </a>
            </li>
            <li>
              <a
                href={PROFILE.phoneHref}
                className="group flex items-center gap-4 rounded-xl border border-line bg-surface p-4 transition-colors hover:border-line-strong"
              >
                <Phone className="h-5 w-5 text-accent" aria-hidden="true" />
                <span className="flex-1">
                  <span className="block text-xs text-subtle">Phone / WhatsApp</span>
                  <span className="text-foreground">{PROFILE.phone}</span>
                </span>
              </a>
            </li>
          </ul>

          <ul className="mt-8 flex flex-wrap gap-2">
            {PROFILE.socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="me noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-sm text-muted transition-colors hover:border-line-strong hover:text-foreground"
                >
                  {s.label}
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-8 text-sm text-subtle sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>
          © {new Date().getFullYear()} {PROFILE.name}. Designed and built by me.
        </p>
        <p>
          {PROFILE.location} ·{" "}
          <a href="/llms.txt" className="hover:text-foreground">
            llms.txt
          </a>
        </p>
      </div>
    </footer>
  );
}
