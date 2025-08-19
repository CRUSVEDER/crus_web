// src/lib/mdxUtils.ts
import path from "node:path";
import fs from "node:fs/promises";

export const POSTS_PATH = path.join(process.cwd(), "src", "_posts");
export const postFilePaths = async () => {
  try {
    const files = await fs.readdir(POSTS_PATH, { withFileTypes: true });
    return files
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);
  } catch (error) {
    console.error("Error reading post file paths:", error);
    return [];
  }
};