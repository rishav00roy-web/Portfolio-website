import { useState, useEffect } from "react";

export function useFontLoading() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [loadingTime, setLoadingTime] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !("fonts" in document)) {
      const timer = setTimeout(() => setFontsLoaded(true), 0);
      return () => clearTimeout(timer);
    }

    const startTime = performance.now();

    // Check if the fonts are already loaded or wait until they load
    document.fonts.ready
      .then(() => {
        const endTime = performance.now();
        setLoadingTime(endTime - startTime);
        setFontsLoaded(true);
      })
      .catch((err) => {
        console.error("Failed to load fonts:", err);
        setFontsLoaded(true); // Gracefully degrade on failure
      });
  }, []);

  return { fontsLoaded, loadingTime };
}
