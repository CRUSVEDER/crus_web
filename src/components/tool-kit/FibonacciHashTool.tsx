// src/components/tool-kit/FibonacciHashTool.tsx
import React, { useState } from "react";
import ToolShell from "./toolshell";

const FibonacciHashTool = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const fibonacciHash = (str: string): number => {
    let hash = 0;
    const phi = 1.618033988749895; // Golden ratio
    
    for (let i = 0; i < str.length; i++) {
      const charCode = str.charCodeAt(i);
      hash = (hash * phi + charCode) % 2147483647; // 2^31 - 1
    }
    
    return Math.abs(hash);
  };

  const calculateHash = () => {
    const value = input.trim();
    
    if (!value) {
      setResult("Please enter a string");
      return;
    }

    const hash = fibonacciHash(value);
    const binary = hash.toString(2);
    const hex = hash.toString(16).toUpperCase();
    
    setResult(
      `Input: "${value}"\n` +
      `Fibonacci Hash: ${hash}\n` +
      `Binary: ${binary}\n` +
      `Hexadecimal: ${hex}\n` +
      `Hash (mod 256): ${hash % 256}\n` +
      `Hash (mod 1024): ${hash % 1024}\n\n` +
      `String length: ${value.length}\n` +
      `Binary length: ${binary.length} bits`
    );
  };

  const clearAll = () => {
    setInput("");
    setResult("");
  };

  return (
    <ToolShell title="Fibonacci Hash Tool">
      <div className="space-y-4">
        <div>
          <label className="block text-sm mb-2">Input String:</label>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full px-2 py-1 rounded bg-gray-800 text-white"
            placeholder="Enter string to hash..."
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={calculateHash}
            className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
          >
            Calculate Hash
          </button>
          <button
            onClick={clearAll}
            className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded"
          >
            Clear
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

export default FibonacciHashTool;
