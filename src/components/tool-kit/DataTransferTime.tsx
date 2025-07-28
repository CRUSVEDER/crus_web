// src/components/tool-kit/DataTransferTime.tsx
import React, { useState } from "react";
import ToolShell from "./toolshell";

const sizeUnits: Record<string, number> = {
  B: 1,
  KB: 1024,
  MB: 1024 ** 2,
  GB: 1024 ** 3,
  TB: 1024 ** 4
};
const bwUnits: Record<string, number> = {
  bps: 1,
  Kbps: 1e3,
  Mbps: 1e6,
  Gbps: 1e9
};

function format(sec: number) {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = Math.floor(sec % 60);
  return `${h ? h + "h " : ""}${m ? m + "m " : ""}${s}s`;
}

export default function DataTransferTime() {
  const [size, setSize] = useState(1);
  const [sizeU, setSizeU] = useState("GB");
  const [bw, setBw] = useState(100);
  const [bwU, setBwU] = useState("Mbps");
  const [overhead, setOverhead] = useState(10);
  const [seconds, setSeconds] = useState<number | null>(null);

  const calc = () => {
    const bytes = size * sizeUnits[sizeU];
    const bps = bw * bwUnits[bwU];
    const Bps = bps / 8;
    const eff = Bps * (1 - overhead / 100);
    setSeconds(bytes / eff);
  };

  return (
    <ToolShell title="Data Transfer Time Estimator">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3 text-sm">
        <div className="flex gap-2 items-center">
          <label className="sr-only" htmlFor="size">Size</label>
          <input id="size" type="number" value={size} onChange={e => setSize(Number(e.target.value))}
                 className="px-2 py-1 rounded bg-gray-800 text-white w-32" />
          <select  aria-label="Size Unit" value={sizeU} onChange={e => setSizeU(e.target.value)} className="bg-gray-800 text-white rounded px-2 py-1">
            {Object.keys(sizeUnits).map(u => <option key={u}>{u}</option>)}
          </select>
        </div>

        <div className="flex gap-2 items-center">
          <label className="sr-only" htmlFor="bw">Bandwidth</label>
          <input id="bw" type="number" value={bw} onChange={e => setBw(Number(e.target.value))}
                 className="px-2 py-1 rounded bg-gray-800 text-white w-32" />
          <select  aria-label="Size Unit" value={bwU} onChange={e => setBwU(e.target.value)} className="bg-gray-800 text-white rounded px-2 py-1">
          {Object.keys(bwUnits).map(u => <option key={u}>{u}</option>)}
          </select>
        </div>

        <div className="flex gap-2 items-center">
          <label className="sr-only" htmlFor="ovh">Overhead %</label>
          <input id="ovh" type="number" value={overhead} onChange={e => setOverhead(Number(e.target.value))}
                 className="px-2 py-1 rounded bg-gray-800 text-white w-24" />
          <span className="text-gray-400">% (TCP/IP etc.)</span>
        </div>

        <button onClick={calc} className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded self-start">
          Calculate
        </button>
      </div>

      {seconds !== null && <p className="text-sm">≈ {format(seconds)}</p>}
    </ToolShell>
  );
}
