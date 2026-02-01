import { defineConfig } from "astro/config";
import { SITE_URL } from "./src/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";

// import remarkToc from 'remark-toc';
// import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis';
import rehypePrettyCode from 'rehype-pretty-code';

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  integrations: [tailwind({
    applyBaseStyles: true
  }), sitemap(), mdx()],
  markdown: {
    shikiConfig: {
      theme: "one-dark-pro"
    },
        rehypePlugins: [
      [
        rehypePrettyCode,
        {
          // 使用自定义主题
          theme: {
            dark: 'github-dark',
            light: 'github-light',
          },
          // 默认启用滚动
          defaultLang: {
            block: {
              overflowX: 'auto'
            }
          },
          // 添加行号
          grid: false,
          lineNumbers: true,
          // 添加复制按钮
          onVisitLine(node) {
            if (node.children.length === 0) {
              node.children = [{ type: 'text', value: ' ' }];
            }
          },
          onVisitHighlightedLine(node) {
            node.properties.className = ['highlighted'];
          },
          onVisitHighlightedWord(node) {
            node.properties.className = ['word'];
          }
        }
      ]
    ]
    // remarkPlugins: [ [remarkToc, { heading: 'Toc', maxDepth: 3 } ] ],
    // rehypePlugins: [rehypeAccessibleEmojis],
  }
});