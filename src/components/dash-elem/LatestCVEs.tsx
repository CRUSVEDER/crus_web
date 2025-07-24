'use client'

import React, { useEffect, useState } from 'react'

type RawCVE = {
  id: string
  summary: string
  Published: string
  cvss: number | null
}

export default function LatestCVEs() {
  const [cves, setCves] = useState<RawCVE[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const res = await fetch('/api/cves')
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data: any = await res.json()
        
        const cveData: RawCVE[] = [];
        if (data.vulnerabilities && Array.isArray(data.vulnerabilities)) {
          data.vulnerabilities.slice(0, 5).forEach((vuln: any) => {
            const cve = vuln.cve;
            const summary = cve.descriptions?.[0]?.value || 'No summary available.';
            const published = cve.published;
            const cvssV3 = cve.metrics?.cvssMetricV31?.[0];
            const cvssScore = cvssV3?.cvssData?.baseScore ?? null;

            cveData.push({
              id: cve.id,
              summary: summary,
              Published: published,
              cvss: cvssScore
            });
          });
        }
        
        setCves(cveData);
      } catch (err) {
        console.error(err)
        setError('Failed to load latest CVEs.')
      } finally {
        setLoading(false)
      }
    }
    fetchLatest()
  }, [])

  if (loading) return <p className="text-gray-400">Loading latest CVEs…</p>
  if (error) return <p className="text-red-500">{error}</p>

  return (
    <div className="space-y-4 p-4 overflow-y-auto">
      {cves.map(cve => (
        <div key={cve.id} className="break-words">
          <a
            href={`https://nvd.nist.gov/vuln/detail/${cve.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-White font-semibold hover:underline"
          >
            {cve.id}
          </a>
          <p className="text-gray-400">{cve.summary}</p>
          <p className="text-sm text-gray-500">
            Published: {cve.Published}, CVSS: {cve.cvss ?? 'N/A'}
          </p>
        </div>
      ))}
    </div>
  )
}