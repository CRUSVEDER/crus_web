// src/components/tool-kit/RaidCalculator.tsx
import React, { useState } from "react";
import ToolShell from "./toolshell";

type Level = "RAID0" | "RAID1" | "RAID5" | "RAID6" | "RAID10";

export default function RaidCalculator() {
  const [level, setLevel] = useState<Level>("RAID5");
  const [disks, setDisks] = useState(4);
  const [sizeTB, setSizeTB] = useState(2); // size per disk in TB

  const calc = () => {
    switch (level) {
      case "RAID0": return disks * sizeTB;
      case "RAID1": return sizeTB; // mirror
      case "RAID5": return (disks - 1) * sizeTB;
      case "RAID6": return (disks - 2) * sizeTB;
      case "RAID10": return (disks / 2) * sizeTB;
      default: return 0;
    }
  };

  const capacity = calc();
  const usable = capacity > 0 ? capacity : 0;

  return (
    <ToolShell title="RAID Calculator">
      <div className="flex flex-col gap-2 mb-3 text-sm">
        <label className="flex items-center gap-2">
          <span className="w-28 text-gray-400">Level</span>
          <select value={level} onChange={e => setLevel(e.target.value as Level)} className="bg-gray-800 text-white px-2 py-1 rounded">
            <option>RAID0</option>
            <option>RAID1</option>
            <option>RAID5</option>
            <option>RAID6</option>
            <option>RAID10</option>
          </select>
        </label>

        <label className="flex items-center gap-2">
          <span className="w-28 text-gray-400">Disks</span>
          <input type="number" value={disks} onChange={e => setDisks(Number(e.target.value))}
                 className="bg-gray-800 text-white px-2 py-1 rounded w-24" />
        </label>

        <label className="flex items-center gap-2">
          <span className="w-28 text-gray-400">Size / Disk (TB)</span>
          <input type="number" value={sizeTB} onChange={e => setSizeTB(Number(e.target.value))}
                 className="bg-gray-800 text-white px-2 py-1 rounded w-24" />
        </label>
      </div>

      <div className="text-sm">
        <p><b>Usable Capacity:</b> {usable > 0 ? `${usable} TB` : "N/A or invalid for chosen parameters"}</p>
        <p className="text-gray-400 text-xs mt-1">
          RAID10 requires an even number of disks. RAID5 needs ≥3, RAID6 ≥4.
        </p>
      </div>
    </ToolShell>
  );
}
