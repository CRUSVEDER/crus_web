const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-between gap-4 py-8 w-full opacity-0 sm:max-w-screen-sm md:max-w-7xl animate-fade_in">
      {/* Social Icons Row */}
      <div className="flex gap-4">
        {/* GitHub */}
        <a
          href="https://github.com/CRUSVEDER"
          target="_blank"
          aria-label="Crusveder's GitHub"
          className="p-1 text-gray-800 rounded-md transition-shadow duration-300 dark:text-gray-100 hover:ring-4 hover:ring-pink-300 focus:ring-4 focus:ring-pink-300 focus:outline-none dark:hover:ring-palevioletred dark:focus:ring-palevioletred"
          rel="noopener noreferrer"
        >
          <svg className="size-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
            <rect width="256" height="256" fill="none" />
            <path
              d="M119.83,56A52,52,0,0,0,76,32a51.92,51.92,0,0,0-3.49,44.7A49.28,49.28,0,0,0,64,104v8a48,48,0,0,0,48,48h48a48,48,0,0,0,48-48v-8a49.28,49.28,0,0,0-8.51-27.3A51.92,51.92,0,0,0,196,32a52,52,0,0,0-43.83,24Z"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="16"
            />
            <path
              d="M104,232V192a32,32,0,0,1,32-32h0a32,32,0,0,1,32,32v40"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="16"
            />
            <path
              d="M104,208H72a32,32,0,0,1-32-32A32,32,0,0,0,8,144"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="16"
            />
          </svg>
        </a>

        {/* Twitter/X */}
        <a
          href="https://x.com/yashg31"
          target="_blank"
          aria-label="Crusveder's Twitter"
          className="p-1 text-gray-800 rounded-md transition-shadow duration-300 dark:text-gray-100 hover:ring-4 hover:ring-pink-300 focus:ring-4 focus:ring-pink-300 focus:outline-none dark:hover:ring-palevioletred dark:focus:ring-palevioletred"
          rel="noopener noreferrer"
        >
          <svg className="size-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
            <rect width="256" height="256" fill="none" />
            <path
              d="M88,176S32.85,144,40.78,56c0,0,39.66,40,87.22,48V88c0-22,18-40.27,40-40a40.74,40.74,0,0,1,36.67,24H240l-32,32c-4.26,66.84-60.08,120-128,120-32,0-40-12-40-12S72,200,88,176Z"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="16"
            />
          </svg>
        </a>

        {/* Discord */}
        <a
          href="https://discord.com/users/"
          target="_blank"
          aria-label="Crusveder's Discord"
          className="p-1 text-gray-800 rounded-md transition-shadow duration-300 dark:text-gray-100 hover:ring-4 hover:ring-pink-300 focus:ring-4 focus:ring-pink-300 focus:outline-none dark:hover:ring-palevioletred dark:focus:ring-palevioletred"
          rel="noopener noreferrer"
        >
          {/* Discord Icon */}
          <svg
            className="size-8"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M20.317 4.369a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.078.037c-.211.375-.444.864-.608 1.25a18.332 18.332 0 00-5.487 0 12.2 12.2 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.684 4.37a.07.07 0 00-.03.027C.533 9.138-.32 13.748.099 18.306a.087.087 0 00.031.056c2.072 1.523 4.086 2.448 6.034 3.048a.077.077 0 00.084-.027c.464-.638.875-1.312 1.226-2.016a.076.076 0 00-.041-.104 13.05 13.05 0 01-1.872-.9.077.077 0 01-.008-.128c.126-.094.252-.192.373-.291a.074.074 0 01.077-.01c3.927 1.793 8.18 1.793 12.061 0a.073.073 0 01.078.009c.12.099.247.198.374.292a.077.077 0 01-.006.128 12.263 12.263 0 01-1.873.899.076.076 0 00-.04.105c.36.704.772 1.378 1.225 2.015a.076.076 0 00.084.028c1.956-.6 3.97-1.525 6.033-3.048a.076.076 0 00.031-.055c.5-5.177-.838-9.746-3.548-13.91a.062.062 0 00-.03-.028zM8.02 15.331c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.418 2.157-2.418 1.21 0 2.175 1.094 2.157 2.418 0 1.334-.955 2.419-2.157 2.419zm7.974 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.418 2.157-2.418 1.21 0 2.175 1.094 2.157 2.418 0 1.334-.947 2.419-2.157 2.419z" />
          </svg>
        </a>


        {/* Email */}
        <a
          href="mailto:yashgholap777@gmail.com"
          target="_blank"
          aria-label="Email Crusveder"
          className="p-1 text-gray-800 rounded-md transition-shadow duration-300 dark:text-gray-100 hover:ring-4 hover:ring-pink-300 focus:ring-4 focus:ring-pink-300 focus:outline-none dark:hover:ring-palevioletred dark:focus:ring-palevioletred"
          rel="noopener noreferrer"
        >
          <svg 
          className="size-8" 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 5h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z" />
          </svg>
        </a>
                {/* Rss */}
        <a
           href="rss.xml"
           target="_blank"
           aria-label="RSS Feed"
           className="p-1 text-gray-800 rounded-md transition-shadow duration-300 dark:text-gray-100 hover:ring-4 hover:ring-pink-300 focus:ring-4 focus:ring-pink-300 focus:outline-none dark:hover:ring-palevioletred dark:focus:ring-palevioletred"
           rel="noopener noreferrer"
          >
           <svg
          className="size-8"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="5" cy="19" r="1" fill="currentColor" />
          <path d="M5 13a6 6 0 0 1 6 6" />
          <path d="M5 9a10 10 0 0 1 10 10" />
          <path d="M5 5a14 14 0 0 1 14 14" />
        </svg>

          </a>


      </div>

      {/* ⓒ Copyright */}
      <div className="text-sm font-mono text-gray-700 dark:text-gray-400">
        © {new Date().getFullYear()}{" "}
        <a href="/" className="underline hover:text-pink-600 transition">
          Crusveder
        </a>. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
