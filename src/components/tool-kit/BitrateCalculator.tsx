import React, { useState } from "react";
import ToolShell from "./toolshell";

export default function BandwidthCalculator() {
  const [fileSize, setFileSize] = useState(100); // in MB
  const [speed, setSpeed] = useState(10); // in Mbps
  const [time, setTime] = useState<number | null>(null);

  const calculateTime = () => {
    const fileSizeMb = fileSize * 8; // convert MB to Mb
    const seconds = fileSizeMb / speed;
    setTime(seconds);
  };

  return (
    <ToolShell title="Bandwidth Calculator">
      <div className="flex flex-col gap-2 mb-4">
        <div className="flex gap-2">
          <input
            type="number"
            value={fileSize}
            onChange={(e) => setFileSize(Number(e.target.value))}
            className="px-2 py-1 rounded bg-gray-800 text-white w-24"
            placeholder="File MB"
          />
          <span className="text-gray-300 self-center">MB</span>
        </div>
        <div className="flex gap-2">
          <input
            type="number"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="px-2 py-1 rounded bg-gray-800 text-white w-24"
            placeholder="Speed Mbps"
          />
          <span className="text-gray-300 self-center">Mbps</span>
        </div>
        <button
          onClick={calculateTime}
          className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded"
        >
          Calculate
        </button>
      </div>
      {time !== null && (
        <p className="text-sm">
          Estimated download time: <b>{(time / 60).toFixed(2)} minutes</b> (
          {time.toFixed(1)} seconds)
        </p>
      )}
    </ToolShell>
  );
}
