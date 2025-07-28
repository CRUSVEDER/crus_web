// src/components/tool-kit/WildcardMaskTool.tsx
import React, { useState } from "react";
import ToolShell from "./toolshell";

const WildcardMaskTool = () => {
  const [subnetMask, setSubnetMask] = useState("");
  const [result, setResult] = useState("");

  const calculateWildcardMask = () => {
    const maskParts = subnetMask.split(".").map(Number);
    
    if (maskParts.length !== 4 || maskParts.some(n => isNaN(n) || n < 0 || n > 255)) {
      setResult("Invalid subnet mask");
      return;
    }

    // Calculate wildcard mask (inverse of subnet mask)
    const wildcardParts = maskParts.map(part => 255 - part);
    const wildcardMask = wildcardParts.join(".");

    // Calculate CIDR notation
    const binaryMask = maskParts.map(part => part.toString(2).padStart(8, '0')).join('');
    const cidr = binaryMask.split('1').length - 1;

    setResult(
      `Subnet Mask: ${subnetMask}\n` +
      `Wildcard Mask: ${wildcardMask}\n` +
      `CIDR: /${cidr}\n\n` +
      `Binary Subnet: ${maskParts.map(p => p.toString(2).padStart(8, '0')).join('.')}\n` +
      `Binary Wildcard: ${wildcardParts.map(p => p.toString(2).padStart(8, '0')).join('.')}`
    );
  };

  const calculateSubnetFromWildcard = () => {
    const wildcardParts: number[] = subnetMask.split(".").map(Number);
    
    if (wildcardParts.length !== 4 || wildcardParts.some((n: number) => isNaN(n) || n < 0 || n > 255)) {
      setResult("Invalid wildcard mask");
      return;
    }

    // Calculate subnet mask from wildcard
    const subnetParts: number[] = wildcardParts.map((part: number) => 255 - part);
    const calculatedSubnetMask = subnetParts.join(".");

    // Calculate CIDR notation
    const binaryMask = subnetParts.map((part: number) => part.toString(2).padStart(8, '0')).join('');
    const cidr = binaryMask.split('1').length - 1;

    setResult(
      `Wildcard Mask: ${subnetMask}\n` +
      `Subnet Mask: ${calculatedSubnetMask}\n` +
      `CIDR: /${cidr}\n\n` +
      `Binary Wildcard: ${wildcardParts.map((p: number) => p.toString(2).padStart(8, '0')).join('.')}\n` +
      `Binary Subnet: ${subnetParts.map((p: number) => p.toString(2).padStart(8, '0')).join('.')}`
    );
  };

  return (
    <ToolShell title="Wildcard Mask Tool">
      <div className="space-y-4">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Subnet Mask (e.g., 255.255.255.0)"
            className="px-2 py-1 rounded bg-gray-800 text-white flex-1"
            value={subnetMask}
            onChange={(e) => setSubnetMask(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={calculateWildcardMask}
            className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
          >
            Subnet → Wildcard
          </button>
          <button
            onClick={calculateSubnetFromWildcard}
            className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
          >
            Wildcard → Subnet
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

export default WildcardMaskTool;
