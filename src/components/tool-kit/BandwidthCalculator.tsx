// src/components/tool-kit/BandwidthCalculator.tsx
import React, { useState } from "react";
import ToolShell from "./toolshell";

export default function BandwidthCalculator() {
  const [size, setSize] = useState(100); // MB
  const [speed, setSpeed] = useState(10); // Mbps
  const [seconds, setSeconds] = useState<number | null>(null);

  const calc = () => {
    const bits = size * 8 * 1024 * 1024; // MB -> bytes -> bits
    const bps = speed * 1e6;
    setSeconds(bits / bps);
  };

  return (
    <ToolShell title="Bandwidth Calculator" description="Estimate time to download a file based on size and link speed.">
      <div className="flex flex-col sm:flex-row gap-2 mb-3">
        <div className="flex items-center gap-2">
          <label htmlFor="size" className="sr-only">Size (MB)</label>
          <input
            id="size"
            type="number"
            value={size}
            onChange={e => setSize(Number(e.target.value))}
            className="px-2 py-1 rounded bg-gray-800 text-white w-28"
            placeholder="Size MB"
          />
          <span className="text-gray-400 text-sm">MB</span>
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="speed" className="sr-only">Speed (Mbps)</label>
          <input
            id="speed"
            type="number"
            value={speed}
            onChange={e => setSpeed(Number(e.target.value))}
            className="px-2 py-1 rounded bg-gray-800 text-white w-28"
            placeholder="Speed Mbps"
          />
          <span className="text-gray-400 text-sm">Mbps</span>
        </div>
        <button onClick={calc} className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded">
          Calculate
        </button>
      </div>

      {seconds !== null && (
        <div className="text-sm">
          <p>Seconds: <b>{seconds.toFixed(2)}</b></p>
          <p>Minutes: <b>{(seconds / 60).toFixed(2)}</b></p>
          <p>Hours: <b>{(seconds / 3600).toFixed(2)}</b></p>
        </div>
      )}
    </ToolShell>
  );
}
