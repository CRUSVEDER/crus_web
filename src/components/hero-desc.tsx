import ScreenshotLink from "@/components/screenshot-link"

const IntroDescription = () => (
  <div
    className="relative p-2 mt-4 w-full text-lg font-thin text-left text-gray-800 md:text-xl lg:pl-10 lg:w-11/12 dark:text-gray-100 font-mono leading-[2.75rem] animate-[var(--animation-fade-in-bloom)] text-balance"
    style={{ animationDuration: "500ms" }}
  >
    Hey there 👋 I'm <strong className="font-normal">Crus</strong> — a passionate cybersecurity enthusiast and developer.
    I work on AI-powered tools, custom utilities, and love diving deep into{" "}
    <ScreenshotLink url="/projects" image="projects.png">
      security-focused projects
    </ScreenshotLink>{" "}
    🧠.

    I regularly participate in{" "}
    <ScreenshotLink url="http://crusblog.vercel.app" image="ctftime.png">
      CTFs
    </ScreenshotLink>{" "}
    🎯 and enjoy solving real-world challenges that push my technical limits.

    You’ll find write-ups, experiments, and thoughts on my{" "}
    <ScreenshotLink url="/blog" image="blog.png">
      blog
    </ScreenshotLink>{" "}
    📝 — covering topics like ethical hacking, forensic analysis, and automation.

    I also share quick updates and reflections on{" "}
    <ScreenshotLink url="https://twitter.com/yashg31" image="twitter.png">
      Twitter
    </ScreenshotLink>{" "}
    🐦 if you're into tech, tools, and terminal tales.
  </div>
)

export default IntroDescription
