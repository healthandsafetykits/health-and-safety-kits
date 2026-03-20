// @ts-check
import { defineConfig } from 'astro/config';
import { readdir, readFile } from 'node:fs/promises';
import matter from 'gray-matter';

import sitemap from '@astrojs/sitemap';

// Pre-compute blog post dates at build time for sitemap lastmod
const postDir = './src/content/posts';
const postDates = {};
try {
  const files = await readdir(postDir);
  for (const file of files) {
    if (file.endsWith('.md')) {
      const raw = await readFile(`${postDir}/${file}`, 'utf-8');
      const { data } = matter(raw);
      const slug = file.replace(/\.md$/, '');
      postDates[slug] = data.dateModified || data.date || null;
    }
  }
} catch {
  // No posts directory yet — that's fine during initial builds
}

// Static page last-modified dates (update when meaningfully edited)
const staticDates = {
  '/': '2026-03-20',
  '/kits/': '2026-03-20',
  '/free-sample/': '2026-03-20',
  '/about/': '2026-03-20',
  '/faq/': '2026-03-20',
  '/contact/': '2026-03-20',
  '/blog/': '2026-03-20',
};

// https://astro.build/config
export default defineConfig({
  site: 'https://healthandsafetykits.com',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes('/terms/') &&
        !page.includes('/privacy/'),
      serialize: (item) => {
        const url = item.url;

        // Homepage
        if (url === 'https://healthandsafetykits.com/') {
          return { ...item, changefreq: 'weekly', priority: 1.0, lastmod: staticDates['/'] };
        }

        // Product pages
        if (url.includes('/kits/') || url.includes('/free-sample/')) {
          const path = new URL(url).pathname;
          return { ...item, changefreq: 'monthly', priority: 0.9, lastmod: staticDates[path] || undefined };
        }

        // Blog posts
        const postMatch = url.match(/\/blog\/([^/]+)\//);
        if (postMatch && postMatch[1] !== 'index') {
          const slug = postMatch[1];
          const lastmod = postDates[slug];
          return { ...item, changefreq: 'monthly', priority: 0.7, lastmod: lastmod ? new Date(lastmod).toISOString().split('T')[0] : undefined };
        }

        // Tag pages
        if (url.includes('/tags/')) {
          return { ...item, changefreq: 'monthly', priority: 0.5 };
        }

        // Other static pages
        const path = new URL(url).pathname;
        return { ...item, changefreq: 'monthly', priority: 0.6, lastmod: staticDates[path] || undefined };
      },
    }),
  ],
});
