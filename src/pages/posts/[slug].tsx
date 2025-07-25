import dynamic from "next/dynamic"
import Head from "next/head"
import PostHeader from "@/components/post-header"
import Layout from "@/components/layout-post"
import ScreenshotLink from "@/components/screenshot-link"
import CodeEditor from "@/components/mdx/code-editor"
import { type Post, type TODO } from "@/types"

import path from "node:path"
import fs from "node:fs/promises"
import matter from "gray-matter"
import rehypeSlug from "rehype-slug"
import gfm from "remark-gfm"
import callouts from "remark-callouts"
import readingTime from "reading-time"
import rehypeShiki from "@shikijs/rehype"
import { MDXRemote } from "next-mdx-remote"
import { serialize } from "next-mdx-remote/serialize"
import rehypeAutolinkHeadings from "rehype-autolink-headings"

import { postFilePaths, POSTS_PATH } from "@/lib/mdxUtils"

// import CodeBlock from "@/components/codeblock"


const components = {
  CodeEditor: CodeEditor,
  ScreenshotLink: ScreenshotLink,
  // pre: CodeBlock,
}

const ProgressBar = dynamic(() => import("../../components/progress-bar"), {
  ssr: false,
})

type Props = {
  source: TODO
  frontMatter: Post
  slug: string
}

const Post = ({ source, frontMatter, slug }: Props) => {
  return (
    <>
      <Head>
        <title>{`${frontMatter.title.trim()} | Yash`}</title>
        <meta property="og:type" content="article" />
        <meta property="og:title" content={`${frontMatter.title} | Yash`} />
        <meta property="og:url" content={`https://crus.dev/posts/${slug}`} />
        <meta property="og:description" content={frontMatter.excerpt ?? ""} />
        <meta property="article:author" content="Yash Gholap" />
        <meta property="article:tag" content={frontMatter.tags.join(",")} />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={`${frontMatter.title} | Yash`} />
        <meta name="twitter:site" content="@Yashg31" />
        <meta name="twitter:description" content={frontMatter.excerpt} />
        <meta name="twitter:image:alt" content={frontMatter.title} />
      </Head>
      <ProgressBar />
      <Layout>
        <PostHeader post={frontMatter} />
        <article className="w-full max-w-4xl dark:text-gray-100 prose prose-lg dark:prose-dark">
          <MDXRemote {...source} components={components} lazy />
        </article>
      </Layout>
    </>
  )
}

export default Post

type Params = {
  params: {
    slug: string
  }
}

export async function getStaticProps({ params }: Params) {
  const postFilePath = path.join(POSTS_PATH, params.slug, "index.mdx")
  const source = await fs.readFile(postFilePath)

  const { content, data } = matter(source)

  // Use the same excerpt logic as the blog listing
  const contentWithoutFrontmatter = content.replace(/^---[\s\S]*?---/, '').trim();
  const paragraphs = contentWithoutFrontmatter
    .split(/\n\s*\n/)
    .map(p => p.trim())
    .filter(Boolean);

  let firstParagraph = paragraphs[0] || "";
  const lines = firstParagraph.split('\n').map(line => line.trim());
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line && !line.startsWith('#') && line !== '---') {
      data.excerpt = line;
      break;
    }
  }
  if (!data.excerpt) {
    data.excerpt = "";
  }

  data.time = readingTime(content)

  const mdxSource = await serialize(content, {
    parseFrontmatter: false,
    mdxOptions: {
      // @ts-expect-error Callouts plugin works, but type not matching to next-mdx-remote expectations
      remarkPlugins: [gfm, callouts],
      rehypePlugins: [
        rehypeSlug,
        [
          // @ts-expect-error types not matching mdx-remote expectations
          rehypeShiki,
          {
            // See: https://shiki.matsu.io/themes
            theme: "catppuccin-mocha",
          },
        ],
        [rehypeAutolinkHeadings, { behavior: "prepend" }],
      ],
    },
    scope: data,
  })

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
      slug: params.slug,
    },
  }
}

export const getStaticPaths = async () => {
  const filePaths = await postFilePaths()
  const paths = filePaths
    .map((path: string) => path.replace(/\.mdx?$/, ""))
    .map((slug: string) => ({ params: { slug } }))

  return {
    paths,
    fallback: false,
  }
}