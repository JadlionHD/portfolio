// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";

import tailwindcss from "@tailwindcss/vite";
import { remarkReadingTime } from "./remark-reading-time.mjs";

// https://astro.build/config
export default defineConfig({
  site: "https://jad.li",
  integrations: [react(), mdx(), sitemap()],

  vite: {
    plugins: [tailwindcss()]
  },

  i18n: {
    locales: ["en"],
    defaultLocale: "en"
  },

  markdown: {
    remarkPlugins: [remarkReadingTime]
  }
});
