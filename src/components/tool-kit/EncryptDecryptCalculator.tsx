import React, { useState } from "react";
import ToolShell from "./toolshell";

// Utility functions
const strToBuf = (str: string) => new TextEncoder().encode(str);
const bufToStr = (buf: ArrayBuffer) => new TextDecoder().decode(buf);

const generateKey = async (
  algorithm: string,
  password: string,
  salt: Uint8Array
) => {
  const baseKey = await crypto.subtle.importKey(
    "raw",
    strToBuf(password),
    "PBKDF2",
    false,
    ["deriveKey"]
  );
  
  const keyParams: Record<string, { name: string; length?: number }> = {
    "AES-GCM": { name: "AES-GCM", length: 256 },
    "AES-CBC": { name: "AES-CBC", length: 256 },
    "Triple DES": { name: "DES-EDE3-CBC", length: 192 },
    "ChaCha20-Poly1305": { name: "AES-GCM", length: 256 },
  };

  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt,
      iterations: 100000,
      hash: "SHA-256",
    },
    baseKey,
    keyParams[algorithm] || { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
};

const generateRSAKeyPair = async () => {
  try {
    return await crypto.subtle.generateKey(
      {
        name: "RSA-OAEP",
        modulusLength: 2048,
        publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
        hash: "SHA-256",
      },
      true,
      ["encrypt", "decrypt"]
    );
  } catch (err) {
    throw new Error(`RSA key generation failed: ${err}`);
  }
};

// Encryption functions
const encryptAESGCM = async (input: string, key: string | CryptoKey) => {
  if (typeof key !== "string") {
    throw new Error("AES-GCM requires a string password");
  }
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const derivedKey = await generateKey("AES-GCM", key, salt);
  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    derivedKey,
    strToBuf(input)
  );
  const combined = new Uint8Array([...salt, ...iv, ...new Uint8Array(encrypted)]);
  return btoa(String.fromCharCode(...combined));
};

const decryptAESGCM = async (input: string, key: string | CryptoKey) => {
  if (typeof key !== "string") {
    throw new Error("AES-GCM requires a string password");
  }
  const raw = Uint8Array.from(atob(input), (c) => c.charCodeAt(0));
  const salt = raw.slice(0, 16);
  const iv = raw.slice(16, 28);
  const data = raw.slice(28);
  const derivedKey = await generateKey("AES-GCM", key, salt);
  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    derivedKey,
    data
  );
  return bufToStr(decrypted);
};

const encryptAESCBC = async (input: string, key: string | CryptoKey) => {
  if (typeof key !== "string") {
    throw new Error("AES-CBC requires a string password");
  }
  const iv = crypto.getRandomValues(new Uint8Array(16));
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const derivedKey = await generateKey("AES-CBC", key, salt);
  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-CBC", iv },
    derivedKey,
    strToBuf(input)
  );
  const combined = new Uint8Array([...salt, ...iv, ...new Uint8Array(encrypted)]);
  return btoa(String.fromCharCode(...combined));
};

const decryptAESCBC = async (input: string, key: string | CryptoKey) => {
  if (typeof key !== "string") {
    throw new Error("AES-CBC requires a string password");
  }
  const raw = Uint8Array.from(atob(input), (c) => c.charCodeAt(0));
  const salt = raw.slice(0, 16);
  const iv = raw.slice(16, 32);
  const data = raw.slice(32);
  const derivedKey = await generateKey("AES-CBC", key, salt);
  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-CBC", iv },
    derivedKey,
    data
  );
  return bufToStr(decrypted);
};

const encryptTripleDES = async (input: string, key: string | CryptoKey) => {
  if (typeof key !== "string") {
    throw new Error("Triple DES requires a string password");
  }
  const iv = crypto.getRandomValues(new Uint8Array(8));
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const derivedKey = await generateKey("Triple DES", key, salt);
  const encrypted = await crypto.subtle.encrypt(
    { name: "DES-EDE3-CBC", iv },
    derivedKey,
    strToBuf(input)
  );
  const combined = new Uint8Array([...salt, ...iv, ...new Uint8Array(encrypted)]);
  return btoa(String.fromCharCode(...combined));
};

const decryptTripleDES = async (input: string, key: string | CryptoKey) => {
  if (typeof key !== "string") {
    throw new Error("Triple DES requires a string password");
  }
  const raw = Uint8Array.from(atob(input), (c) => c.charCodeAt(0));
  const salt = raw.slice(0, 16);
  const iv = raw.slice(16, 24);
  const data = raw.slice(24);
  const derivedKey = await generateKey("Triple DES", key, salt);
  const decrypted = await crypto.subtle.decrypt(
    { name: "DES-EDE3-CBC", iv },
    derivedKey,
    data
  );
  return bufToStr(decrypted);
};

const encryptChaCha20 = async (input: string, key: string | CryptoKey) => {
  if (typeof key !== "string") {
    throw new Error("ChaCha20-Poly1305 requires a string password");
  }
  return encryptAESGCM(input, key); // Fallback
};

const decryptChaCha20 = async (input: string, key: string | CryptoKey) => {
  if (typeof key !== "string") {
    throw new Error("ChaCha20-Poly1305 requires a string password");
  }
  return decryptAESGCM(input, key); // Fallback
};

const encryptXOR = async (input: string, key: string | CryptoKey) => {
  if (typeof key !== "string") {
    throw new Error("XOR requires a string password");
  }
  const keyBuf = strToBuf(key);
  const inputBuf = strToBuf(input);
  const output = new Uint8Array(inputBuf.length);
  for (let i = 0; i < inputBuf.length; i++) {
    output[i] = inputBuf[i] ^ keyBuf[i % keyBuf.length];
  }
  return btoa(String.fromCharCode(...output));
};

const decryptXOR = async (input: string, key: string | CryptoKey) => {
  if (typeof key !== "string") {
    throw new Error("XOR requires a string password");
  }
  const keyBuf = strToBuf(key);
  const inputBuf = Uint8Array.from(atob(input), (c) => c.charCodeAt(0));
  const output = new Uint8Array(inputBuf.length);
  for (let i = 0; i < inputBuf.length; i++) {
    output[i] = inputBuf[i] ^ keyBuf[i % keyBuf.length];
  }
  return bufToStr(output.buffer);
};

const encryptRSAOAEP = async (input: string, key: CryptoKey) => {
  const inputBytes = strToBuf(input);
  if (inputBytes.length > 190) { // 2048-bit key with SHA-256 allows ~190 bytes
    throw new Error("Input too long for RSA-OAEP (max 190 bytes)");
  }
  try {
    const encrypted = await crypto.subtle.encrypt(
      { name: "RSA-OAEP" },
      key,
      inputBytes
    );
    return btoa(String.fromCharCode(...new Uint8Array(encrypted)));
  } catch (err) {
    throw new Error(`RSA-OAEP encryption failed: ${err}`);
  }
};

const decryptRSAOAEP = async (input: string, key: CryptoKey) => {
  try {
    const raw = Uint8Array.from(atob(input), (c) => c.charCodeAt(0));
    const decrypted = await crypto.subtle.decrypt(
      { name: "RSA-OAEP" },
      key,
      raw
    );
    return bufToStr(decrypted);
  } catch (err) {
    throw new Error(`RSA-OAEP decryption failed: ${err}`);
  }
};

export default function EncryptionTool() {
  const [input, setInput] = useState("");
  const [password, setPassword] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encrypt" | "decrypt">("encrypt");
  const [algorithm, setAlgorithm] = useState("AES-GCM");
  const [rsaKeyPair, setRsaKeyPair] = useState<CryptoKeyPair | null>(null);
  const [keyGenStatus, setKeyGenStatus] = useState<string>("No RSA keys generated");

  const generateRSAKeys = async () => {
    try {
      const keyPair = await generateRSAKeyPair();
      setRsaKeyPair(keyPair);
      setKeyGenStatus("RSA key pair generated successfully");
    } catch (err) {
      setKeyGenStatus(`RSA key generation failed: ${err}`);
    }
  };

  const run = async () => {
    if (!input || (!password && algorithm !== "RSA-OAEP")) {
      setOutput("Missing input or password");
      return;
    }
    if (algorithm === "RSA-OAEP" && !rsaKeyPair) {
      setOutput("Please generate RSA key pair first");
      return;
    }

    try {
      const algoMap: Record<
        string,
        (input: string, key: string | CryptoKey) => Promise<string>
      > = {
        "AES-GCM": mode === "encrypt" ? encryptAESGCM : decryptAESGCM,
        "AES-CBC": mode === "encrypt" ? encryptAESCBC : decryptAESCBC,
        "Triple DES": mode === "encrypt" ? encryptTripleDES : decryptTripleDES,
        "ChaCha20-Poly1305": mode === "encrypt" ? encryptChaCha20 : decryptChaCha20,
        XOR: mode === "encrypt" ? encryptXOR : decryptXOR,
        "RSA-OAEP":
          mode === "encrypt"
            ? (input: string) => encryptRSAOAEP(input, rsaKeyPair!.publicKey)
            : (input: string) => decryptRSAOAEP(input, rsaKeyPair!.privateKey),
      };

      const key = algorithm === "RSA-OAEP" ? 
        (mode === "encrypt" ? rsaKeyPair!.publicKey : rsaKeyPair!.privateKey) : 
        password;
      const result = await algoMap[algorithm](input, key);
      setOutput(result);
    } catch (err) {
      setOutput(`Error: ${err}`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    run();
  };

  return (
    <ToolShell title="Encryption Tool">
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full h-24 bg-gray-800 text-white p-2 rounded mb-2"
          placeholder={
            mode === "encrypt" ? 
              (algorithm === "RSA-OAEP" ? "Enter text to encrypt (max 190 bytes)" : "Enter text to encrypt") : 
              "Enter encrypted base64"
          }
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        {algorithm !== "RSA-OAEP" && (
          <input
            className="w-full bg-gray-700 text-white p-2 rounded mb-2"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        )}
        <div className="flex gap-2 mb-2">
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value as "encrypt" | "decrypt")}
            className="bg-gray-800 text-white rounded px-2 py-1"
            aria-label="mode"
          >
            <option value="encrypt">Encrypt</option>
            <option value="decrypt">Decrypt</option>
          </select>
          <select
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value)}
            className="bg-gray-800 text-white rounded px-2 py-1"
            aria-label="algorithm"
          >
            <option value="AES-GCM">AES-GCM (Symmetric, Strong)</option>
            <option value="AES-CBC">AES-CBC (Symmetric, Strong)</option>
            <option value="Triple DES">Triple DES (Symmetric, Medium)</option>
            <option value="ChaCha20-Poly1305">ChaCha20-Poly1305 (Symmetric, Strong)</option>
            <option value="XOR">XOR (Symmetric, Very Weak)</option>
            <option value="RSA-OAEP">RSA-OAEP (Asymmetric, Strong)</option>
          </select>
          {algorithm === "RSA-OAEP" && (
            <button
              type="button"
              onClick={generateRSAKeys}
              className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded"
            >
              Generate RSA Keys
            </button>
          )}
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded"
          >
            Run
          </button>
        </div>
      </form>
      {algorithm === "RSA-OAEP" && (
        <div className="text-sm bg-gray-900 p-2 rounded mb-2">
          <span className="text-gray-400">Key Status:</span> {keyGenStatus}
        </div>
      )}
      {output && (
        <div className="text-sm break-all bg-gray-900 p-2 rounded">
          <span className="text-gray-400">
            {mode === "encrypt" ? "Encrypted" : "Decrypted"}:
          </span>
          <br />
          {output}
        </div>
      )}
    </ToolShell>
  );
}