import React, { useState, useEffect } from "react";
import ToolShell from "./toolshell";

interface PasswordGeneratorProps {}

const charsets = {
  alphanum: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
  full: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?/`~",
};

function entropy(pw: string): number {
  let chars = 0;
  if (/[a-z]/.test(pw)) chars += 26;
  if (/[A-Z]/.test(pw)) chars += 26;
  if (/[0-9]/.test(pw)) chars += 10;
  if (/[^a-zA-Z0-9]/.test(pw)) chars += 33;
  if (!chars) return 0;
  return Math.log2(chars) * pw.length;
}

function label(bits: number): string {
  if (bits < 28) return "Very Weak";
  if (bits < 36) return "Weak";
  if (bits < 60) return "Reasonable";
  if (bits < 128) return "Strong";
  return "Very Strong";
}

function generatePassword(charset: string, length: number): string {
  const chars: string[] = [];
  for (let i = 0; i < length; i++) {
    chars.push(charset.charAt(Math.floor(Math.random() * charset.length)));
  }
  return chars.join("");
}

const PasswordAndKeyGenerator: React.FC<PasswordGeneratorProps> = () => {
  const [length, setLength] = useState<number | "">(12);
  const [includeLower, setIncludeLower] = useState<boolean>(true);
  const [includeUpper, setIncludeUpper] = useState<boolean>(true);
  const [includeDigits, setIncludeDigits] = useState<boolean>(true);
  const [includeSpecial, setIncludeSpecial] = useState<boolean>(true);
  const [password, setPassword] = useState<string>("");
  const [memorable, setMemorable] = useState<string[]>([]);
  const [strong, setStrong] = useState<string[]>([]);
  const [fortKnox, setFortKnox] = useState<string[]>([]);
  const [codeIgniter, setCodeIgniter] = useState<string[]>([]);
  const [wpa160, setWpa160] = useState<string[]>([]);
  const [wpa504, setWpa504] = useState<string[]>([]);

  useEffect(() => {
    generateAll();
  }, []);

  function generateCustomPassword(): void {
    let charset = "";
    if (includeLower) charset += "abcdefghijklmnopqrstuvwxyz";
    if (includeUpper) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeDigits) charset += "0123456789";
    if (includeSpecial) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?";
    let pw = "";
    if (charset.length > 0 && length !== "" && length > 0) {
      pw = generatePassword(charset, length);
    }
    setPassword(pw);
  }

  function generateAll(): void {
    setMemorable(Array.from({ length: 6 }, () => generatePassword(charsets.alphanum, 10)));
    setStrong(Array.from({ length: 6 }, () => generatePassword(charsets.full, 16)));
    setFortKnox(Array.from({ length: 4 }, () => generatePassword(charsets.full, 32)));
    setCodeIgniter(Array.from({ length: 4 }, () => generatePassword(charsets.full, 32)));
    setWpa160(Array.from({ length: 4 }, () => generatePassword(charsets.full, 20)));
    setWpa504(Array.from({ length: 4 }, () => generatePassword(charsets.full, 63)));
  }

  const handleLengthChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    if (value === "") {
      setLength("");
      return;
    }
    const parsed = parseInt(value, 10);
    if (!isNaN(parsed) && parsed >= 0 && parsed <= 256) {
      setLength(parsed);
    }
  };

  const e: number = entropy(password);
  const strength: string = label(e);

  return (
    <ToolShell title="Password & Key Generator">
      <div className="space-y-6">
        {/* Custom Password Generator */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Custom Password Generator</h3>
          <div className="space-y-2 mb-3">
            <div>
              <label htmlFor="password-length" className="text-sm block mb-1">
                Password Length:
              </label>
              <input
                id="password-length"
                type="number"
                min="0"
                max="256"
                value={length}
                onChange={handleLengthChange}
                className="bg-gray-800 text-white px-2 py-1 rounded w-20"
                aria-describedby="password-length-desc"
              />
              <p id="password-length-desc" className="text-xs text-gray-400 mt-1">
                Enter the desired length for your custom password (0-256)
              </p>
            </div>
            <div className="flex flex-wrap space-x-4 text-sm">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={includeLower}
                  onChange={(e) => setIncludeLower(e.target.checked)}
                  className="mr-2"
                />
                Lowercase
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={includeUpper}
                  onChange={(e) => setIncludeUpper(e.target.checked)}
                  className="mr-2"
                />
                Uppercase
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={includeDigits}
                  onChange={(e) => setIncludeDigits(e.target.checked)}
                  className="mr-2"
                />
                Digits
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={includeSpecial}
                  onChange={(e) => setIncludeSpecial(e.target.checked)}
                  className="mr-2"
                />
                Special Characters
              </label>
            </div>
            <button
              onClick={generateCustomPassword}
              className="bg-blue-500 text-white px-4 py-1 rounded"
            >
              Generate Custom Password
            </button>
          </div>
          <input
            type="text"
            value={password}
            readOnly
            placeholder="Generated password"
            className="bg-gray-800 text-white px-2 py-1 rounded w-full mb-3"
            aria-label="Generated custom password"
          />
          <p className="text-sm">Entropy: <b>{e.toFixed(2)} bits</b></p>
          <p className="text-sm">Rating: <b>{strength}</b></p>
        </div>

        {/* Random Key Generator */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Random Key Generator</h3>
          <button
            onClick={generateAll}
            className="bg-blue-500 text-white px-4 py-1 rounded mb-4"
          >
            Refresh Keys
          </button>

          <div className="space-y-6">
            <div className="mb-6">
              <p className="font-bold">Memorable Passwords</p>
              <p className="text-sm mb-2">Perfect for securing your computer or mobile device.</p>
              <div className="grid grid-cols-3 gap-2">
                {memorable.map((pw, i) => (
                  <input
                    key={i}
                    type="text"
                    value={pw}
                    readOnly
                    className="bg-gray-800 text-white px-2 py-1 rounded"
                    aria-label={`Memorable password ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            <div className="mb-6">
              <p className="font-bold">Strong Passwords</p>
              <p className="text-sm mb-2">Robust enough for web hosting accounts.</p>
              <div className="grid grid-cols-3 gap-2">
                {strong.map((pw, i) => (
                  <input
                    key={i}
                    type="text"
                    value={pw}
                    readOnly
                    className="bg-gray-800 text-white px-2 py-1 rounded"
                    aria-label={`Strong password ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            <div className="mb-6">
              <p className="font-bold">Fort Knox Passwords</p>
              <p className="text-sm mb-2">Secure enough for root or administrator accounts.</p>
              <div className="grid grid-cols-2 gap-2">
                {fortKnox.map((pw, i) => (
                  <input
                    key={i}
                    type="text"
                    value={pw}
                    readOnly
                    className="bg-gray-800 text-white px-2 py-1 rounded"
                    aria-label={`Fort Knox password ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            <div className="mb-6">
              <p className="font-bold">CodeIgniter Encryption Keys</p>
              <p className="text-sm mb-2">Suitable for 256-bit key requirements.</p>
              <div className="grid grid-cols-2 gap-2">
                {codeIgniter.map((pw, i) => (
                  <input
                    key={i}
                    type="text"
                    value={pw}
                    readOnly
                    className="bg-gray-800 text-white px-2 py-1 rounded"
                    aria-label={`CodeIgniter key ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            <div className="mb-6">
              <p className="font-bold">160-bit WPA Key</p>
              <div className="grid grid-cols-2 gap-2">
                {wpa160.map((pw, i) => (
                  <input
                    key={i}
                    type="text"
                    value={pw}
                    readOnly
                    className="bg-gray-800 text-white px-2 py-1 rounded"
                    aria-label={`160-bit WPA key ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            <div className="mb-6">
              <p className="font-bold">504-bit WPA Key</p>
              <div className="grid grid-cols-2 gap-2">
                {wpa504.map((pw, i) => (
                  <input
                    key={i}
                    type="text"
                    value={pw}
                    readOnly
                    className="bg-gray-800 text-white px-2 py-1 rounded"
                    aria-label={`504-bit WPA key ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ToolShell>
  );
};

export default PasswordAndKeyGenerator;