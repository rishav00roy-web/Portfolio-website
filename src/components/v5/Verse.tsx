/**
 * A short Bible verse set quietly beside the work. Text is the King James
 * Version (public domain), quoted exactly; the reference sits under it in
 * the section's accent. Pass `refOnly` to show just the reference.
 */
export default function Verse({
  text,
  reference,
  refOnly = false,
  tone = "rust",
  className = "",
}: {
  text?: string;
  reference: string;
  refOnly?: boolean;
  tone?: "rust" | "moon";
  className?: string;
}) {
  const accent = tone === "moon" ? "text-moon" : "text-rust";
  if (refOnly || !text) {
    return <p className={`text-sm font-medium ${accent} ${className}`}>{reference}</p>;
  }
  return (
    <figure className={`max-w-md ${className}`}>
      <blockquote className="text-[15px] leading-relaxed text-ink/70">&ldquo;{text}&rdquo;</blockquote>
      <figcaption className={`mt-2 text-sm font-medium ${accent}`}>{reference}</figcaption>
    </figure>
  );
}
