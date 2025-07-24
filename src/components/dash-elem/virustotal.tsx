'use client'
import React, { useState } from 'react'

export default function VirusTotalScanner() {
  const [url, setUrl] = useState('')
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const handleScan = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/virustotal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ urlToScan: url }),
      })
      const data = await res.json()
      setResult(data)
    } catch (err) {
      console.error(err)
      setResult({ error: 'Failed to scan URL' })
    }
    setLoading(false)
  }

  return (
    <div className="p-4 max-w-md mx-auto space-y-4">
      <input
        type="text"
        className="w-full p-2 border border-gray-300 rounded bg-white text-black dark:bg-gray-800 dark:text-white"
        placeholder="Enter a URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
            <button
        className="bg-gray-300 text-white px-4 py-2 rounded"
        onClick={handleScan}
        disabled={loading}
      >
        {loading ? 'Scanning...' : 'Scan URL'}
      </button>

      {result && (
        <pre className="bg-transparent p-2 overflow-x-auto text-xs whitespace-pre-wrap">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  )
}
