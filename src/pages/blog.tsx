import { useState } from "react";
import MorePosts from "@/components/more-posts"
import HeroPost from "@/components/post-hero"
import Layout from "@/components/layout-project"
import { getAllPosts } from "@/lib/api"
import { type Post } from "@/types"

type Props = {
  allPosts: Post[]
}

const Blog = ({ allPosts }: Props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const heroPost = allPosts[0]
  const morePosts = allPosts.slice(1)
  
  const filteredMorePosts = morePosts.filter((post) => {
  const query = searchQuery.toLowerCase();

  // match title OR tags
  const matchesTitle = post.title.toLowerCase().includes(query);
  const matchesTags = post.tags?.some((tag) =>
    tag.toLowerCase().includes(query)
  );

  return matchesTitle || matchesTags;
});

  return (
    <Layout>
      <h1 className="mb-8 w-full max-w-7xl text-8xl font-bold tracking-tighter leading-tight opacity-0 md:pr-8 lg:mb-12 dark:text-gray-100 animate-fade_in_up_10">
        blog.{" "}
      </h1>
      <div className="w-full max-w-7xl mx-auto p-4 flex flex-col gap-8 animate-fade_in_up_10 ">
        {/* Search Bar */}
        <div className="relative w-full max-w-md">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search posts..."
            className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-300 dark:focus:ring-palevioletred font-mono transition"
            aria-label="Search posts"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-800 dark:text-gray-100 hover:text-pink-300 dark:hover:text-pink-300"
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        {heroPost && <HeroPost post={heroPost} />}
        {filteredMorePosts.length ? (
          <div className="mt-8 md:mt-12">
            <MorePosts posts={filteredMorePosts} />
          </div>
        ) : (
          <p className="text-blue-400 text-center">
            No posts found.
          </p>
        )}
      </div>
    </Layout>
  )
}

export default Blog

export const getStaticProps = async () => {
  const allPosts = await getAllPosts([
    "title",
    "date",
    "slug",
    "author",
    "cover",
    "excerpt",
    "tags",
    "category",
    "time",
  ])

  return {
    props: { allPosts },
  }
}