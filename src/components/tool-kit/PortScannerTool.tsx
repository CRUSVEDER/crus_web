// src/components/tool-kit/PortScannerTool.tsx
import React, { useState } from "react";
import ToolShell from "./toolshell";

export default function PortScannerTool() {
  const [host, setHost] = useState("192.168.1.1");
  const [start, setStart] = useState(1);
  const [end, setEnd] = useState(1024);
  const nmap = `nmap -p ${start}-${end} ${host}`;

  return (
    <ToolShell title="Port Scanner Tool (Command Generator)">
      <div className="flex flex-col gap-2 text-sm mb-3">
        <label className="flex items-center gap-2">
          <span className="w-20 text-gray-400">Host</span>
          <input type="text" value={host} onChange={e => setHost(e.target.value)}
                 className="bg-gray-800 text-white px-2 py-1 rounded flex-1" />
        </label>
        <label className="flex items-center gap-2">
          <span className="w-20 text-gray-400">Start</span>
          <input type="number" value={start} onChange={e => setStart(Number(e.target.value))}
                 className="bg-gray-800 text-white px-2 py-1 rounded w-28" />
        </label>
        <label className="flex items-center gap-2">
          <span className="w-20 text-gray-400">End</span>
          <input type="number" value={end} onChange={e => setEnd(Number(e.target.value))}
                 className="bg-gray-800 text-white px-2 py-1 rounded w-28" />
        </label>
      </div>

      <p className="text-xs text-gray-400 mb-1">Run this on your shell:</p>
      <code className="text-xs break-words">{nmap}</code>
      <p className="text-xs text-gray-500 mt-2">
        Browsers can’t perform raw TCP scans safely. This tool generates commands for you.
      </p>
    </ToolShell>
  );
}
