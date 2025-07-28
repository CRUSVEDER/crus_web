import React, { useState } from "react";
import ToolShell from "./toolshell";

const IPAddressCalculator = () => {
  const [ip, setIp] = useState("");
  const [subnetMask, setSubnetMask] = useState("");
  const [result, setResult] = useState("");

  const calculateIPInfo = () => {
    const ipParts = ip.split(".").map(Number);
    const maskParts = subnetMask.split(".").map(Number);
    
    if (ipParts.length !== 4 || maskParts.length !== 4 || 
        ipParts.some(n => isNaN(n) || n < 0 || n > 255) ||
        maskParts.some(n => isNaN(n) || n < 0 || n > 255)) {
      setResult("Invalid IP address or subnet mask");
      return;
    }

    const ipNum = (ipParts[0] << 24) | (ipParts[1] << 16) | (ipParts[2] << 8) | ipParts[3];
    const maskNum = (maskParts[0] << 24) | (maskParts[1] << 16) | (maskParts[2] << 8) | maskParts[3];
    
    const networkAddr = ipNum & maskNum;
    const broadcastAddr = networkAddr | (~maskNum & 0xFFFFFFFF);
    const firstHost = networkAddr + 1;
    const lastHost = broadcastAddr - 1;
    
    const networkAddrStr = [
      (networkAddr >>> 24) & 255,
      (networkAddr >>> 16) & 255,
      (networkAddr >>> 8) & 255,
      networkAddr & 255
    ].join(".");
    
    const broadcastAddrStr = [
      (broadcastAddr >>> 24) & 255,
      (broadcastAddr >>> 16) & 255,
      (broadcastAddr >>> 8) & 255,
      broadcastAddr & 255
    ].join(".");
    
    const firstHostStr = [
      (firstHost >>> 24) & 255,
      (firstHost >>> 16) & 255,
      (firstHost >>> 8) & 255,
      firstHost & 255
    ].join(".");
    
    const lastHostStr = [
      (lastHost >>> 24) & 255,
      (lastHost >>> 16) & 255,
      (lastHost >>> 8) & 255,
      lastHost & 255
    ].join(".");

    setResult(`Network Address: ${networkAddrStr}\nBroadcast Address: ${broadcastAddrStr}\nFirst Host: ${firstHostStr}\nLast Host: ${lastHostStr}`);
  };

  return (
    <ToolShell title="IP Address Calculator">
      <div className="space-y-4">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="IP Address (e.g., 192.168.1.10)"
            className="px-2 py-1 rounded bg-gray-800 text-white flex-1"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Subnet Mask (e.g., 255.255.255.0)"
            className="px-2 py-1 rounded bg-gray-800 text-white flex-1"
            value={subnetMask}
            onChange={(e) => setSubnetMask(e.target.value)}
          />
        </div>

        <button
          onClick={calculateIPInfo}
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

export default IPAddressCalculator;
