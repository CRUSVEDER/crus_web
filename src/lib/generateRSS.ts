import { Feed } from 'feed'
import posts from '../data/posts.json'
import fs from 'fs'
import path from 'path'

export async function generateRSSFeed() {
  const feed = new Feed({
    title: "Crus's Blog",
    description: "Cybersecurity blog",
    id: "https://localhost:3003/",
    link: "https://localhost:3003/",
    language: "en",
    favicon: "https://localhost:3003/favicon.ico",
    copyright: `All rights reserved ${new Date().getFullYear()}, Crus`,
    author: {
      name: "Crus",
      email: "your@email.com",
      link: "https://localhost:3003/about"
    }
  })

  posts.forEach((post) => {
    if (!post.title || !post.date) return

    // Use a unique identifier for the post, e.g., its index or a generated id
    const url = `https://localhost:3003/posts/${encodeURIComponent(post.title.replace(/\s+/g, '-').toLowerCase())}`

    feed.addItem({
      title: post.title,
      id: url,
      link: url,
      description: post.title,
      content: post.title,
      author: [{ name: 'Crus' }],
      date: new Date(post.date)
    })
  })

  // Write the RSS XML to the public directory
  const rssPath = path.resolve('public', 'rss.xml')
  fs.writeFileSync(rssPath, feed.rss2())

  return feed
}
