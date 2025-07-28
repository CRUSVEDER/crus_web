// src/components/tool-kit/Base64Tool.tsx
import React, { useState } from "react";
import ToolShell from "./toolshell";

export default function Base64Tool() {
  const [text, setText] = useState("");
  const [out, setOut] = useState("");

  const encode = () => setOut(btoa(unescape(encodeURIComponent(text))));
  const decode = () => {
    try {
      setOut(decodeURIComponent(escape(atob(text))));
    } catch {
      setOut("Invalid Base64");
    }
  };

  return (
    <ToolShell title="Base64 Encoder / Decoder">
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        className="w-full h-32 bg-gray-800 text-white p-2 rounded mb-3"
        placeholder="Enter text or base64…"
      />
      <div className="flex gap-2 mb-3">
        <button onClick={encode} className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded">Encode</button>
        <button onClick={decode} className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded">Decode</button>
      </div>
      {out && <p className="text-xs break-all">{out}</p>}
    </ToolShell>
  );
}
