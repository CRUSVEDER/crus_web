// src/components/tool-kit/IPv4ToIPv6Converter.tsx
import React, { useState } from "react";
import ToolShell from "./toolshell";

const IPv4ToIPv6Converter = () => {
  const [ipv4, setIpv4] = useState("");
  const [result, setResult] = useState("");

  const convertIPv4ToIPv6 = () => {
    const ipv4Parts = ipv4.split(".").map(Number);
    
    if (ipv4Parts.length !== 4 || ipv4Parts.some(n => isNaN(n) || n < 0 || n > 255)) {
      setResult("Invalid IPv4 address");
      return;
    }

    // Convert to hex
    const hexParts = ipv4Parts.map(part => part.toString(16).padStart(2, '0'));
    const ipv6Embedded = `2002:${hexParts[0]}${hexParts[1]}:${hexParts[2]}${hexParts[3]}::1`;
    const ipv6Mapped = `::ffff:${ipv4Parts[0]}.${ipv4Parts[1]}.${ipv4Parts[2]}.${ipv4Parts[3]}`;
    const ipv6Compatible = `::${ipv4Parts[0]}.${ipv4Parts[1]}.${ipv4Parts[2]}.${ipv4Parts[3]}`;

    setResult(
      `IPv4: ${ipv4}\n\n` +
      `IPv6 Embedded (6to4): ${ipv6Embedded}\n` +
      `IPv6 Mapped: ${ipv6Mapped}\n` +
      `IPv6 Compatible: ${ipv6Compatible}\n\n` +
      `Hex representation: ${hexParts.join(":")}`
    );
  };

  const convertIPv6ToIPv4 = () => {
    // This would be a more complex implementation for IPv6 to IPv4
    setResult("IPv6 to IPv4 conversion not implemented yet");
  };

  return (
    <ToolShell title="IPv4 to IPv6 Converter">
      <div className="space-y-4">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="IPv4 Address (e.g., 192.168.1.1)"
            className="px-2 py-1 rounded bg-gray-800 text-white flex-1"
            value={ipv4}
            onChange={(e) => setIpv4(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={convertIPv4ToIPv6}
            className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
          >
            Convert to IPv6
          </button>
          <button
            onClick={convertIPv6ToIPv4}
            className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
          >
            Convert to IPv4
          </button>
        </div>

        {result && (
          <pre className="mt-4 text-green-400 whitespace-pre-wrap text-sm">
            {result}
          </pre>
        )}
      </div>
    </ToolShell>
  );
};

export default IPv4ToIPv6Converter;
