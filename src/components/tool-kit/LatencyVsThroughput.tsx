// src/components/tool-kit/LatencyVsThroughput.tsx
import React, { useState } from "react";
import ToolShell from "./toolshell";

// Bandwidth-Delay Product helper: max throughput = window size / RTT
export default function LatencyVsThroughput() {
  const [rttMs, setRttMs] = useState(100);
  const [windowKB, setWindowKB] = useState(64); // TCP window
  const [bwMbps, setBwMbps] = useState<number | null>(null);

  const calc = () => {
    const bytes = windowKB * 1024;
    const seconds = rttMs / 1000;
    const bytesPerSec = bytes / seconds;
    const bitsPerSec = bytesPerSec * 8;
    setBwMbps(bitsPerSec / 1e6);
  };

  return (
    <ToolShell title="Latency vs Throughput (BDP)">
      <div className="flex flex-col gap-2 mb-3 text-sm">
        <label className="flex items-center gap-2">
          <span className="w-40 text-gray-400">RTT (ms)</span>
          <input type="number" value={rttMs} onChange={e => setRttMs(Number(e.target.value))}
                 className="bg-gray-800 text-white px-2 py-1 rounded w-28" />
        </label>

        <label className="flex items-center gap-2">
          <span className="w-40 text-gray-400">TCP Window (KB)</span>
          <input type="number" value={windowKB} onChange={e => setWindowKB(Number(e.target.value))}
                 className="bg-gray-800 text-white px-2 py-1 rounded w-28" />
        </label>

        <button onClick={calc} className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded w-fit">
          Calculate
        </button>
      </div>

      {bwMbps !== null && (
        <p className="text-sm">Max Throughput (theoretical): <b>{bwMbps.toFixed(2)} Mbps</b></p>
      )}
    </ToolShell>
  );
}
