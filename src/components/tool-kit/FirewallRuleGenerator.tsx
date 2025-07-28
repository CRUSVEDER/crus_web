// src/components/tool-kit/FirewallRuleGenerator.tsx
import React, { useState } from "react";
import ToolShell from "./toolshell";

export default function FirewallRuleGenerator() {
  const [proto, setProto] = useState<"tcp"|"udp">("tcp");
  const [src, setSrc] = useState<string>("0.0.0.0/0");
  const [dst, setDst] = useState<string>("192.168.1.10");
  const [port, setPort] = useState<number>(22);
  const [action, setAction] = useState<"ACCEPT"|"DROP">("ACCEPT");

  const iptables = `iptables -A INPUT -p ${proto} -s ${src} -d ${dst} --dport ${port} -j ${action}`;
  const ufw = `${action === "ACCEPT" ? "ufw allow" : "ufw deny"} ${port}/${proto} from ${src} to ${dst}`;

  return (
    <ToolShell title="Firewall Rule Generator">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3 text-sm">
  <L label="Protocol" htmlFor="proto">
    <select
      id="proto"
      value={proto}
      onChange={e => setProto(e.target.value as any)}
      className="bg-gray-800 text-white px-2 py-1 rounded w-full"
      title="Select the protocol"
    >
      <option value="tcp">TCP</option>
      <option value="udp">UDP</option>
    </select>
  </L>

  <L label="Action" htmlFor="action">
    <select
      id="action"
      value={action}
      onChange={e => setAction(e.target.value as any)}
      className="bg-gray-800 text-white px-2 py-1 rounded w-full"
      title="Select the action"
    >
      <option value="ACCEPT">ACCEPT</option>
      <option value="DROP">DROP</option>
    </select>
  </L>

  <L label="Source" htmlFor="src">
    <input
      id="src"
      type="text"
      value={src}
      onChange={e => setSrc(e.target.value)}
      placeholder="e.g. 192.168.1.1"
      className="bg-gray-800 text-white px-2 py-1 rounded w-full"
      title="Enter the source IP"
    />
  </L>

  <L label="Destination" htmlFor="dst">
    <input
      id="dst"
      type="text"
      value={dst}
      onChange={e => setDst(e.target.value)}
      placeholder="e.g. 10.0.0.2"
      className="bg-gray-800 text-white px-2 py-1 rounded w-full"
      title="Enter the destination IP"
    />
  </L>

  <L label="Port" htmlFor="port">
    <input
      id="port"
      type="number"
      value={port}
      onChange={e => setPort(Number(e.target.value))}
      placeholder="e.g. 80"
      className="bg-gray-800 text-white px-2 py-1 rounded w-full"
      title="Enter the port number"
    />
  </L>
</div>


      <div className="text-xs space-y-2">
        <div>
          <p className="text-gray-400 mb-1">iptables</p>
          <code className="break-words">{iptables}</code>
        </div>
        <div>
          <p className="text-gray-400 mb-1">ufw</p>
          <code className="break-words">{ufw}</code>
        </div>
      </div>
    </ToolShell>
  );
}

function L({ label,  children }: { label: string, htmlFor?: string, children: React.ReactNode }) {
  return (
    <label className="flex flex-col">
      <span className="text-gray-400 text-xs mb-1">{label}</span>
      {children}
    </label>
  );
}
