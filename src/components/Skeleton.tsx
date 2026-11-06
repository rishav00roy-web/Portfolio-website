"use client";

import { type ComponentPropsWithoutRef, useState } from "react";
import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";

/*
 * Skeleton: a placeholder block with a soft shimmer, like HeroUI's
 * Skeleton, without adding the library. The shimmer is a transformed
 * pseudo-element (compositor only) and stops for reduced motion; see
 * .skeleton in globals.css. Colour follows the text colour around it.
 */
export function Skeleton({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  return <div aria-hidden="true" className={cn("skeleton rounded-lg", className)} {...props} />;
}

/**
 * A `fill` image that shows a Skeleton until it has loaded, then removes it
 * (so no shimmer keeps running under a finished image).
 */
export function SkeletonImage({ className, onLoad, ...props }: ImageProps) {
  const [loaded, setLoaded] = useState(false);
  return (
    <>
      {!loaded && <Skeleton className="absolute inset-0 rounded-none" />}
      <Image
        {...props}
        alt={props.alt}
        className={cn(className, "transition-opacity duration-300", loaded ? "opacity-100" : "opacity-0")}
        onLoad={(e) => {
          setLoaded(true);
          onLoad?.(e);
        }}
      />
    </>
  );
}
