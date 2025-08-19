import { Feed } from 'feed'
import posts from '../data/posts.json'
import fs from 'fs'
import path from 'path'

export async function generateRSSFeed() {
  const feed = new Feed({
    title: "Crus's Blog",
    description: "Cybersecurity blog",
    id: "https://crus.live/",
    link: "https://crus.live/",
    language: "en",
    favicon: "https://crus.live/favicon.ico",
    copyright: `All rights reserved ${new Date().getFullYear()}, Crus`,
    author: {
      name: "Crus",
      email: "yashgholap777@gmail.com",
      link: "https://crus.live/about"
    }
  })

  posts.forEach((post) => {
    if (!post.title || !post.date) return

    // Use a unique identifier for the post, e.g., its index or a generated id
    const url = `https://crus.live/posts/${encodeURIComponent(post.title.replace(/\s+/g, '-').toLowerCase())}`

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
