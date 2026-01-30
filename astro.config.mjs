import { defineConfig } from "astro/config";
import { SITE_URL } from "./src/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
// import remarkToc from 'remark-toc';
// import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis';
import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  integrations: [tailwind({
    applyBaseStyles: true
  }), sitemap(), mdx(), react(), vue({ appEntrypoint: '/src/pages/_app' })],
  markdown: {
    shikiConfig: {
      theme: "one-dark-pro"
    },
    // remarkPlugins: [ [remarkToc, { heading: 'Toc', maxDepth: 3 } ] ],
    // rehypePlugins: [rehypeAccessibleEmojis],
  }
});