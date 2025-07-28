// src/components/tool-kit/FileSizeEstimator.tsx
import React, { useState } from "react";
import ToolShell from "./toolshell";

export default function FileSizeEstimator() {
  const [sampleRate, setSampleRate] = useState(44100);
  const [bitDepth, setBitDepth] = useState(16);
  const [channels, setChannels] = useState(2);
  const [duration, setDuration] = useState(180);
  const [bytes, setBytes] = useState<number | null>(null);

  const calc = () => {
    const bits = sampleRate * bitDepth * channels * duration;
    setBytes(bits / 8);
  };

  return (
    <ToolShell title="File Size Estimator (PCM Audio)">
      <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
        <Num label="Sample Rate (Hz)" value={sampleRate} setValue={setSampleRate} />
        <Num label="Bit Depth" value={bitDepth} setValue={setBitDepth} />
        <Num label="Channels" value={channels} setValue={setChannels} />
        <Num label="Duration (sec)" value={duration} setValue={setDuration} />
      </div>
      <button onClick={calc} className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded mb-3">
        Calculate
      </button>
      {bytes !== null && (
        <div className="text-sm">
          <p>Bytes: {bytes.toLocaleString()}</p>
          <p>MB: {(bytes / (1024 ** 2)).toFixed(2)}</p>
        </div>
      )}
    </ToolShell>
  );
}

function Num({ label, value, setValue }: { label: string; value: number; setValue: (n:number)=>void }) {
  const id = label.replace(/\s+/g, "-").toLowerCase();
  return (
    <label htmlFor={id} className="flex flex-col">
      <span className="text-gray-400 text-xs mb-1">{label}</span>
      <input
        id={id}
        type="number"
        value={value}
        onChange={e => setValue(Number(e.target.value))}
        className="px-2 py-1 rounded bg-gray-800 text-white"
      />
    </label>
  );
}
