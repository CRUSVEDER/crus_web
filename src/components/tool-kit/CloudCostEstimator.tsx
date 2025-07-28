// src/components/tool-kit/CloudCostEstimator.tsx
import React, { useState } from "react";
import ToolShell from "./toolshell";

const CloudCostEstimator = () => {
  const [service, setService] = useState("ec2");
  const [region, setRegion] = useState("us-east-1");
  const [usage, setUsage] = useState("");
  const [usageUnit, setUsageUnit] = useState("hours");
  const [result, setResult] = useState("");

  const calculateCost = () => {
    const usageValue = parseFloat(usage);
    
    if (isNaN(usageValue) || usageValue <= 0) {
      setResult("Please enter a valid usage value");
      return;
    }

    // Sample pricing (simplified - real prices vary by region and time)
    const pricing: Record<string, Record<string, any>> = {
      ec2: {
        "us-east-1": { hourly: 0.10, monthly: 73.00 },
        "us-west-2": { hourly: 0.12, monthly: 87.60 },
        "eu-west-1": { hourly: 0.11, monthly: 80.30 }
      },
      s3: {
        "us-east-1": { perGB: 0.023, perRequest: 0.0004 },
        "us-west-2": { perGB: 0.025, perRequest: 0.0005 },
        "eu-west-1": { perGB: 0.024, perRequest: 0.0004 }
      },
      lambda: {
        "us-east-1": { perRequest: 0.0000002, perGBSecond: 0.0000166667 },
        "us-west-2": { perRequest: 0.0000002, perGBSecond: 0.0000166667 },
        "eu-west-1": { perRequest: 0.0000002, perGBSecond: 0.0000166667 }
      }
    };

    const servicePricing = pricing[service];
    const regionPricing = servicePricing?.[region];

    if (!regionPricing) {
      setResult("Invalid service or region");
      return;
    }

    let cost = 0;
    let breakdown = "";

    switch (service) {
      case "ec2":
        if (usageUnit === "hours") {
          cost = usageValue * regionPricing.hourly;
          breakdown = `EC2 Instance (${region}): $${regionPricing.hourly}/hour\n`;
        } else {
          cost = usageValue * regionPricing.monthly;
          breakdown = `EC2 Instance (${region}): $${regionPricing.monthly}/month\n`;
        }
        break;
      case "s3":
        cost = usageValue * regionPricing.perGB;
        breakdown = `S3 Storage (${region}): $${regionPricing.perGB}/GB\n`;
        break;
      case "lambda":
        cost = usageValue * regionPricing.perRequest;
        breakdown = `Lambda Requests (${region}): $${regionPricing.perRequest}/request\n`;
        break;
    }

    const monthly = usageUnit === "hours" ? cost * 730 : cost;
    const yearly = monthly * 12;

    setResult(
      `${breakdown}\n` +
      `Usage: ${usageValue} ${usageUnit}\n` +
      `Cost: $${cost.toFixed(4)}\n` +
      `Monthly (estimated): $${monthly.toFixed(2)}\n` +
      `Yearly (estimated): $${yearly.toFixed(2)}\n\n` +
      `Note: Prices are estimates and may vary`
    );
  };

  return (
    <ToolShell title="Cloud Cost Estimator">
      <div className="space-y-4">
        <div className="flex gap-2 items-center">
          <span className="text-sm">Service:</span>
          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="px-2 py-1 rounded bg-gray-800 text-white"
            aria-label="Select cloud service for cost estimation"
          >
            <option value="ec2">EC2</option>
            <option value="s3">S3</option>
            <option value="lambda">Lambda</option>
          </select>
        </div>

        <div className="flex gap-2 items-center">
          <span className="text-sm">Region:</span>
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="px-2 py-1 rounded bg-gray-800 text-white"
            aria-label="Select region for cloud service cost estimation"
          >
            <option value="us-east-1">US East (N. Virginia)</option>
            <option value="us-west-2">US West (Oregon)</option>
            <option value="eu-west-1">Europe (Ireland)</option>
          </select>
        </div>

        <div className="flex gap-2 items-center">
          <input
            type="number"
            placeholder="Usage"
            className="px-2 py-1 rounded bg-gray-800 text-white w-32"
            value={usage}
            onChange={(e) => setUsage(e.target.value)}
          />
          <select
            value={usageUnit}
            onChange={(e) => setUsageUnit(e.target.value)}
            className="px-2 py-1 rounded bg-gray-800 text-white"
            aria-label="Select usage unit for cloud service cost estimation"
          >
            <option value="hours">Hours</option>
            <option value="months">Months</option>
            <option value="gb">GB</option>
            <option value="requests">Requests</option>
          </select>
        </div>

        <button
          onClick={calculateCost}
          className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
        >
          Calculate
        </button>

        {result && (
          <pre className="mt-4 text-green-400 whitespace-pre-wrap text-sm">
            {result}
          </pre>
        )}
      </div>
    </ToolShell>
  );
};

export default CloudCostEstimator;
