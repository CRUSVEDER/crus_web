import { useEffect } from "react"
import setFlickerAnimation from "@/lib/flicker"
import HeroDescription from "@/components/hero-desc"

const Hero = () => {
  useEffect(() => {
    setFlickerAnimation()
  }, [])

  return (
    <section className="flex relative z-10 flex-col items-start my-16 max-w-7xl text-left lg:flex-row lg:justify-between lg:items-center lg:mt-[15vh]">
      <div className="relative w-2/3 h-16">
        <h1 className="font-sans font-black tracking-tighter leading-tight dark:text-gray-100 text-9.5xl js_darkmode_flicker intro-title lg:text-10xl">
          Yash.
        </h1>
      </div>
      <HeroDescription />
    </section>
  )
}

export default Hero
