import fs from "fs/promises"
import { join } from "path"
import matter from "gray-matter"
import readingTime from "reading-time"
import { remark } from "remark"
import html from "remark-html"

type Items = {
  [key: string]: string
}

type File = {
  excerpt: string
  content: string
}

const firstParagraph = (file: File) => {
  // Remove frontmatter
  const contentWithoutFrontmatter = file.content.replace(/^---[\s\S]*?---/, '').trim();

  // Split by double newlines (paragraphs)
  const paragraphs = contentWithoutFrontmatter
    .split(/\n\s*\n/)
    .map(p => p.trim())
    .filter(Boolean);

  let firstParagraph = paragraphs[0] || "";
  
  // Stop at the first line break (newline character)
  const lines = firstParagraph.split('\n').map(line => line.trim());
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // Skip headers, empty lines, and lines that are just '---'
    if (line && !line.startsWith('#') && line !== '---') {
      file.excerpt = line;
      return;
    }
  }
  // If no valid line found, set excerpt to empty string
  file.excerpt = "";
}

const postsDirectory = join(process.cwd(), "src", "_posts")

export async function getPostSlugs() {
  return fs.readdir(postsDirectory)
}

const getMarkdownFile = async (filePath: string) => {
  const files = await fs.readdir(filePath)
  return files.filter((file) => file.match(new RegExp(`.*.md`, "ig")))[0]
}

const excerptToHtml = async (excerpt: string) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const e1 = await remark().use(html).process(excerpt)
    return e1.toString()
  } catch (error) {
    // Fallback to plain text if HTML processing fails
    console.warn('Failed to process excerpt to HTML:', error)
    return `<p>${excerpt}</p>`
  }
}

export async function getPostBySlug(slug: string, fields: string[] = []) {
  const items: Items = {}
  const filePath = await getMarkdownFile(join(postsDirectory, slug))
  const fileContents = await fs.readFile(join(postsDirectory, slug, filePath), "utf8")
  const { data, excerpt, content } = matter(fileContents, {
    // @ts-expect-error comment
    excerpt: firstParagraph,
  })

  // Time to Read
  data.time = readingTime(fileContents)

  // Excerpt
  if (excerpt) {
    const htmlExcerpt = await excerptToHtml(excerpt)
    // Clean up the HTML and ensure it's properly formatted
    data.excerpt = htmlExcerpt
      .replace(/<h[1-6][^>]*>.*?<\/h[1-6]>/g, '') // Remove all headers
      .replace(/<[^>]*>/g, (match) => {
        // Only keep basic formatting tags
        if (['p', 'strong', 'em', 'code', 'a'].includes(match.replace(/[<>]/g, ''))) {
          return match
        }
        return ''
      })
      .trim()
  }

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = slug
    }
    if (field === "content") {
      items[field] = content
    }

    if (data[field]) {
      items[field] = data[field]
    }
  })

  return items
}

export async function getAllPosts(fields: string[] = []) {
  const slugs = await getPostSlugs()
  const postFiles = await Promise.all(slugs.map(async (slug) => getPostBySlug(slug, fields)))
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const postLinks = require("../data/posts.json") as Items[]
  const posts: Items[] = [...postFiles, ...postLinks].sort((post1, post2) =>
    post1.date > post2.date ? -1 : 1,
  )
  return posts
}
