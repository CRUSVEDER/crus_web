// src/components/tool-kit/UptimeCalculator.tsx
import React, { useState } from "react";
import ToolShell from "./toolshell";

const UptimeCalculator = () => {
  const [downtime, setDowntime] = useState("");
  const [timeUnit, setTimeUnit] = useState("minutes");
  const [period, setPeriod] = useState("month");
  const [result, setResult] = useState("");

  const calculateUptime = () => {
    const downtimeValue = parseFloat(downtime);
    
    if (isNaN(downtimeValue) || downtimeValue < 0) {
      setResult("Please enter a valid downtime value");
      return;
    }

    // Convert downtime to minutes
    let downtimeInMinutes = downtimeValue;
    switch (timeUnit) {
      case "seconds": downtimeInMinutes = downtimeValue / 60; break;
      case "hours": downtimeInMinutes = downtimeValue * 60; break;
      case "days": downtimeInMinutes = downtimeValue * 1440; break;
    }

    // Calculate total minutes in period
    let totalMinutesInPeriod = 0;
    switch (period) {
      case "day": totalMinutesInPeriod = 24 * 60; break;
      case "week": totalMinutesInPeriod = 7 * 24 * 60; break;
      case "month": totalMinutesInPeriod = 30 * 24 * 60; break;
      case "year": totalMinutesInPeriod = 365 * 24 * 60; break;
    }

    const uptimePercentage = ((totalMinutesInPeriod - downtimeInMinutes) / totalMinutesInPeriod) * 100;
    const downtimePercentage = (downtimeInMinutes / totalMinutesInPeriod) * 100;

    setResult(
      `Uptime: ${uptimePercentage.toFixed(4)}%\nDowntime: ${downtimePercentage.toFixed(4)}%\n` +
      `Total downtime: ${downtimeInMinutes.toFixed(2)} minutes\n` +
      `Availability: ${uptimePercentage >= 99.9 ? "Excellent" : uptimePercentage >= 99 ? "Good" : uptimePercentage >= 95 ? "Fair" : "Poor"}`
    );
  };

  return (
    <ToolShell title="Uptime Calculator">
      <div className="space-y-4">
        <div className="flex gap-2 items-center">
          <input
            type="number"
            placeholder="Downtime"
            className="px-2 py-1 rounded bg-gray-800 text-white w-32"
            value={downtime}
            onChange={(e) => setDowntime(e.target.value)}
          />
          <select
            value={timeUnit}
            onChange={(e) => setTimeUnit(e.target.value)}
            className="px-2 py-1 rounded bg-gray-800 text-white"
            aria-label="Select time unit for downtime"
          >
            <option value="seconds">Seconds</option>
            <option value="minutes">Minutes</option>
            <option value="hours">Hours</option>
            <option value="days">Days</option>
          </select>
        </div>

        <div className="flex gap-2 items-center">
          <span className="text-sm">Per:</span>
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="px-2 py-1 rounded bg-gray-800 text-white"
            aria-label="Select period for uptime calculation"
          >
            <option value="day">Day</option>
            <option value="week">Week</option>
            <option value="month">Month</option>
            <option value="year">Year</option>
          </select>
        </div>

        <button
          onClick={calculateUptime}
          className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
        >
          Calculate
        </button>

        {result && (
          <pre className="mt-4 text-green-400 whitespace-pre-wrap text-sm">
            {result}
          </pre>
        )}
      </div>
    </ToolShell>
  );
};

export default UptimeCalculator;
