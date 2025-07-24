'use client'

import React, { useEffect, useState } from 'react'

type Activity = {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

const getColor = (level: number) => {
  const colors = ['#2e2e2e', '#9e9d8d', '#d9cbb1', '#f2e5c0', '#fff5d6'] // GitHub dark theme
  return colors[level]
}

const GithubCalendar: React.FC<{ username: string }> = ({ username }) => {
  const [data, setData] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`)
        const json = await res.json()
        if (!res.ok) throw new Error(json.error || 'Failed to load contributions')
        setData(json.contributions)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [username])

  if (loading) return <div className="text-sm text-gray-400 font-mono relative">Loading contributions...</div>
  if (error) return <div className="text-sm text-red-500 font-mono relative">Error: {error}</div>

  // Limit to recent ~133 days (~19 weeks of 7 days)
  const today = new Date()
  const recent = data.filter(({ date }) => {
    const d = new Date(date)
    return d >= new Date(today.getTime() - 133 * 24 * 60 * 60 * 1000)
  })

  // Fill to exactly 133 cells
  const cells = Array(19 * 7).fill(null)
  recent.forEach((a, i) => {
    cells[i] = a
  })

  // Extract unique month labels across weeks
const monthLabels: string[] = []
let lastMonth: number | null = null

for (let week = 0; week < 19; week++) {
  const index = week * 7
  const entry = cells[index]
  if (entry) {
    const date = new Date(entry.date)
    const monthNum = date.getMonth()
    if (monthNum !== lastMonth) {
      lastMonth = monthNum
      const month = date.toLocaleString('default', { month: 'short' })
      monthLabels.push(month)
    } else {
      monthLabels.push('')
    }
  } else {
    monthLabels.push('')
  }
}

  return (
    <div className="w-full flex flex-col gap-2">
      <p className="text-[23px] text-white font-mono relative">GitHub Activity</p>

      {/* Month labels row */}
      <div
        className="grid text-sm text-gray-400"
        style={{
          gridTemplateColumns: `repeat(19, 1fr)`,
          marginBottom: '4px',
        }}
      >
        {monthLabels.map((label, i) => (
          <div key={i} className="text-center">{label}</div>
        ))}
      </div>

      {/* Contribution blocks */}
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(19, 1fr)`,
          gap: '4px',
          alignItems: 'center',
          justifyItems: 'center',
        }}
      >
        {cells.map((activity, idx) => (
          <div
            key={idx}
            title={
              activity
                ? `${activity.date} — ${activity.count} commits`
                : 'No data'
            }
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '2px',
              backgroundColor: activity ? getColor(activity.level) : '#161b22',
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default GithubCalendar
