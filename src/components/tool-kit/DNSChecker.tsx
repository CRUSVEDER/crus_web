// src/components/tool-kit/DNSChecker.tsx
import React, { useState } from "react";
import ToolShell from "./toolshell";

type Res = { resolver: string; status: "ok"|"fail"; answer?: string; error?: string };

const resolvers = [
  { name: "Google", url: (d:string)=>`https://dns.google/resolve?name=${d}` },
  { name: "Cloudflare", url: (d:string)=>`https://cloudflare-dns.com/dns-query?name=${d}&type=A` }, // will likely CORS fail
  { name: "Quad9", url: (d:string)=>`https://9.9.9.9/dns-query?name=${d}&type=A` } // will likely CORS fail
];

export default function DNSChecker() {
  const [domain, setDomain] = useState("example.com");
  const [results, setResults] = useState<Res[]>([]);
  const [loading, setLoading] = useState(false);

  const check = async () => {
    setLoading(true);
    const out: Res[] = [];
    for (const r of resolvers) {
      try {
        const resp = await fetch(r.url(domain), { headers: { accept: "application/dns-json" } });
        if (!resp.ok) throw new Error(String(resp.status));
        const data = await resp.json();
        const answer = data?.Answer?.[0]?.data;
        out.push({ resolver: r.name, status: "ok", answer });
      } catch (e:any) {
        out.push({ resolver: r.name, status: "fail", error: e.message });
      }
    }
    setResults(out);
    setLoading(false);
  };

  return (
    <ToolShell title="DNS Propagation Checker" description="Best-effort using public DoH APIs (CORS may block some).">
      <div className="flex gap-2 mb-3">
        <input
          type="text"
          value={domain}
          onChange={e => setDomain(e.target.value)}
          className="bg-gray-800 text-white px-2 py-1 rounded flex-1"
          placeholder="example.com"
        />
        <button onClick={check} className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded">
          {loading ? "Checking..." : "Check"}
        </button>
      </div>

      <div className="text-sm space-y-2">
        {results.map((r, i) => (
          <div key={i} className="flex justify-between">
            <span>{r.resolver}</span>
            {r.status === "ok" ? (
              <span className="text-green-400">{r.answer || "(no A answer)"}</span>
            ) : (
              <span className="text-red-400">Failed ({r.error})</span>
            )}
          </div>
        ))}
      </div>

      <p className="text-xs text-gray-400 mt-3">
        If CORS blocks: try `dig +short {domain} @8.8.8.8`, `@1.1.1.1`, etc. on your shell.
      </p>
    </ToolShell>
  );
}
