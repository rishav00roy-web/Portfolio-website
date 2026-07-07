"use client";

import React, { useState } from "react";

export default function LogoLoader({ onComplete }: { onComplete: () => void }) {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  // Fail-safe: if the video fails to load or error events don't fire properly 
  // (which happens often when all <source> tags 404), forcefully complete after a delay.
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 4000); // 4 seconds max wait time
    
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-app-bg transition-opacity duration-1000 ease-out">
      <video
        autoPlay
        muted
        playsInline
        onEnded={onComplete}
        onError={onComplete}
        onCanPlayThrough={() => setIsVideoLoaded(true)}
        className={`w-full max-w-sm md:max-w-md transition-opacity duration-500 ${
          isVideoLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <source src="/assets/logo.mov" type='video/quicktime; codecs="hvc1"' />
        <source src="/assets/logo.webm" type='video/webm; codecs="vp09"' />
      </video>
    </div>
  );
}
