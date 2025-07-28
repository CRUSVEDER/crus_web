import Layout from "@/components/layout";
import Blur from "@/components/blur";
import Link from "next/link";



const tools = [
  { slug: "subnet-calculator", title: "Subnet Calculator" },
  { slug: "ip-address-calculator", title: "IP Address Calculator" },
  { slug: "bandwidth-calculator", title: "Bandwidth Calculator" },
  { slug: "uptime-calculator", title: "Uptime Calculator" },
  { slug: "data-transfer-time", title: "Data Transfer Time" },
  { slug: "hashing-calculator", title: "Hashing Calculator" },
  { slug: "file-size-estimator", title: "File Size Estimator" },
  { slug: "raid-calculator", title: "RAID Calculator" },
  { slug: "ping-time-calculator", title: "Ping Time Calculator" },
  { slug: "latency-vs-throughput", title: "Latency vs Throughput" },
  { slug: "ip-address-calculator", title: "IPv4 to IPv6 Converter" },
  { slug: "ipv4-to-ipv6-converter", title: "IPv4 to IPv6 Converter" },
  { slug: "mac-lookup", title: "MAC Address Lookup" },
  { slug: "ip-range-calculator", title: "IP Range Calculator" },
  { slug: "network-address-calculator", title: "Network Address Calculator" },
  { slug: "wildcard-mask-tool", title: "Wildcard Mask Tool" },
  { slug: "dns-checker", title: "DNS Propagation Checker" },
  { slug: "base64-tool", title: "Base64 Encoder/Decoder" },
  { slug: "bin-dec-hex-converter", title: "Bin/Dec/Hex Converter" },
  { slug: "storage-conversion", title: "Storage Conversion" },
  { slug: "download-time-estimator", title: "Download Time Estimator" },
  { slug: "cloud-cost-estimator", title: "Cloud Cost Estimator" },
  { slug: "password-checker", title: "Password Strength Checker" },
  { slug: "unix-timestamp-converter", title: "Unix Timestamp Converter" },
  { slug: "hex-ascii-converter", title: "Hex to ASCII Converter" },
  { slug: "bitrate-calculator", title: "Bitrate Calculator" },
  { slug: "fibonacci-hash-tool", title: "Fibonacci Hash Tool" },
  { slug: "packet-loss-calculator", title: "Packet Loss Calculator" },
  { slug: "firewall-rule-generator", title: "Firewall Rule Generator" },
  { slug: "port-scanner-tool", title: "Port Scanner Tool" },
];

const CTFToolsPage = () => {
  return (
    <Layout>

      <h1 className="mb-8 w-full max-w-7xl text-8xl font-bold tracking-tighter leading-tight opacity-0 md:pr-8 lg:mb-12 dark:text-gray-100 animate-fade_in_up_10">
        ctf tools.{" "}
      </h1>


      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6 w-full max-w-7xl mx-auto font-mono">
        {tools.map((tool) => (
          <div
            key={tool.slug}
            className="bg-[#1c1c1c]/50 text-white p-4 rounded-sm border border-black/20 dark:border-transparent shadow-md hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
          >
            <h2 className="text-lg font-semibold mb-3">{tool.title}</h2>
            <Link
              href={`/ctf_tool/${tool.slug}`}
              className="inline-block bg-gray-300 text-white px-4 py-2 rounded text-sm font-medium hover:bg-gray-400 transition"
            >
              Launch
            </Link>
          </div>
        ))}
      </div>

      <Blur />
    </Layout>
  );
};

export default CTFToolsPage;
