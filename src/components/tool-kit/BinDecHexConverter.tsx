import React, { useState } from "react";
import ToolShell from "./toolshell";

const BinDecHexConverter = () => {
  const [input, setInput] = useState("");
  const [inputBase, setInputBase] = useState("decimal");
  const [result, setResult] = useState("");

  const convert = () => {
    const value = input.trim();
    
    if (!value) {
      setResult("Please enter a value");
      return;
    }

    try {
      let decimal: number;
      
      // Parse input based on base
      switch (inputBase) {
        case "binary":
          if (!/^[01]+$/.test(value)) {
            setResult("Invalid binary number");
            return;
          }
          decimal = parseInt(value, 2);
          break;
        case "decimal":
          if (!/^\d+$/.test(value)) {
            setResult("Invalid decimal number");
            return;
          }
          decimal = parseInt(value, 10);
          break;
        case "hexadecimal":
          if (!/^[0-9A-Fa-f]+$/.test(value)) {
            setResult("Invalid hexadecimal number");
            return;
          }
          decimal = parseInt(value, 16);
          break;
        default:
          setResult("Invalid input base");
          return;
      }

      if (isNaN(decimal)) {
        setResult("Conversion failed");
        return;
      }

      const binary = decimal.toString(2);
      const hex = decimal.toString(16).toUpperCase();
      const octal = decimal.toString(8);

      setResult(
        `Decimal: ${decimal}\n` +
        `Binary: ${binary}\n` +
        `Hexadecimal: ${hex}\n` +
        `Octal: ${octal}\n\n` +
        `Binary (8-bit): ${binary.padStart(8, '0')}\n` +
        `Binary (16-bit): ${binary.padStart(16, '0')}\n` +
        `Binary (32-bit): ${binary.padStart(32, '0')}`
      );
    } catch (error) {
      setResult("Conversion error");
    }
  };

  const clearAll = () => {
    setInput("");
    setResult("");
  };

  return (
    <ToolShell title="Binary/Decimal/Hexadecimal Converter">
      <div className="space-y-4">
        <div className="flex gap-2 items-center">
          <span className="text-sm">Input Base:</span>
          <select
            value={inputBase}
            onChange={(e) => setInputBase(e.target.value)}
            className="px-2 py-1 rounded bg-gray-800 text-white"
            aria-label="Select input base for conversion"
          >
            <option value="decimal">Decimal</option>
            <option value="binary">Binary</option>
            <option value="hexadecimal">Hexadecimal</option>
          </select>
        </div>

        <div>
          <label className="block text-sm mb-2">Value:</label>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full px-2 py-1 rounded bg-gray-800 text-white"
            placeholder={
              inputBase === "binary" ? "Enter binary (e.g., 1010)" :
              inputBase === "hexadecimal" ? "Enter hex (e.g., 1A)" :
              "Enter decimal (e.g., 42)"
            }
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={convert}
            className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
          >
            Convert
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

export default BinDecHexConverter;
