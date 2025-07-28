// src/components/tool-kit/PasswordChecker.tsx
import React, { useState } from "react";
import ToolShell from "./toolshell";

function entropy(pw: string) {
  let chars = 0;
  if (/[a-z]/.test(pw)) chars += 26;
  if (/[A-Z]/.test(pw)) chars += 26;
  if (/[0-9]/.test(pw)) chars += 10;
  if (/[^a-zA-Z0-9]/.test(pw)) chars += 33;
  if (!chars) return 0;
  return Math.log2(chars) * pw.length;
}
function label(bits: number) {
  if (bits < 28) return "Very Weak";
  if (bits < 36) return "Weak";
  if (bits < 60) return "Reasonable";
  if (bits < 128) return "Strong";
  return "Very Strong";
}

export default function PasswordChecker() {
  const [pw, setPw] = useState("");
  const e = entropy(pw);
  const strength = label(e);

  return (
    <ToolShell title="Password Strength Checker">
      <input
        type="password"
        value={pw}
        onChange={e => setPw(e.target.value)}
        placeholder="Enter password"
        className="bg-gray-800 text-white px-2 py-1 rounded w-full mb-3"
      />
      <p className="text-sm">Entropy: <b>{e.toFixed(2)} bits</b></p>
      <p className="text-sm">Rating: <b>{strength}</b></p>
    </ToolShell>
  );
}
