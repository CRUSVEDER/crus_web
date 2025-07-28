// src/components/tool-kit/PacketLossCalculator.tsx
import React, { useState } from "react";
import ToolShell from "./toolshell";

const PacketLossCalculator = () => {
  const [sent, setSent] = useState("");
  const [received, setReceived] = useState("");
  const [result, setResult] = useState("");

  const calculatePacketLoss = () => {
    const sentValue = parseInt(sent);
    const receivedValue = parseInt(received);
    
    if (isNaN(sentValue) || isNaN(receivedValue) || sentValue <= 0) {
      setResult("Please enter valid packet counts");
      return;
    }

    if (receivedValue > sentValue) {
      setResult("Received packets cannot exceed sent packets");
      return;
    }

    const lost = sentValue - receivedValue;
    const lossRate = (lost / sentValue) * 100;
    const successRate = (receivedValue / sentValue) * 100;

    let quality = "";
    if (lossRate < 1) quality = "Excellent";
    else if (lossRate < 5) quality = "Good";
    else if (lossRate < 10) quality = "Fair";
    else if (lossRate < 20) quality = "Poor";
    else quality = "Very Poor";

    setResult(
      `Sent Packets: ${sentValue}\n` +
      `Received Packets: ${receivedValue}\n` +
      `Lost Packets: ${lost}\n\n` +
      `Packet Loss Rate: ${lossRate.toFixed(2)}%\n` +
      `Success Rate: ${successRate.toFixed(2)}%\n\n` +
      `Network Quality: ${quality}\n\n` +
      `Note: Packet loss > 5% may indicate network issues`
    );
  };

  const clearAll = () => {
    setSent("");
    setReceived("");
    setResult("");
  };

  return (
    <ToolShell title="Packet Loss Calculator">
      <div className="space-y-4">
        <div className="flex gap-2 items-center">
          <input
            type="number"
            placeholder="Sent packets"
            className="px-2 py-1 rounded bg-gray-800 text-white w-32"
            value={sent}
            onChange={(e) => setSent(e.target.value)}
          />
          <span className="text-sm">→</span>
          <input
            type="number"
            placeholder="Received packets"
            className="px-2 py-1 rounded bg-gray-800 text-white w-32"
            value={received}
            onChange={(e) => setReceived(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={calculatePacketLoss}
            className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
          >
            Calculate
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

export default PacketLossCalculator;
