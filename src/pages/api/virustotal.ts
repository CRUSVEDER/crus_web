// pages/api/virustotal.ts

import type { NextApiRequest, NextApiResponse } from 'next'

type Data =
  | { error: string }
  | { data: any }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests are allowed' })
  }

  const { urlToScan } = req.body
  const apiKey = process.env.VIRUSTOTAL_API_KEY

  if (!urlToScan || !apiKey) {
    return res.status(400).json({ error: 'Missing urlToScan or API key' })
  }

  try {
    const response = await fetch('https://www.virustotal.com/api/v3/urls', {
      method: 'POST',
      headers: {
        'x-apikey': apiKey,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `url=${encodeURIComponent(urlToScan)}`,
    })

    const data = await response.json()
    return res.status(200).json({ data })
  } catch (error: any) {
    return res.status(500).json({ error: 'Failed to contact VirusTotal' })
  }
}
