// src/components/tool-kit/NetworkAddressCalculator.tsx
import React, { useState } from "react";
import ToolShell from "./toolshell";

const NetworkAddressCalculator = () => {
  const [ip, setIp] = useState("");
  const [cidr, setCidr] = useState(24);
  const [result, setResult] = useState("");

  const calculateNetworkInfo = () => {
    const ipParts = ip.split(".").map(Number);
    
    if (ipParts.length !== 4 || ipParts.some(n => isNaN(n) || n < 0 || n > 255)) {
      setResult("Invalid IP address");
      return;
    }

    if (cidr < 0 || cidr > 32) {
      setResult("Invalid CIDR (must be 0-32)");
      return;
    }

    const ipNum = (ipParts[0] << 24) | (ipParts[1] << 16) | (ipParts[2] << 8) | ipParts[3];
    const mask = 0xffffffff << (32 - cidr);
    const networkAddr = ipNum & mask;
    const broadcastAddr = networkAddr | (~mask & 0xffffffff);
    const firstHost = networkAddr + 1;
    const lastHost = broadcastAddr - 1;
    const totalHosts = Math.pow(2, 32 - cidr) - 2;

    const formatIP = (num: number) => {
      return [
        (num >>> 24) & 255,
        (num >>> 16) & 255,
        (num >>> 8) & 255,
        num & 255
      ].join(".");
    };

    const subnetMask = formatIP(mask);
    const networkAddress = formatIP(networkAddr);
    const broadcastAddress = formatIP(broadcastAddr);
    const firstHostAddress = formatIP(firstHost);
    const lastHostAddress = formatIP(lastHost);

    setResult(
      `Network Address: ${networkAddress}\n` +
      `Broadcast Address: ${broadcastAddress}\n` +
      `First Host: ${firstHostAddress}\n` +
      `Last Host: ${lastHostAddress}\n` +
      `Subnet Mask: ${subnetMask}\n` +
      `CIDR: /${cidr}\n` +
      `Total Hosts: ${totalHosts}`
    );
  };

  return (
    <ToolShell title="Network Address Calculator">
      <div className="space-y-4">
        <div className="flex gap-2 items-center">
          <input
            type="text"
            placeholder="IP Address (e.g., 192.168.1.10)"
            className="px-2 py-1 rounded bg-gray-800 text-white flex-1"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2 items-center">
          <span className="text-sm">CIDR:</span>
          <input
            type="number"
            min="0"
            max="32"
            value={cidr}
            onChange={(e) => setCidr(Number(e.target.value))}
            className="px-2 py-1 rounded bg-gray-800 text-white w-16"
            aria-label="CIDR notation for subnet mask"
          />
        </div>

        <button
          onClick={calculateNetworkInfo}
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

export default NetworkAddressCalculator;
