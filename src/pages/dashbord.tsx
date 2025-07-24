import Layout from "@/components/layout"
import Blur from "@/components/blur";
import Image from "next/image";
import GithubContributions from "@/components/dash-elem/github_contributions";
import DiscordDashboard from "@/components/dash-elem/discordprofile";
import Intro from "@/components/dash-elem/intro";
import Weather from "@/components/dash-elem/weather";
import LatestCVEs from "@/components/dash-elem/LatestCVEs";
import Virustotal from "@/components/dash-elem/virustotal";



const DashboardGrid = () => {
  return (
    <Layout>
      <h1 className="mb-8 w-full max-w-screen-lg text-8xl font-bold tracking-tighter leading-tight opacity-100 md:pr-8 lg:mb-12 dark:text-gray-100">
        dashboard.
      </h1>

      <div className="grid grid-cols-[repeat(4,325px)] auto-rows-[325px] gap-6 w-[1390px] mx-auto font-mono relative">
        {/* Rectangle (665x325) */}
        <div className="bg-[#1c1c1c]/50 text-white col-span-2 row-span-1 p-4 rounded-sm border border-black/20 dark:border-transparent">
          <Intro />
        </div>

        {/* Square (325x325) */}
        <div className="bg-[#1c1c1c]/50 text-white p-4 rounded-sm border border-black/20 dark:border-transparent flex items-center justify-center">
          <Weather />
        </div>

        {/* Vertical Rectangle (325x665) */}
        <div className="bg-[#1c1c1c]/50 col-span-1 row-span-2 p-0 rounded-sm border border-black/20 dark:border-transparent overflow-hidden relative">
          <div className="relative w-full h-full">
            <Image
              src="/assets/img/screenshots/street.gif"
              alt="Vertical Block Image"
              layout="fill"
              objectFit="cover"
              priority
            />
          </div>
        </div>

        {/* Square (325x325) */}
        <div className="bg-[#1c1c1c]/50 text-white p-4 rounded-sm border border-black/20 dark:border-transparent flex items-center justify-center">
          <DiscordDashboard />
        </div>

        {/* Rectangle (665x325) */}
        <div className="bg-[#1c1c1c]/50 text-white col-span-2 row-span-1 p-4 rounded-sm border border-black/20 dark:border-transparent flex items-center gap-4">
            <GithubContributions username="CRUSVEDER" />
        </div> 
        


        {/* Vertical Rectangle (325x665) */}
        <div className="bg-[#1c1c1c]/50 col-span-1 row-span-2 p-0 rounded-sm border border-black/20 dark:border-transparent overflow-hidden relative ">
          <div className="relative w-full h-full">
            <Image
              src="/assets/img/screenshots/building.gif"
              alt="Vertical Block Image"
              layout="fill"
              objectFit="cover"
              priority
            />
          </div>
        </div>

        {/* Rectangle (665x325) */}
        <div className="bg-[#1c1c1c]/50 text-white col-span-2 row-span-1 p-4 rounded-sm border border-black/20 dark:border-transparent flex items-center justify-center text-x tracking-wide overflow-y-auto">
          <LatestCVEs />
        </div>

        {/* Square (325x325) */}
        <div className="bg-[#1c1c1c]/50 text-white p-4 rounded-sm border border-black/20 dark:border-transparent flex items-center justify-center text-xl">
          Coming Soon...
        </div>
        
        {/* Square (325x325) */}
        <div className="bg-[#1c1c1c]/50 text-white p-4 rounded-sm border border-black/20 dark:border-transparent flex items-center justify-center text-xl">
          Coming Soon...
        </div>

        
        {/* News  */} 
      <div className="bg-[#1c1c1c]/50 text-white p-4 col-span-2 row-span-1  rounded-sm border border-black/20 dark:border-transparent  flex items-center justify-center text-xl tracking-wide overflow-y-auto">
        <Virustotal />
      </div>

      </div>

      
    <Blur />
    </Layout>
  )
}

export default DashboardGrid
