import { ParallaxProvider } from "react-scroll-parallax"
import ProjectCard from "@/components/project-card"
import { type Project } from "@/types"

type Props = {
  projects: Project[]
}

const MoreProjects = ({ projects }: Props) => {
  return (
    <ParallaxProvider>  {/* Single provider for all */}
      <section className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:gap-16 dark:text-gray-100">
        {projects.map((project, index) => (
          <ProjectCard key={project.name} project={project} index={index + 1} />
        ))}
      </section>
    </ParallaxProvider>
  )
}

export default MoreProjects
