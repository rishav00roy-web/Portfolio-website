"use client";

import { useEffect, useRef, useState } from "react";

/*
 * LogoTraceLoader: traces the Atelier Systems (AS) mark while work is in
 * progress, then closes the outline and fades in the filled mark.
 *
 * Logo data: vectorised from the AS logo in the studio's quotation PDF
 * (threshold at 4x, marching squares, Ramer-Douglas-Peucker). TRACE_PATH
 * is the outer contour of the main AS stroke; FILL_PATHS are the three
 * filled shapes of the mark (the main stroke, the inner A leg, the tick).
 */

const LOGO_VIEW_BOX = "0 0 357 291";

const TRACE_PATH =
  "M263.9 0L278 0.6L280.8 1.6L283 1.6L290.5 3.6L301 7.6L309.8 11.9L318.5 17.6L328.9 27L339.4 41.8L342.6 48.3L345.6 56.3L349.9 76L350.1 86.5L349.6 87.5L348.8 88.1L346 88.1L336.9 87.3L334.9 68.8L333.9 67L333.9 65L332.9 63.3L331.6 58L324.9 44.3L318.1 36.3L307 26.4L299.8 21.9L292.3 18.4L279.8 14.6L272 13.6L259.8 13.6L249.5 14.9L236.3 18.4L229 21.6L225 24.1L221 27.1L213.1 35.5L209.9 42.3L207.6 51.5L207.6 60.8L208.6 66L214.9 79.8L219.1 86.3L226.3 94.6L238 104.4L252.5 112.6L274 121.6L287 126.4L290.3 128.4L296.8 130.6L309.5 136.9L328.3 149.9L339.6 161.8L344.9 169.3L350.9 180.8L354.6 191L356.6 204L356.6 217.5L355.6 220.8L355.6 224.3L354.6 226.5L354.6 229L350.6 240.3L346.6 248L339.6 258.3L328.5 269.4L313 280.1L303.5 284.4L291.8 288.4L275.3 290.9L258.3 290.6L244.5 288.4L237.3 285.4L230.3 283.4L226.3 281.4L218 276.4L207.3 268.4L202.1 263.3L194.1 253.3L186.9 239.3L181.9 225.3L179.9 215L178.9 201L179.4 182.8L179.6 180.3L180.5 179.4L183.3 178.6L185.8 179.6L187.8 179.6L189.5 180.6L192.4 184.3L193.6 208L195.9 223L200.9 237.3L208.4 249.3L214.8 256.4L224.3 264.4L237.3 271.4L250 275.6L252.5 275.6L255 276.6L263.8 277.1L275.5 276.6L280.8 273.6L286.6 267L290.6 261.8L299.6 247L307.4 228.3L308.9 222.8L308.9 213.8L307.6 207L305.1 200.8L298.4 189.8L291.3 183.4L283.3 177.6L269.5 171.4L236.5 158.4L230.3 154.6L217.3 148.4L202.3 138.4L188.9 125.8L182.9 118.8L172.1 101.5L167.9 93L165.6 87L162.8 82.9L161.9 83L158.6 90.3L152.9 100.3L147.4 112.3L141.9 121.3L136.6 132.5L123.9 156.3L121.5 160.1L117.3 160.4L108.3 162.6L106.5 162.6L106.1 161.3L110.1 151.8L117.6 139L124.1 125.3L129.6 116L137.1 100.5L141.6 93L150.1 74.8L152.9 71L153.9 67.8L160.4 57L161.9 53.3L163.3 52.4L178.6 84L180.6 86.3L188.6 102L191.9 107L196.9 112.3L199.9 117L207.5 124.4L214.3 130.1L221.5 134.6L223.3 136.4L226.3 137.4L232.3 141.1L258.3 152.4L273 157.6L291.5 166.9L297.5 170.6L307.3 178.9L311.4 183.5L316.4 190.8L320.6 202L320.6 204.5L321.6 206.8L321.6 224.8L320.6 226.8L320.6 230L319.9 231.3L319.6 234L315.6 245L302.4 269L303.5 269.4L305 268.9L313.3 264.4L320.8 258.6L325.9 253.5L332.6 244.8L334.9 240.8L335.9 237.3L340.6 226.8L342.4 219L342.4 202.5L340.6 194.5L335.6 181.3L331.6 174.8L325.9 167.3L322 163.4L308.3 152.6L285.3 140.4L283.8 140.4L278.3 137.6L265.5 132.6L263.5 132.4L260.8 130.6L247 125.4L236 119.4L230.3 115.4L228.5 114.9L220.3 108.4L211.6 99L203.9 88L197.1 75.8L191.9 63.5L180.9 43.3L178.6 37.8L171.6 24.5L168.4 19L166.8 17.4L164.5 16.4L161 16.4L157.3 18.4L154.9 21L149.9 32L146.9 36.5L145.4 40.3L139.6 50.3L135.4 60L129.6 69L127.4 75.3L124.9 78.5L116.9 94L115.6 97.5L105.6 115L99.4 128.8L95.6 135.8L91.9 141L90.4 145.5L83.1 157.5L81.6 162.3L77.1 171.8L72.3 174.4L70.8 174.4L68 175.6L66.5 177.4L62.8 178.6L58.8 181.4L57.9 181L57.9 180L60.9 174.3L60.9 173L63.6 168.5L65.9 162.8L70.6 154.3L77.1 140.5L81.6 133L88.9 117.5L107.6 83L109.9 77L116.6 65.5L125.6 46.8L131.9 36L137.4 24.5L140.4 20L144.9 11L148.3 7.1L152.3 4.4L158.5 2.6L167.8 2.6L173 4.9L175.5 6.6L179.6 11L180.9 13.5L183.6 16.8L193.9 37L195 38.6L195.8 38.6L199.9 30.8L204.4 24.3L216 13.6L222 9.9L228.8 6.6L240.8 2.6L249 1.4L250.5 0.6Z";

const FILL_PATHS = [
  "M263.9 0L278 0.6L280.8 1.6L283 1.6L290.5 3.6L301 7.6L309.8 11.9L318.5 17.6L328.9 27L339.4 41.8L342.6 48.3L345.6 56.3L349.9 76L350.1 86.5L349.6 87.5L348.8 88.1L346 88.1L336.9 87.3L334.9 68.8L333.9 67L333.9 65L332.9 63.3L331.6 58L324.9 44.3L318.1 36.3L307 26.4L299.8 21.9L292.3 18.4L279.8 14.6L272 13.6L259.8 13.6L249.5 14.9L236.3 18.4L229 21.6L225 24.1L221 27.1L213.1 35.5L209.9 42.3L207.6 51.5L207.6 60.8L208.6 66L214.9 79.8L219.1 86.3L226.3 94.6L238 104.4L252.5 112.6L274 121.6L287 126.4L290.3 128.4L296.8 130.6L309.5 136.9L328.3 149.9L339.6 161.8L344.9 169.3L350.9 180.8L354.6 191L356.6 204L356.6 217.5L355.6 220.8L355.6 224.3L354.6 226.5L354.6 229L350.6 240.3L346.6 248L339.6 258.3L328.5 269.4L313 280.1L303.5 284.4L291.8 288.4L275.3 290.9L258.3 290.6L244.5 288.4L237.3 285.4L230.3 283.4L226.3 281.4L218 276.4L207.3 268.4L202.1 263.3L194.1 253.3L186.9 239.3L181.9 225.3L179.9 215L178.9 201L179.4 182.8L179.6 180.3L180.5 179.4L183.3 178.6L185.8 179.6L187.8 179.6L189.5 180.6L192.4 184.3L193.6 208L195.9 223L200.9 237.3L208.4 249.3L214.8 256.4L224.3 264.4L237.3 271.4L250 275.6L252.5 275.6L255 276.6L263.8 277.1L275.5 276.6L280.8 273.6L286.6 267L290.6 261.8L299.6 247L307.4 228.3L308.9 222.8L308.9 213.8L307.6 207L305.1 200.8L298.4 189.8L291.3 183.4L283.3 177.6L269.5 171.4L236.5 158.4L230.3 154.6L217.3 148.4L202.3 138.4L188.9 125.8L182.9 118.8L172.1 101.5L167.9 93L165.6 87L162.8 82.9L161.9 83L158.6 90.3L152.9 100.3L147.4 112.3L141.9 121.3L136.6 132.5L123.9 156.3L121.5 160.1L117.3 160.4L108.3 162.6L106.5 162.6L106.1 161.3L110.1 151.8L117.6 139L124.1 125.3L129.6 116L137.1 100.5L141.6 93L150.1 74.8L152.9 71L153.9 67.8L160.4 57L161.9 53.3L163.3 52.4L178.6 84L180.6 86.3L188.6 102L191.9 107L196.9 112.3L199.9 117L207.5 124.4L214.3 130.1L221.5 134.6L223.3 136.4L226.3 137.4L232.3 141.1L258.3 152.4L273 157.6L291.5 166.9L297.5 170.6L307.3 178.9L311.4 183.5L316.4 190.8L320.6 202L320.6 204.5L321.6 206.8L321.6 224.8L320.6 226.8L320.6 230L319.9 231.3L319.6 234L315.6 245L302.4 269L303.5 269.4L305 268.9L313.3 264.4L320.8 258.6L325.9 253.5L332.6 244.8L334.9 240.8L335.9 237.3L340.6 226.8L342.4 219L342.4 202.5L340.6 194.5L335.6 181.3L331.6 174.8L325.9 167.3L322 163.4L308.3 152.6L285.3 140.4L283.8 140.4L278.3 137.6L265.5 132.6L263.5 132.4L260.8 130.6L247 125.4L236 119.4L230.3 115.4L228.5 114.9L220.3 108.4L211.6 99L203.9 88L197.1 75.8L191.9 63.5L180.9 43.3L178.6 37.8L171.6 24.5L168.4 19L166.8 17.4L164.5 16.4L161 16.4L157.3 18.4L154.9 21L149.9 32L146.9 36.5L145.4 40.3L139.6 50.3L135.4 60L129.6 69L127.4 75.3L124.9 78.5L116.9 94L115.6 97.5L105.6 115L99.4 128.8L95.6 135.8L91.9 141L90.4 145.5L83.1 157.5L81.6 162.3L77.1 171.8L72.3 174.4L70.8 174.4L68 175.6L66.5 177.4L62.8 178.6L58.8 181.4L57.9 181L57.9 180L60.9 174.3L60.9 173L63.6 168.5L65.9 162.8L70.6 154.3L77.1 140.5L81.6 133L88.9 117.5L107.6 83L109.9 77L116.6 65.5L125.6 46.8L131.9 36L137.4 24.5L140.4 20L144.9 11L148.3 7.1L152.3 4.4L158.5 2.6L167.8 2.6L173 4.9L175.5 6.6L179.6 11L180.9 13.5L183.6 16.8L193.9 37L195 38.6L195.8 38.6L199.9 30.8L204.4 24.3L216 13.6L222 9.9L228.8 6.6L240.8 2.6L249 1.4L250.5 0.6Z",
  "M189.6 140.5L190.8 140.6L199.8 146.9L200.6 148L200.4 149.3L196.6 153.8L187.8 162.1L172.3 171.1L158.3 176.4L149.8 177.4L138.8 180.6L127.8 181.9L123 183.6L110.8 185.4L105.8 187.4L100 188.4L85.8 193.6L83.3 195.4L81.8 195.6L68.5 202.4L56.9 213L50.9 221L45.9 229.5L38.4 244.8L33.9 252L26.1 269L21.9 274.3L21.6 275.5L22.3 276.4L45 275.9L46.6 274L53.9 258.5L69.9 229L72.6 223.5L73.9 219.5L81.9 206L83.3 204.6L88.3 202.6L91.5 200.4L97.3 198.6L98.8 198.6L99.4 199.3L91.6 216L54 289.4L52.8 290.1L46 289.6L0.5 290.1L-0.1 288.5L4.1 279L9.6 270.3L14.9 259L21.9 246.3L21.9 245L37.9 216L47.6 203.3L57.3 193.6L60.3 192.1L64.8 188.4L72 183.6L81 179.6L82.5 179.6L87.8 177.6L89.5 177.6L91 176.6L98.5 174.4L105.8 173.1L122.3 168.6L130.8 167.6L133.5 166.6L137.3 166.6L145.5 164.4L152.5 163.4L161.5 160.6L176.3 153.1Z",
  "M235.4 167.8L253.5 175.6L255.1 177.3L262.9 193L267.6 200.8L268.9 204.3L271.4 208L281.9 228.5L282.6 230.3L282.9 233.8L282.4 235.8L281 237.4L278.3 238.6L273 238.4L270.6 236.8L267.9 233L248.6 195L234.9 169.5L234.6 168.3Z",
] as const;

type LoaderPhase = "loop" | "closingOutline" | "fadingFill" | "done";

export type LogoTraceLoaderProps = {
  loading?: boolean;
  isComplete?: boolean;
  size?: number;
  strokeWidth?: number;
  loopDurationSeconds?: number;
  fillFadeSeconds?: number;
  className?: string;
  ariaLabel?: string;
  onDone?: () => void;
};

/** How long the outline takes to close once loading ends. */
const CLOSE_SECONDS = 0.7;
/** Extra time before a timeout fallback fires, in case an animation event is missed. */
const FALLBACK_SLACK_MS = 150;

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function LogoTraceLoader({
  loading = true,
  isComplete = false,
  size = 96,
  strokeWidth = 3,
  loopDurationSeconds = 1.6,
  fillFadeSeconds = 0.5,
  className,
  ariaLabel = "Loading",
  onDone,
}: LogoTraceLoaderProps) {
  const finished = isComplete || !loading;
  const [phase, setPhase] = useState<LoaderPhase>("loop");
  const doneCalled = useRef(false);
  const onDoneRef = useRef(onDone);

  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  // Loop until loading ends, then close the outline, fade in the fill, and report done once.
  // Every step is driven by a timeout so nothing depends on SVG animation callbacks.
  useEffect(() => {
    if (!finished) return;
    const reduce = prefersReducedMotion();
    const timers: number[] = [];
    const later = (fn: () => void, ms: number) => timers.push(window.setTimeout(fn, ms));
    const finish = () => {
      setPhase("done");
      if (!doneCalled.current) {
        doneCalled.current = true;
        onDoneRef.current?.();
      }
    };

    if (reduce) {
      later(finish, 0);
    } else {
      later(() => setPhase("closingOutline"), 0);
      const closeMs = CLOSE_SECONDS * 1000 + FALLBACK_SLACK_MS;
      later(() => setPhase("fadingFill"), closeMs);
      later(finish, closeMs + fillFadeSeconds * 1000 + FALLBACK_SLACK_MS);
    }
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [finished, fillFadeSeconds]);

  const showFill = phase === "fadingFill" || phase === "done";

  return (
    <svg role="status" aria-label={ariaLabel} viewBox={LOGO_VIEW_BOX} width={size} height={size} className={className}>
      {/* The faint guide the trace runs along */}
      <g opacity="0.18">
        <path d={TRACE_PATH} fill="none" stroke="currentColor" strokeWidth={Math.max(1, strokeWidth / 2)} strokeLinejoin="round" />
      </g>

      {phase === "loop" ? (
        <path
          className="logo-trace-loader-loop"
          d={TRACE_PATH}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1}
          strokeDasharray="0.16 0.84"
          style={{ animation: `logo-trace-loader-loop ${loopDurationSeconds}s linear infinite` }}
        />
      ) : (
        // The full outline, drawn closed once loading ends, and kept under the fill.
        <path
          className="logo-trace-loader-close"
          d={TRACE_PATH}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1}
          strokeDasharray="1"
          style={{ animation: phase === "closingOutline" ? `logo-trace-loader-close ${CLOSE_SECONDS}s ease-out both` : undefined }}
        />
      )}

      {showFill ? (
        <g
          className="logo-trace-loader-fill"
          style={{ animation: phase === "fadingFill" ? `logo-trace-loader-fade ${fillFadeSeconds}s ease-out both` : undefined }}
        >
          {FILL_PATHS.map((path) => (
            <path key={path} d={path} fill="currentColor" />
          ))}
        </g>
      ) : null}
    </svg>
  );
}
