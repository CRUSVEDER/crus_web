// src/components/tool-kit/UnixTimestampConverter.tsx
import React, { useState } from "react";
import ToolShell from "./toolshell";

const UnixTimestampConverter = () => {
  const [input, setInput] = useState("");
  const [inputType, setInputType] = useState("timestamp");
  const [result, setResult] = useState("");

  const convert = () => {
    const value = input.trim();
    
    if (!value) {
      setResult("Please enter a value");
      return;
    }

    try {
      let timestamp: number;
      let date: Date;

      if (inputType === "timestamp") {
        // Convert timestamp to date
        timestamp = parseInt(value);
        if (isNaN(timestamp)) {
          setResult("Invalid timestamp");
          return;
        }
        
        // Handle milliseconds vs seconds
        if (timestamp > 1000000000000) {
          date = new Date(timestamp);
        } else {
          date = new Date(timestamp * 1000);
        }
      } else {
        // Convert date to timestamp
        date = new Date(value);
        if (isNaN(date.getTime())) {
          setResult("Invalid date format");
          return;
        }
        timestamp = Math.floor(date.getTime() / 1000);
      }

      const utcString = date.toUTCString();
      const localString = date.toString();
      const isoString = date.toISOString();
      const milliseconds = date.getTime();

      setResult(
        `Unix Timestamp (seconds): ${Math.floor(milliseconds / 1000)}\n` +
        `Unix Timestamp (milliseconds): ${milliseconds}\n\n` +
        `UTC: ${utcString}\n` +
        `Local: ${localString}\n` +
        `ISO: ${isoString}\n\n` +
        `Year: ${date.getFullYear()}\n` +
        `Month: ${date.getMonth() + 1}\n` +
        `Day: ${date.getDate()}\n` +
        `Hour: ${date.getHours()}\n` +
        `Minute: ${date.getMinutes()}\n` +
        `Second: ${date.getSeconds()}`
      );
    } catch (error) {
      setResult("Conversion error");
    }
  };

  const setCurrentTime = () => {
    const now = new Date();
    setInput(Math.floor(now.getTime() / 1000).toString());
    setInputType("timestamp");
  };

  const clearAll = () => {
    setInput("");
    setResult("");
  };

  return (
    <ToolShell title="Unix Timestamp Converter">
      <div className="space-y-4">
        <div className="flex gap-2 items-center">
          <span className="text-sm">Input Type:</span>
          <select
            value={inputType}
            onChange={(e) => setInputType(e.target.value)}
            className="px-2 py-1 rounded bg-gray-800 text-white"
            aria-label="Select input type for conversion"
          >
            <option value="timestamp">Unix Timestamp</option>
            <option value="date">Date String</option>
          </select>
        </div>

        <div>
          <label className="block text-sm mb-2">
            {inputType === "timestamp" ? "Unix Timestamp:" : "Date String:"}
          </label>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full px-2 py-1 rounded bg-gray-800 text-white"
            placeholder={
              inputType === "timestamp" 
                ? "Enter timestamp (e.g., 1640995200)" 
                : "Enter date (e.g., 2022-01-01T00:00:00Z)"
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
            onClick={setCurrentTime}
            className="bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded"
          >
            Now
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

export default UnixTimestampConverter;
