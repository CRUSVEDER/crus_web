import { useState } from "react";
import ToolShell from "./toolshell";

const SubnetCalculator = () => {
  const [ip, setIp] = useState("");
  const [cidr, setCidr] = useState(24);
  const [network, setNetwork] = useState("");

  const calculate = () => {
    const [a, b, c, d] = ip.split(".").map(Number);
    if ([a, b, c, d].some((n) => isNaN(n))) return setNetwork("Invalid IP");
    const mask = 0xffffffff << (32 - cidr);
    const ipNum = (a << 24) | (b << 16) | (c << 8) | d;
    const net = ipNum & mask;
    setNetwork(
      `${(net >>> 24) & 255}.${(net >>> 16) & 255}.${(net >>> 8) & 255}.${net & 255}/${cidr}`
    );
  };

  return (
    <ToolShell title="Subnet Calculator">
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter IP (e.g., 192.168.1.10)"
          className="px-2 py-1 rounded bg-gray-800 text-white w-full"
          value={ip}
          onChange={(e) => setIp(e.target.value)}
        />
        
        <input
          type="number"
          value={cidr}
          onChange={(e) => setCidr(Number(e.target.value))}
          className="px-2 py-1 rounded bg-gray-800 text-white w-16"
          aria-label="CIDR value"
        />
        <button
          onClick={calculate}
          className="bg-gray-300 hover:bg-gray-400 px-3 py-1 rounded"
        >
          Calc
        </button>
      </div>
      {network && <p className="mt-2">Network: {network}</p>}
    </ToolShell>
  );
};

export default SubnetCalculator;
