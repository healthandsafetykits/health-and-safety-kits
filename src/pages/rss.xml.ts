import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import MarkdownIt from 'markdown-it';
import sanitizeHtml from 'sanitize-html';

const parser = new MarkdownIt();

export async function GET(context: any) {
  const posts = await getCollection('posts');
  const sorted = posts.sort(
    (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  );

  return rss({
    title: 'Health and Safety Kits — Blog',
    description: 'Practical health and safety compliance guides for UK and Ireland small businesses and sole traders.',
    site: context.site || 'https://healthandsafetykits.com',
    items: sorted.map((post) => ({
      title: post.data.title,
      pubDate: new Date(post.data.date),
      description: post.data.description,
      link: `/blog/${post.id}/`,
      categories: post.data.tags,
      content: post.body
        ? sanitizeHtml(parser.render(post.body), {
            allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
          })
        : undefined,
    })),
    customData: '<language>en-gb</language>',
  });
}
