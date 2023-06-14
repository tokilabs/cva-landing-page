// vite.config.js
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import { defineConfig } from "vite";
import postcssPresetEnv from "postcss-preset-env";
import purgecss from "@fullhuman/postcss-purgecss";

/** @type {import('vite').UserConfigExport} */
export default defineConfig({
  build: {
    emptyOutDir: true,
    outDir: "./dist",
  },
  css: {
    postcss: {
      plugins: [
        autoprefixer(),
        postcssPresetEnv(),
        purgecss({
          content: ["./**/*.html"],
        }),
        cssnano()
      ],   
    }
  }
});
