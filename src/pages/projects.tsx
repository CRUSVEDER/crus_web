import { useState } from "react";
import MoreProjects from "@/components/more-projects"
import Layout from "@/components/layout-project"
import { type Projects } from "@/types"

const About = ({ projects }: Projects) => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredProjects = projects.filter((project) => {
    const query = searchQuery.toLowerCase();

    // match title OR description OR tags
    const matchesName = project.name?.toLowerCase().includes(query);
    const matchesDesc = project.desc?.toLowerCase().includes(query);
    const matchesTech = project.tech?.some((tag) =>
      tag.toLowerCase().includes(query)
    );

    return matchesName || matchesDesc || matchesTech;
  });

  return (
    <Layout>
      <h1 className="mb-8 w-full max-w-7xl text-8xl font-bold tracking-tighter leading-tight opacity-0 md:pr-8 lg:mb-12 dark:text-gray-100 animate-fade_in_up_10">
        projects.
      </h1>
      <div className="w-full max-w-7xl mx-auto p-4 flex flex-col gap-8 animate-fade_in_up_10 ">
        {/* Search Bar */}
        <div className="relative w-full max-w-md">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects..."
            className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded border border-gray-200 dark:border-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-300 dark:focus:ring-palevioletred font-mono transition"
            aria-label="Search projects"
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

        {filteredProjects.length ? (
          <div className="mt-8 md:mt-12">
            <MoreProjects projects={filteredProjects} />
          </div>
        ) : (
          <p className="text-blue-400 text-center">
            No projects found.
          </p>
        )}
      </div>
    </Layout>
  )
}

export default About

export const getStaticProps = () => {
  const projects: Record<string, any> = require("../data/projects.json")

  return {
    props: { projects },
  }
}
