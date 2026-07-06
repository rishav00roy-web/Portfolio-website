"use client";

import { useEffect } from "react";

export default function ThemeInitializer() {
  useEffect(() => {
    // Read the query parameters to set the theme for screenshot previews
    const params = new URLSearchParams(window.location.search);
    const theme = params.get("theme");
    
    if (theme === "light") {
      document.body.classList.add("theme-light");
    } else {
      document.body.classList.remove("theme-light");
    }
  }, []);

  return null;
}
