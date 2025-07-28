import React, { useState } from "react";
import ToolShell from "./toolshell";

const DownloadTimeEstimator = () => {
  const [fileSize, setFileSize] = useState("");
  const [fileSizeUnit, setFileSizeUnit] = useState("MB");
  const [speed, setSpeed] = useState("");
  const [speedUnit, setSpeedUnit] = useState("Mbps");
  const [result, setResult] = useState("");

  const calculateDownloadTime = () => {
    const size = parseFloat(fileSize);
    const speedValue = parseFloat(speed);
    
    if (isNaN(size) || isNaN(speedValue) || size <= 0 || speedValue <= 0) {
      setResult("Please enter valid file size and speed");
      return;
    }

    // Convert file size to bits
    let sizeInBits = size;
    switch (fileSizeUnit) {
      case "KB": sizeInBits = size * 8 * 1024; break;
      case "MB": sizeInBits = size * 8 * 1024 * 1024; break;
      case "GB": sizeInBits = size * 8 * 1024 * 1024 * 1024; break;
      case "TB": sizeInBits = size * 8 * 1024 * 1024 * 1024 * 1024; break;
      default: sizeInBits = size * 8; break;
    }

    // Convert speed to bits per second
    let speedInBps = speedValue;
    switch (speedUnit) {
      case "Kbps": speedInBps = speedValue * 1024; break;
      case "Mbps": speedInBps = speedValue * 1024 * 1024; break;
      case "Gbps": speedInBps = speedValue * 1024 * 1024 * 1024; break;
    }

    const timeInSeconds = sizeInBits / speedInBps;
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.floor(timeInSeconds % 60);

    setResult(
      `File Size: ${fileSize} ${fileSizeUnit}\n` +
      `Download Speed: ${speed} ${speedUnit}\n\n` +
      `Estimated Time: ${hours}h ${minutes}m ${seconds}s\n` +
      `Total Seconds: ${timeInSeconds.toFixed(2)}s\n\n` +
      `Note: Actual time may vary due to network conditions`
    );
  };

  return (
    <ToolShell title="Download Time Estimator">
      <div className="space-y-4">
        <div className="flex gap-2 items-center">
          <input
            type="number"
            placeholder="File size"
            className="px-2 py-1 rounded bg-gray-800 text-white w-32"
            value={fileSize}
            onChange={(e) => setFileSize(e.target.value)}
          />
          <select
            value={fileSizeUnit}
            onChange={(e) => setFileSizeUnit(e.target.value)}
            className="px-2 py-1 rounded bg-gray-800 text-white"
            aria-label="Select file size unit for download time estimation"
          >
            <option value="B">B</option>
            <option value="KB">KB</option>
            <option value="MB">MB</option>
            <option value="GB">GB</option>
            <option value="TB">TB</option>
          </select>
        </div>

        <div className="flex gap-2 items-center">
          <input
            type="number"
            placeholder="Speed"
            className="px-2 py-1 rounded bg-gray-800 text-white w-32"
            value={speed}
            onChange={(e) => setSpeed(e.target.value)}
          />
          <select
            value={speedUnit}
            onChange={(e) => setSpeedUnit(e.target.value)}
            className="px-2 py-1 rounded bg-gray-800 text-white"
            aria-label="Select speed unit for download time estimation"
          >
            <option value="bps">bps</option>
            <option value="Kbps">Kbps</option>
            <option value="Mbps">Mbps</option>
            <option value="Gbps">Gbps</option>
          </select>
        </div>

        <button
          onClick={calculateDownloadTime}
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

export default DownloadTimeEstimator; 