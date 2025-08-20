// src/types/index.ts
export type TODO = any;

export type Post = {
  slug: string;
  title: string;
  date: string;
  cover: {
    imageFile: string;
  };
  excerpt: string;
  tags: string[];
  category: string;
  ogImage: {
    url: string;
  };
  content: string;
  url: string; // Added for external post URLs (from posts.json)
  time: {
    text: string;
    minutes: number;
    time: number;
    words: number;
  };
};

export type Project = {
  name: string;
  url: string;
  image: string;
  desc: string;
  tech: string[];
};

export type Projects = {
  projects: Project[];
};