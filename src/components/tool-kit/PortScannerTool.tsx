import React, { useState } from "react";
import ToolShell from "./toolshell";

export default function PortScannerTool() {
  const [host, setHost] = useState("192.168.1.1");
  const [start, setStart] = useState(1);
  const [end, setEnd] = useState(1024);

  // Flags
  const [useSC, setUseSC] = useState(true); // -sC
  const [useSV, setUseSV] = useState(true); // -sV
  const [useOS, setUseOS] = useState(false); // -O
  const [usePn, setUsePn] = useState(false); // -Pn
  const [useAggressive, setUseAggressive] = useState(false); // -A

  const [timing, setTiming] = useState("4"); // -T4 default
  const [outputFormat, setOutputFormat] = useState(""); // -oN, -oX, -oG, -oA
  const [outputFile, setOutputFile] = useState("scan_result"); // Output file name

  const flags = [
    `-p ${start}-${end}`,
    useSC ? "-sC" : "",
    useSV ? "-sV" : "",
    useOS ? "-O" : "",
    usePn ? "-Pn" : "",
    useAggressive ? "-A" : "",
    `-T${timing}`,
    outputFormat === "normal" ? `-oN ${outputFile}.txt` : "",
    outputFormat === "xml" ? `-oX ${outputFile}.xml` : "",
    outputFormat === "grepable" ? `-oG ${outputFile}.grep` : "",
    outputFormat === "all" ? `-oA ${outputFile}` : "",
  ]
    .filter(Boolean)
    .join(" ");

  const nmapCommand = `nmap ${flags} ${host}`;

  return (
    <ToolShell title="Port Scanner Tool (Command Generator)">
      <div className="flex flex-col gap-2 text-sm mb-3">
        {/* IP and Port Input */}
        <label className="flex items-center gap-2">
          <span className="w-28 text-gray-400">Host</span>
          <input
            type="text"
            value={host}
            onChange={(e) => setHost(e.target.value)}
            className="bg-gray-800 text-white px-2 py-1 rounded flex-1"
          />
        </label>
        <label className="flex items-center gap-2">
          <span className="w-28 text-gray-400">Start Port</span>
          <input
            type="number"
            value={start}
            onChange={(e) => setStart(Number(e.target.value))}
            className="bg-gray-800 text-white px-2 py-1 rounded w-28"
          />
        </label>
        <label className="flex items-center gap-2">
          <span className="w-28 text-gray-400">End Port</span>
          <input
            type="number"
            value={end}
            onChange={(e) => setEnd(Number(e.target.value))}
            className="bg-gray-800 text-white px-2 py-1 rounded w-28"
          />
        </label>

        {/* Scan Options */}
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={useSC} onChange={e => setUseSC(e.target.checked)} />
          <span className="text-gray-300">Use default scripts (-sC)</span>
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={useSV} onChange={e => setUseSV(e.target.checked)} />
          <span className="text-gray-300">Service/version detection (-sV)</span>
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={useOS} onChange={e => setUseOS(e.target.checked)} />
          <span className="text-gray-300">OS detection (-O)</span>
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={usePn} onChange={e => setUsePn(e.target.checked)} />
          <span className="text-gray-300">Skip ping (-Pn)</span>
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={useAggressive} onChange={e => setUseAggressive(e.target.checked)} />
          <span className="text-gray-300">Aggressive scan (-A)</span>
        </label>

        {/* Timing */}
        <label className="flex items-center gap-2">
          <span className="w-28 text-gray-400">Timing (-T)</span>
          <select
            value={timing}
            onChange={e => setTiming(e.target.value)}
            className="bg-gray-800 text-white px-2 py-1 rounded"
          >
            <option value="0">0 (Paranoid)</option>
            <option value="1">1 (Sneaky)</option>
            <option value="2">2 (Polite)</option>
            <option value="3">3 (Normal)</option>
            <option value="4">4 (Aggressive)</option>
            <option value="5">5 (Insane)</option>
          </select>
        </label>

        {/* Output format */}
        <label className="flex items-center gap-2">
          <span className="w-28 text-gray-400">Output Format</span>
          <select
            value={outputFormat}
            onChange={e => setOutputFormat(e.target.value)}
            className="bg-gray-800 text-white px-2 py-1 rounded"
          >
            <option value="">None</option>
            <option value="normal">Normal (-oN)</option>
            <option value="xml">XML (-oX)</option>
            <option value="grepable">Grepable (-oG)</option>
            <option value="all">All (-oA)</option>
          </select>
        </label>

        {/* Output file name */}
        {outputFormat && (
          <label className="flex items-center gap-2">
            <span className="w-28 text-gray-400">Output File</span>
            <input
              type="text"
              value={outputFile}
              onChange={e => setOutputFile(e.target.value)}
              className="bg-gray-800 text-white px-2 py-1 rounded flex-1"
              placeholder="scan_result"
            />
          </label>
        )}
      </div>

      {/* Output command */}
      <p className="text-xs text-gray-400 mb-1">Run this on your shell:</p>
      <code className="text-xs break-words whitespace-pre-wrap">{nmapCommand}</code>
      <p className="text-xs text-gray-500 mt-2">
        This is just a command generator. Nmap must be run in your shell or terminal.
      </p>
    </ToolShell>
  );
}
