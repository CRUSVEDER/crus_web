// src/lib/generateRSS.ts
import { Feed } from "feed";
import { getAllPosts } from "./api";

export async function generateRSSFeed() {
  const posts = await getAllPosts(["title", "date", "slug", "excerpt", "url"]);

  const site = process.env.SITE_URL || "https://crus.live";
  const date = new Date();

  const feed = new Feed({
    title: "CRUS Blog",
    description: "CRUSVEDER's blog posts on cybersecurity, hacking, and more",
    id: site,
    link: site,
    language: "en",
    feedLinks: {
      rss2: `${site}/rss.xml`,
    },
    author: {
      name: "Yash Gholap",
      email: "yashgholap777@gmail.com",
      link: site,
    },
    copyright: `All rights reserved ${date.getFullYear()}, Yash Gholap`,
    updated: date,
  });

  for (const post of posts) {
    const url = post.url || `${site}/posts/${post.slug}`;
    feed.addItem({
      title: post.title,
      id: url,
      link: url,
      description: post.excerpt || "No description available",
      content: post.excerpt || "No content available",
      date: new Date(post.date),
    });
  }

  return feed;
}