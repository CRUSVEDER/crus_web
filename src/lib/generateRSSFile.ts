// src/lib/generateRSSFile.ts
import fs from 'fs'
import path from 'path'
import { generateRSSFeed } from './generateRSS'

async function generate() {
  const feed = await generateRSSFeed()
  const rss = feed.rss2()

  const outputPath = path.join(process.cwd(), 'public', 'rss.xml')
  fs.writeFileSync(outputPath, rss)

  console.log('✅ RSS feed generated at /public/rss.xml')
}

generate()
