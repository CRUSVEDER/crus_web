// src/components/tool-kit/PingTimeCalculator.tsx
import React, { useState } from "react";
import ToolShell from "./toolshell";

const PingTimeCalculator = () => {
  const [distance, setDistance] = useState("");
  const [distanceUnit, setDistanceUnit] = useState("km");
  const [medium, setMedium] = useState("fiber");
  const [result, setResult] = useState("");

  const calculatePingTime = () => {
    const distanceValue = parseFloat(distance);
    
    if (isNaN(distanceValue) || distanceValue < 0) {
      setResult("Please enter a valid distance");
      return;
    }

    // Convert distance to km
    let distanceInKm = distanceValue;
    switch (distanceUnit) {
      case "m": distanceInKm = distanceValue / 1000; break;
      case "miles": distanceInKm = distanceValue * 1.60934; break;
    }

    // Speed of light in different media (km/s)
    const speeds = {
      fiber: 200000, // ~200,000 km/s in fiber optic
      copper: 200000, // ~200,000 km/s in copper
      wireless: 300000, // Speed of light in air
      satellite: 300000 // Speed of light in space
    };

    const speed = speeds[medium as keyof typeof speeds];
    const oneWayTime = (distanceInKm / speed) * 1000; // Convert to milliseconds
    const roundTripTime = oneWayTime * 2;

    setResult(
      `One-way latency: ${oneWayTime.toFixed(2)} ms\n` +
      `Round-trip time: ${roundTripTime.toFixed(2)} ms\n` +
      `Distance: ${distanceInKm.toFixed(2)} km\n` +
      `Medium: ${medium.charAt(0).toUpperCase() + medium.slice(1)} optic`
    );
  };

  return (
    <ToolShell title="Ping Time Calculator">
      <div className="space-y-4">
        <div className="flex gap-2 items-center">
          <input
            type="number"
            placeholder="Distance"
            className="px-2 py-1 rounded bg-gray-800 text-white w-32"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
          />
          <select
            value={distanceUnit}
            onChange={(e) => setDistanceUnit(e.target.value)}
            className="px-2 py-1 rounded bg-gray-800 text-white"
            aria-label="Select distance unit for ping calculation"
          >
            <option value="m">Meters</option>
            <option value="km">Kilometers</option>
            <option value="miles">Miles</option>
          </select>
        </div>

        <div className="flex gap-2 items-center">
          <span className="text-sm">Medium:</span>
          <select
            value={medium}
            onChange={(e) => setMedium(e.target.value)}
            className="px-2 py-1 rounded bg-gray-800 text-white"
            aria-label="Select medium for ping calculation"
          >
            <option value="fiber">Fiber Optic</option>
            <option value="copper">Copper Cable</option>
            <option value="wireless">Wireless</option>
            <option value="satellite">Satellite</option>
          </select>
        </div>

        <button
          onClick={calculatePingTime}
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

export default PingTimeCalculator;
