// src/components/tool-kit/IPRangeCalculator.tsx
import React, { useState } from "react";
import ToolShell from "./toolshell";

function ipToInt(ip: string) {
  const p = ip.split(".").map(Number);
  if (p.length !== 4 || p.some(n => Number.isNaN(n) || n < 0 || n > 255)) throw new Error("Invalid IPv4");
  return ((p[0] << 24) | (p[1] << 16) | (p[2] << 8) | p[3]) >>> 0;
}
function intToIp(int: number) {
  return [(int >>> 24) & 255, (int >>> 16) & 255, (int >>> 8) & 255, int & 255].join(".");
}

export default function IPRangeCalculator() {
  const [start, setStart] = useState("192.168.1.10");
  const [end, setEnd] = useState("192.168.1.20");
  const [count, setCount] = useState<number | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const calc = () => {
    try {
      setErr(null);
      const a = ipToInt(start);
      const b = ipToInt(end);
      setCount(Math.abs(b - a) + 1);
    } catch (e:any) {
      setErr(e.message);
      setCount(null);
    }
  };

  return (
    <ToolShell title="IP Range Calculator (Start/End)">
      <div className="flex flex-col gap-2 mb-3">
        <input type="text" value={start} onChange={e => setStart(e.target.value)} className="bg-gray-800 text-white px-2 py-1 rounded" placeholder="Start IP"/>
        <input type="text" value={end} onChange={e => setEnd(e.target.value)} className="bg-gray-800 text-white px-2 py-1 rounded" placeholder="End IP"/>
      </div>
      <button onClick={calc} className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded">
        Calculate
      </button>

      {err && <p className="text-red-400 text-sm mt-2">{err}</p>}
      {count !== null && <p className="text-sm mt-2">Total addresses: <b>{count}</b></p>}
    </ToolShell>
  );
}
