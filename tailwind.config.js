import { nextui } from "@nextui-org/react";
/** @type {import('tailwindcss').Config} */
// tailwind.config.js

// /** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.html",
    "./src/**/*.js",
    "./public/**/*.html",
    "./public/**/*.js",
    "*.{html,js,ts,tsx}", // Like this
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    nextui({
      // prefix: "nextui", // prefix for themes variables
      // addCommonColors: false, // override common colors (e.g. "blue", "green", "pink").
      // defaultTheme: "light", // default theme from the themes object
      // defaultExtendTheme: "light", // default theme to extend on custom themes
      // layout: {}, // common layout tokens (applied to all themes)
      themes: {
        dark: {
          extend: "dark", // <- inherit default values from dark theme
          colors: {
            background: "#0D001A",
            foreground: "#ffffff",
            primary: {
              50: "#3B096C",
              100: "#520F83",
              200: "#7318A2",
              300: "#9823C2",
              400: "#c031e2",
              500: "#DD62ED",
              600: "#F182F6",
              700: "#FCADF9",
              800: "#FDD5F9",
              900: "#FEECFE",
              DEFAULT: "#DD62ED",
              foreground: "#ffffff",
            },
            focus: "#F182F6",
          },
          // layout: {
          //   disabledOpacity: "0.3",
          //   radius: {
          //     small: "4px",
          //     medium: "6px",
          //     large: "8px",
          //   },
          //   borderWidth: {
          //     small: "1px",
          //     medium: "2px",
          //     large: "3px",
          //   },
          // },
        },
        light: {
          extend: "light", // <- inherit default values from dark theme
          colors: {
            background: "#ffffff",
            foreground: "#0D001A",
            primary: {
              50: "#0B096C",
              100: "#0B096C",
              200: "#0B096C",
              300: "#0B096C",
              400: "#0B096C",
              500: "#AD62ED",
              600: "#A182F6",
              700: "#ACADF9",
              800: "#ADD5F9",
              900: "#AEECFE",
              DEFAULT: "#0B096C",
              foreground: "#0D001A",
            },
            focus: "#0B096C",
          },
          // layout: {
          //   disabledOpacity: "0.3",
          //   radius: {
          //     small: "4px",
          //     medium: "6px",
          //     large: "8px",
          //   },
          //   borderWidth: {
          //     small: "1px",
          //     medium: "2px",
          //     large: "3px",
          //   },
          // },
        },
        // spacing: {
        //   1: "8px",
        //   2: "12px",
        //   3: "16px",
        //   4: "24px",
        //   5: "32px",
        //   6: "48px",
        // },
      },
    }),
  ],
};
