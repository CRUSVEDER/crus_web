import { NextApiRequest, NextApiResponse } from 'next'
import { generateRSSFeed } from '@/lib/generateRSS'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method not allowed' })
    return
  }

  try {
    const feed = await generateRSSFeed()

    res.setHeader('Content-Type', 'application/xml')
    res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate')

    res.status(200).send(feed.rss2())
  } catch (error) {
    console.error('❌ Error generating RSS feed:', error)
    res.status(500).json({ message: 'Error generating RSS feed' })
  }
}
