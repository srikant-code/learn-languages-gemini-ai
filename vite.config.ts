import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import babel from "vite-plugin-babel";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // babel({
    //   babelConfig: {
    //     babelrc: false,
    //     configFile: false,
    //     plugins: ["@babel/plugin-proposal-decorators"],
    //   },
    // }),
  ],
  assetsInclude: ["**/*.md"],
  build: {
    target: "ESNext", // <--------- ✅✅✅✅✅✅
  },
});
