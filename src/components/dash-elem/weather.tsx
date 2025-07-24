'use client'

import { useEffect, useState } from 'react'

const getWeatherEmoji = (code: number) => {
  if ([0, 1].includes(code)) return '☀️'       // Sunny
  if ([2, 3].includes(code)) return '☁️'       // Cloudy
  if ([61, 63, 65].includes(code)) return '🌧️' // Rain
  if ([71, 73, 75].includes(code)) return '❄️' // Snow
  return '🌥️'                                  // Default cloudy
}

const Weather = () => {
  const [temperature, setTemperature] = useState<number | null>(null)
  const [weatherCode, setWeatherCode] = useState<number | null>(null)

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=19.0760&longitude=72.8777&current_weather=true'
        )
        const data = await res.json()
        setTemperature(data.current_weather.temperature)
        setWeatherCode(data.current_weather.weathercode)
      } catch (err) {
        console.error('Failed to load weather data:', err)
      }
    }

    fetchWeather()
  }, [])

  return (
    <div className="flex flex-col items-center text-center">
      <div className="text-5xl mb-1">
        {weatherCode !== null ? getWeatherEmoji(weatherCode) : '⏳'}
      </div>
      <h2 className="text-2xl font-bold mt-1">
        {temperature !== null ? `${temperature}°C` : 'Loading...'}
      </h2>
      <p className="text-sm text-gray-400">Mumbai</p>
    </div>
  )
}

export default Weather
