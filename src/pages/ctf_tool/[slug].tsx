import { useRouter } from "next/router";
import Layout from "@/components/layout";
import SubnetCalculator from "@/components/tool-kit/SubnetCalculator";
import BandwidthCalculator from "@/components/tool-kit/BandwidthCalculator";
import UptimeCalculator from "@/components/tool-kit/UptimeCalculator";
import DataTransferTime from "@/components/tool-kit/DataTransferTime";
import HashingCalculator from "@/components/tool-kit/HashingCalculator";
import FileSizeEstimator from "@/components/tool-kit/FileSizeEstimator";
import RaidCalculator from "@/components/tool-kit/RaidCalculator";
import PingTimeCalculator from "@/components/tool-kit/PingTimeCalculator";
import LatencyVsThroughput from "@/components/tool-kit/LatencyVsThroughput";
import IPAddressCalculator from "@/components/tool-kit/IPAddressCalculator";
import IPv4ToIPv6Converter from "@/components/tool-kit/IPv4ToIPv6Converter";
import MACLookup from "@/components/tool-kit/MACLookup";
import IPRangeCalculator from "@/components/tool-kit/IPRangeCalculator";
import NetworkAddressCalculator from "@/components/tool-kit/NetworkAddressCalculator";
import WildcardMaskTool from "@/components/tool-kit/WildcardMaskTool";
import DNSChecker from "@/components/tool-kit/DNSChecker";
import Base64Tool from "@/components/tool-kit/Base64Tool";
import BinDecHexConverter from "@/components/tool-kit/BinDecHexConverter";
import StorageConversion from "@/components/tool-kit/StorageConversion";
import DownloadTimeEstimator from "@/components/tool-kit/DownloadTimeEstimator";
import CloudCostEstimator from "@/components/tool-kit/CloudCostEstimator";
import PasswordChecker from "@/components/tool-kit/PasswordChecker";
import UnixTimestampConverter from "@/components/tool-kit/UnixTimestampConverter";
import HexASCIIConverter from "@/components/tool-kit/HexASCIIConverter";
import BitrateCalculator from "@/components/tool-kit/BitrateCalculator";
import FibonacciHashTool from "@/components/tool-kit/FibonacciHashTool";
import PacketLossCalculator from "@/components/tool-kit/PacketLossCalculator";
import FirewallRuleGenerator from "@/components/tool-kit/FirewallRuleGenerator";
import PortScannerTool from "@/components/tool-kit/PortScannerTool";
import EncryptDecryptCalculator from "@/components/tool-kit/EncryptDecryptCalculator";

const tools: Record<string, JSX.Element> = {
  "subnet-calculator": <SubnetCalculator />,
  "bandwidth-calculator": <BandwidthCalculator />,
  "uptime-calculator": <UptimeCalculator />,
  "data-transfer-time": <DataTransferTime />,
  "encrypt-decrypt-calculator": <EncryptDecryptCalculator />,
  "hashing-calculator": <HashingCalculator />,
  "file-size-estimator": <FileSizeEstimator />,
  "raid-calculator": <RaidCalculator />,
  "ping-time-calculator": <PingTimeCalculator />,
  "latency-vs-throughput": <LatencyVsThroughput />,
  "ipv4-to-ipv6-converter": <IPv4ToIPv6Converter />,
  "ip-address-calculator": <IPAddressCalculator />,
  "mac-lookup": <MACLookup />,
  "ip-range-calculator": <IPRangeCalculator />,
  "network-address-calculator": <NetworkAddressCalculator />,
  "wildcard-mask-tool": <WildcardMaskTool />,
  "dns-checker": <DNSChecker />,
  "base64-tool": <Base64Tool />,
  "bin-dec-hex-converter": <BinDecHexConverter />,
  "storage-conversion": <StorageConversion />,
  "download-time-estimator": <DownloadTimeEstimator />,
  "cloud-cost-estimator": <CloudCostEstimator />,
  "password-checker": <PasswordChecker />,
  "unix-timestamp-converter": <UnixTimestampConverter />,
  "hex-ascii-converter": <HexASCIIConverter />,
  "bitrate-calculator": <BitrateCalculator />,
  "fibonacci-hash-tool": <FibonacciHashTool />,
  "packet-loss-calculator": <PacketLossCalculator />,
  "firewall-rule-generator": <FirewallRuleGenerator />,
  "port-scanner-tool": <PortScannerTool />,
};

export default function ToolPage() {
  const { slug } = useRouter().query;
  const tool = slug ? tools[slug as string] : null;

  return (
    <Layout>
      {tool || <p className="text-white font-bold font-mono">Tool not found</p>}
    </Layout>
  );
}
