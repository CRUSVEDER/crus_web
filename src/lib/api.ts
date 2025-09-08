// src/lib/api.ts
import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { POSTS_PATH, postFilePaths } from "./mdxUtils";
import type { Post } from "@/types";
import readingTime from "reading-time";


export async function getAllPosts(fields: string[] = []): Promise<Post[]> {
  // Read external posts from posts.json
  let externalPosts: Post[] = [];
  try {
    externalPosts = require("../data/posts.json").map((post: any) => ({
      slug: post.slug || "",
      title: post.title || "",
      date: post.date || new Date().toISOString(),
      excerpt: post.excerpt || "", // Default to empty if missing
      tags: post.tags || [],
      category: post.category || "",
      ogImage: post.ogImage || { url: "" }, // Default if missing
      content: "",
      url: post.url || "",
      cover: post.cover || { imageFile: "" },
      time: post.time || { text: "", minutes: 0, time: 0, words: 0 },
    }));
  } catch (error) {
    console.error("Error reading posts.json:", error);
  }

  // Read local MDX posts from src/_posts/
const localPosts: Post[] = [];
const filePaths = await postFilePaths();

for (const filePath of filePaths) {
  const fullPath = path.join(POSTS_PATH, filePath, "index.mdx");
  try {
    const fileContents = await fs.readFile(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    // Calculate reading time BEFORE constructing post
    const time = readingTime(content); // Use content (like getStaticProps) for consistency

    const post: Post = {
      slug: filePath,
      title: data.title || "",
      date: data.date || new Date().toISOString(),
      excerpt: data.excerpt || "",
      tags: data.tags || [],
      category: data.category || "",
      ogImage: data.ogImage || { url: "" },
      content: fields.includes("content") ? content : "",
      url: data.url || "",
      cover: data.cover || { imageFile: "" },
      time, // Assign computed reading time
    };

    const filteredPost = fields.length
      ? Object.fromEntries(
          Object.entries(post).filter(([key]) => fields.includes(key))
        )
      : post;
    localPosts.push(filteredPost as Post);
  } catch (error) {
    console.error(`Error reading MDX file ${filePath}:`, error);
  }
}

  // Combine and sort posts by date (newest first)
  const allPosts = [...externalPosts, ...localPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return allPosts;
}