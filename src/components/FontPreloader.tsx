"use client";

import React from "react";

export function FontPreloader() {
  return (
    <>
      <link
        rel="preload"
        href="/fonts/KenokyLight.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        href="/fonts/CoffekanRegular.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
    </>
  );
}

export default FontPreloader;
