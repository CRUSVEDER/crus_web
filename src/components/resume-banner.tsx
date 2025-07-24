const ResumeBanner = () => (
  <a
    href="/assets/june_2025resume.pdf"
    download
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-3 px-4 py-2 font-mono text-sm font-light text-gray-800 bg-gray-100 border border-gray-300 rounded-md shadow-sm hover:bg-pink-100 dark:text-gray-100 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-500 transition"
  >
    📄 Hiring? Check out my CV
    <svg
      className="size-4"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      fill="none"
    >
      <path
        d="M200,224H56a8,8,0,0,1-8-8V40a8,8,0,0,1,8-8h96l56,56V216A8,8,0,0,1,200,224Z"
        stroke="currentColor"
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polyline
        points="152 32 152 88 208 88"
        stroke="currentColor"
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="128"
        y1="120"
        x2="128"
        y2="184"
        stroke="currentColor"
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polyline
        points="104 160 128 184 152 160"
        stroke="currentColor"
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </a>
)

export default ResumeBanner
