// author: Khoa Phan <https://www.pldkhoa.dev>

"use client";

import {
  createContext,
  useContext,
  useRef,
  type HTMLAttributes,
  type PropsWithChildren,
} from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
  type UseScrollOptions,
} from "framer-motion";

import { cn } from "@/lib/utils";

interface StackingCardsProps
  extends PropsWithChildren,
    HTMLAttributes<HTMLDivElement> {
  scrollOptions?: UseScrollOptions;
  scaleMultiplier?: number;
  totalCards: number;
}

interface StackingCardItemProps
  extends HTMLAttributes<HTMLDivElement>,
    PropsWithChildren {
  index: number;
  topPosition?: string;
}

const StackingCardsContext = createContext<{
  progress: MotionValue<number>;
  scaleMultiplier?: number;
  totalCards?: number;
} | null>(null);

export const useStackingCardsContext = () => {
  const context = useContext(StackingCardsContext);
  if (!context)
    throw new Error("StackingCardItem must be used within StackingCards");
  return context;
};

export default function StackingCards({
  children,
  className,
  scrollOptions,
  scaleMultiplier,
  totalCards,
  ...props
}: StackingCardsProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    offset: ["start start", "end end"],
    ...scrollOptions,
    target: targetRef,
  });

  return (
    <StackingCardsContext.Provider
      value={{ progress: scrollYProgress, scaleMultiplier, totalCards }}
    >
      <div className={cn("w-full relative", className)} ref={targetRef} {...props}>
        {children}
      </div>
    </StackingCardsContext.Provider>
  );
}

const StackingCardItem = ({
  index,
  topPosition,
  className,
  children,
  ...props
}: StackingCardItemProps) => {
  const {
    progress,
    scaleMultiplier,
    totalCards = 1,
  } = useStackingCardsContext();

  const isLast = index === totalCards - 1;

  // The card scales down only when the NEXT card is scrolling over it
  const scaleTo = isLast ? 1 : 1 - (totalCards - 1 - index) * (scaleMultiplier ?? 0.015);
  const nextCardStart = (index + 1) / totalCards;
  const nextCardEnd = Math.min(1, (index + 2) / totalCards);
  const scale = useTransform(
    progress,
    isLast ? [0, 1] : [nextCardStart, nextCardEnd],
    isLast ? [1, 1] : [1, scaleTo],
    { clamp: true }
  );

  // Top tab offset: cleanly offsets each card so all tabs remain visible
  const top = topPosition ?? `calc(clamp(14px, 2.5vh, 28px) + ${index * 12}px)`;

  return (
    <div className={cn("w-full sticky top-0 flex items-start justify-center", className)} {...props}>
      <motion.div
        className="origin-top relative w-full flex justify-center"
        style={{
          top,
          scale,
          transformOrigin: "top center",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export { StackingCardItem };
