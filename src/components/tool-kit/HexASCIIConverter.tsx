// src/components/tool-kit/HexASCIIConverter.tsx
import React, { useState } from "react";
import ToolShell from "./toolshell";

const HexASCIIConverter = () => {
  const [input, setInput] = useState("");
  const [inputType, setInputType] = useState("hex");
  const [result, setResult] = useState("");

  const convert = () => {
    const value = input.trim();
    
    if (!value) {
      setResult("Please enter a value");
      return;
    }

    try {
      if (inputType === "hex") {
        // Convert hex to ASCII
        if (!/^[0-9A-Fa-f\s]+$/.test(value)) {
          setResult("Invalid hexadecimal string");
          return;
        }
        
        const hexString = value.replace(/\s/g, '');
        if (hexString.length % 2 !== 0) {
          setResult("Hex string must have even number of characters");
          return;
        }
        
        let ascii = "";
        for (let i = 0; i < hexString.length; i += 2) {
          const charCode = parseInt(hexString.substr(i, 2), 16);
          if (charCode >= 32 && charCode <= 126) {
            ascii += String.fromCharCode(charCode);
          } else {
            ascii += `\\x${hexString.substr(i, 2)}`;
          }
        }
        
        setResult(
          `Hex: ${value}\n` +
          `ASCII: ${ascii}\n\n` +
          `Raw bytes: ${hexString.match(/.{1,2}/g)?.join(' ')}`
        );
      } else {
        // Convert ASCII to hex
        let hex = "";
        for (let i = 0; i < value.length; i++) {
          const charCode = value.charCodeAt(i);
          hex += charCode.toString(16).padStart(2, '0');
        }
        
        setResult(
          `ASCII: ${value}\n` +
          `Hex: ${hex}\n` +
          `Hex (spaced): ${hex.match(/.{1,2}/g)?.join(' ')}\n\n` +
          `Length: ${value.length} characters`
        );
      }
    } catch (error) {
      setResult("Conversion error");
    }
  };

  const clearAll = () => {
    setInput("");
    setResult("");
  };

  return (
    <ToolShell title="Hex to ASCII Converter">
      <div className="space-y-4">
        <div className="flex gap-2 items-center">
          <span className="text-sm">Input Type:</span>
          <select
            value={inputType}
            onChange={(e) => setInputType(e.target.value)}
            className="px-2 py-1 rounded bg-gray-800 text-white"
            aria-label="Select input type for conversion"
          >
            <option value="hex">Hexadecimal</option>
            <option value="ascii">ASCII</option>
          </select>
        </div>

        <div>
          <label className="block text-sm mb-2">
            {inputType === "hex" ? "Hexadecimal String:" : "ASCII String:"}
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-32 px-2 py-1 rounded bg-gray-800 text-white resize-none"
            placeholder={
              inputType === "hex" 
                ? "Enter hex string (e.g., 48656C6C6F)" 
                : "Enter ASCII text (e.g., Hello)"
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

export default HexASCIIConverter;
