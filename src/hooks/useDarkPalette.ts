// useDarkPalette.ts
import { useEffect, useState } from "react";

const useDarkPalette = () => {
  const [dark, setDark] = useState(false);
  // Add or remove the "ion-palette-dark" class on the html element
  const toggleDarkPalette = (shouldAdd: boolean) => {
    document.documentElement.classList.toggle("ion-palette-dark", shouldAdd);
  };

  // Check/uncheck the toggle and update the palette based on isDark
  const initializeDarkPalette = (isDark: boolean) => {
    toggleDarkPalette(isDark);
    setDark(isDark);
  };

  useEffect(() => {
    // Use matchMedia to check the user preference
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

    // Initialize the dark palette based on the initial
    // value of the prefers-color-scheme media query
    initializeDarkPalette(prefersDark.matches);

    const setDarkPaletteFromMediaQuery = (mediaQuery: MediaQueryListEvent) => {
      initializeDarkPalette(mediaQuery.matches);
    };

    // Listen for changes to the prefers-color-scheme media query
    prefersDark.addEventListener("change", setDarkPaletteFromMediaQuery);

    return () => {
      prefersDark.removeEventListener("change", setDarkPaletteFromMediaQuery);
    };
  }, []);

  return { isDark: dark };
};

export default useDarkPalette;
