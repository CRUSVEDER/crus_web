// src/components/tool-kit/MACLookup.tsx
import React, { useState } from "react";
import ToolShell from "./toolshell";

// tiny demo OUI table. For real use, plug a bigger OUI DB/API.
const OUI: Record<string, string> = {
  "00:1A:2B": "Acme Networks",
  "3C:5A:B4": "Cisco Systems",
  "F0:18:98": "Apple, Inc."
};

function normalize(mac: string) {
  return mac.trim().toUpperCase().replace(/-/g, ":").replace(/\s+/g, "");
}
function ouiFromMac(mac: string) {
  const nm = normalize(mac);
  const prefix = nm.split(":").slice(0, 3).join(":");
  return OUI[prefix] || "Unknown (need full OUI DB)";
}

export default function MACLookup() {
  const [mac, setMac] = useState("00:1A:2B:00:00:01");

  const vendor = ouiFromMac(mac);

  return (
    <ToolShell title="MAC Address Lookup (OUI)">
      <div className="flex gap-2 mb-3">
        <label htmlFor="mac" className="sr-only">MAC</label>
        <input
          id="mac"
          type="text"
          value={mac}
          onChange={e => setMac(e.target.value)}
          placeholder="00:1A:2B:xx:xx:xx"
          className="px-2 py-1 rounded bg-gray-800 text-white flex-1"
        />
      </div>
      <p className="text-sm">Vendor: <b>{vendor}</b></p>
      <p className="text-xs text-gray-400 mt-2">Note: demo DB only. Hook up a real OUI database/API for production.</p>
    </ToolShell>
  );
}
