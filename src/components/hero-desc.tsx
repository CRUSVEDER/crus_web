import ScreenshotLink from "@/components/screenshot-link"

const IntroDescription = () => (
  <div
    className="relative p-2 mt-4 w-full text-lg font-thin text-left text-gray-800 md:text-xl lg:pl-10 lg:w-11/12 dark:text-gray-100 font-mono leading-[2.5rem] animate-[var(--animation-fade-in-bloom)] text-balance"
    style={{ animationDuration: "500ms" }}
  >
    Hi, I’m <strong className="font-normal">Crus</strong> — a cybersecurity enthusiast and developer.  
    I build AI-powered tools, custom utilities, and love exploring{" "}
    <ScreenshotLink url="/projects" image="projects.png">
      security-focused projects.
    </ScreenshotLink>
    <br />
    I take part in{" "}
    <ScreenshotLink url="http://crusblog.vercel.app" image="ctftime.png">
      CTFs
    </ScreenshotLink>{" "}
    and enjoy solving challenges that push my limits.  
    <br />
    Check out my{" "}
    <ScreenshotLink url="/blog" image="blog.png">
      blog
    </ScreenshotLink>{" "}
    for write-ups on ethical hacking, OSINT, forensics, and automation.  
    <br />
    I also share quick thoughts on{" "}
    <ScreenshotLink url="https://twitter.com/yashg31" image="twitter.png">
      Twitter
    </ScreenshotLink>{" "}
    — covering tech, tools, and terminal tales.
  </div>
)

export default IntroDescription
