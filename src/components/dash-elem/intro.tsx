'use client'

import React from 'react'

const Intro = () => {
  return (
    <div className="flex flex-col justify-between h-full w-full px-4 py-2">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight mb-2">
          Hey! I'm Crus.
        </h1>
        <p className="text-sm text-neutral-300">
          I'm a cybersecurity enthusiast passionate about ethical hacking, malware analysis, and building secure tools. I create Python-based apps for real-world security use cases and share insights on my blog.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6 text-sm">
        <div className="rounded-lg bg-neutral-800/50 p-4 border border-white/10 hover:bg-neutral-700/60 transition">
          <p className="text-neutral-200 font-medium">🔗 Visit Blog</p>
          <p className="text-neutral-400 text-xs">crusblog.vercel.app</p>
        </div>

        <div className="rounded-lg bg-neutral-800/50 p-4 border border-white/10 hover:bg-neutral-700/60 transition">
          <p className="text-neutral-200 font-medium">⚔️ CTF Player</p>
          <p className="text-neutral-400 text-xs">TryHackMe · HTB · PicoCTF</p>
        </div>
      </div>
    </div>
  )
}

export default Intro
