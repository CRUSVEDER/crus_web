// src/components/tool-kit/StorageConversion.tsx
import React, { useState } from "react";
import ToolShell from "./toolshell";

const IEC = ["B","KiB","MiB","GiB","TiB","PiB"];
const SI  = ["B","KB","MB","GB","TB","PB"];

function toIEC(bytes: number) {
  let i = 0;
  while (bytes >= 1024 && i < IEC.length - 1) {
    bytes /= 1024;
    i++;
  }
  return `${bytes.toFixed(2)} ${IEC[i]}`;
}
function toSI(bytes: number) {
  let i = 0;
  while (bytes >= 1000 && i < SI.length - 1) {
    bytes /= 1000;
    i++;
  }
  return `${bytes.toFixed(2)} ${SI[i]}`;
}

export default function StorageConversion() {
  const [val, setVal] = useState(1024 ** 3); // 1 GiB
  return (
    <ToolShell title="Storage Conversion (SI vs IEC)">
      <label className="text-xs text-gray-400 mb-1 block">Bytes</label>
      <input
        type="number"
        value={val}
        onChange={e => setVal(Number(e.target.value))}
        className="bg-gray-800 text-white px-2 py-1 rounded mb-3 w-full"
        placeholder="Enter Size"
      />
      <div className="text-sm space-y-1">
        <div><b>IEC:</b> {toIEC(val)}</div>
        <div><b>SI:</b> {toSI(val)}</div>
      </div>
    </ToolShell>
  );
}
