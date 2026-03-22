// @ts-check
import { defineConfig } from 'astro/config';
import { readdir, readFile } from 'node:fs/promises';
import matter from 'gray-matter';

import sitemap from '@astrojs/sitemap';

// Pre-compute blog post dates and tag data at build time for sitemap
const postDir = './src/content/posts';
const postDates = {};
const tagPostCounts = {};  // tag → number of posts
const tagLatestDates = {}; // tag → most recent post date
try {
  const files = await readdir(postDir);
  for (const file of files) {
    if (file.endsWith('.md')) {
      const raw = await readFile(`${postDir}/${file}`, 'utf-8');
      const { data } = matter(raw);
      const slug = file.replace(/\.md$/, '');
      const postDate = data.dateModified || data.date || null;
      postDates[slug] = postDate;

      // Count posts per tag and track latest date
      const tags = data.tags || [];
      for (const tag of tags) {
        tagPostCounts[tag] = (tagPostCounts[tag] || 0) + 1;
        if (postDate) {
          const d = new Date(postDate);
          if (!tagLatestDates[tag] || d > new Date(tagLatestDates[tag])) {
            tagLatestDates[tag] = postDate;
          }
        }
      }
    }
  }
} catch {
  // No posts directory yet — that's fine during initial builds
}

// Static page last-modified dates (update when meaningfully edited)
const staticDates = {
  '/': '2026-03-21',
  '/kits/': '2026-03-21',
  '/kits/cleaning/': '2026-03-21',
  '/kits/landscaping/': '2026-03-21',
  '/kits/beauty/': '2026-03-21',
  '/kits/dog-grooming/': '2026-03-21',
  '/free-sample/': '2026-03-21',
  '/about/': '2026-03-20',
  '/faq/': '2026-03-22',
  '/contact/': '2026-03-20',
  '/blog/': '2026-03-20',
  '/compliance-checklist-2026/': '2026-03-22',
  '/subscription-vs-download/': '2026-03-22',
};

// https://astro.build/config
export default defineConfig({
  site: 'https://healthandsafetykits.com',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes('/terms/') &&
        !page.includes('/privacy/') &&
        !page.includes('/licensing/') &&
        // Exclude noindex tag pages (fewer than 2 posts)
        !(page.includes('/tags/') && (() => {
          const tagMatch = page.match(/\/tags\/([^/]+)\//);
          return tagMatch && (tagPostCounts[tagMatch[1]] || 0) < 2;
        })()),
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
          const tagMatch = url.match(/\/tags\/([^/]+)\//);
          const tag = tagMatch ? tagMatch[1] : null;
          const lastmod = tag && tagLatestDates[tag]
            ? new Date(tagLatestDates[tag]).toISOString().split('T')[0]
            : undefined;
          return { ...item, changefreq: 'monthly', priority: 0.5, lastmod };
        }

        // Other static pages
        const path = new URL(url).pathname;
        return { ...item, changefreq: 'monthly', priority: 0.6, lastmod: staticDates[path] || undefined };
      },
    }),
  ],
});
