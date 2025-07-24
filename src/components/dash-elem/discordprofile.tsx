"use client"

import React, { useEffect, useState, useMemo, useCallback } from "react"


const DISCORD_USER_ID = "503956236039880714"

type Activity = {
  name: string
  type: number
  details?: string
  state?: string
  application_id?: string
  timestamps?: {
    start?: number
  }
  assets?: {
    large_image?: string
  }
}

const getElapsedTime = (start: number) => {
  const elapsed = Math.floor((Date.now() - start) / 1000)
  const hours = Math.floor(elapsed / 3600)
  const minutes = Math.floor((elapsed % 3600) / 60)
  return `${hours}:${minutes.toString().padStart(2, "0")} elapsed`
}

const StatusDot = ({ status }: { status: string }) => {
  const map: Record<string, string> = {
    online: "bg-green-400",
    idle: "bg-yellow-400",
    dnd: "bg-red-400",
    offline: "bg-gray-400",
  }

  const color = map[status] || "bg-gray-500"

  return (
    <div className={`w-3 h-3 ${color} rounded-md`} />
  )
}

const DiscordDashboard: React.FC = () => {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [elapsed, setElapsed] = useState("")

  const fetchData = async () => {
    try {
      const res = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_USER_ID}`)
      const json = await res.json()
      setData(json.data)
    } catch (e) {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 10000)
    return () => clearInterval(interval)
  }, [])

  const activity: Activity | null = useMemo(() => {
    return data?.activities?.find((a: Activity) => a.type === 0) || null
  }, [data])

  const updateElapsed = useCallback(() => {
    if (activity?.timestamps?.start) {
      setElapsed(getElapsedTime(activity.timestamps.start))
    }
  }, [activity])

  useEffect(() => {
    if (!activity?.timestamps?.start) return
    updateElapsed()
    const interval = setInterval(updateElapsed, 60000)
    return () => clearInterval(interval)
  }, [activity, updateElapsed])

  if (loading) return <p className="text-sm text-gray-400 font-mono relative">Loading Discord status...</p>
  if (error || !data) return <p className="text-sm text-red-500 font-mono relative">Error loading Discord</p>

  const { discord_status } = data
  const largeImage =
    activity?.application_id && activity?.assets?.large_image
      ? `https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets.large_image}.png`
      : "/assets/Screenshot 2025-07-20 013936.png"

  return (
    <div className="w-[308px]  p-4 text-lg text-gray-300 font-mono relative ">
      {/* Top right Discord Icon */}
        <img
            src="assets/img/tech/discord-v2-svgrepo-com.svg"
            alt="Discord Icon"
            className="absolute top-3 right-3 w-6 h-6 opacity-60"
        />

      {/* Profile Section */}
      <div className="flex items-center gap-3">
        <img
          src="/assets/img/yoriichi-tsugikuni.jpg"
          alt="Avatar"
          className="h-14 w-14 rounded-full border border-gray-700"
        />
        <div>
          <p className="text-white font-bold">crus</p>
          <p className="text-gray-400 text-sm">@crusveder</p>
          
        </div>
      </div>

      {/* Status Dots */}
      <div className="flex items-center gap-2 ">
        <StatusDot status={discord_status} />
        <span className="text-xs text-gray-400 capitalize">{discord_status}</span>
        </div>

      {/* Activity Section */}
      <div className="bg-[#1a1a1acc]  rounded-md px-3 py-2 mt-4 flex gap-3 items-start">
        <img
          src={largeImage}
          alt="activity"
          className="h-10 w-10 rounded-md object-cover border border-gray-700"
        />
        <div>
          <p className="text-white font-bold">
            {activity?.name || "No status"}
          </p>
          <p className="text-gray-400">
            {activity?.details || "I'm probably sleeping..."}
            <br />
            {activity?.state || "No state"}
          </p>
          <p className="text-gray-300 text-xs mt-1">
            {elapsed || "∞:00 elapsed"}
          </p>
        </div>
      </div>
    </div>
  )
}

export default DiscordDashboard
