// components/CodeBlock.tsx
import React, { useRef, useState, useEffect } from 'react';

// SVG Icon for Copy (two overlapping squares)
const CopyIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-4 h-4" // Tailwind classes for width and height
  >
    <path d="M7 6V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-3v3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h4Zm2 0h7a1 1 0 0 1 1 1v7H9V6Zm-4 2v10h10V8H5Z"></path>
  </svg>
);

// SVG Icon for Checkmark (simple tick)
const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-4 h-4" // Tailwind classes for width and height
  >
    <path
      fillRule="evenodd"
      d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9.25 12.004a.75.75 0 0 1-1.154.114l-6.5-6.75a.75.75 0 0 1 1.146-.99l5.976 6.186 8.72-11.336a.75.75 0 0 1 1.04-.208Z"
      clipRule="evenodd"
    ></path>
  </svg>
);

// Define the props for your CodeBlock component
interface CodeBlockProps {
  children: React.ReactNode; // The actual code content
  className?: string; // Class name passed by markdown-it/MDX for language (e.g., 'language-js')
}

const CodeBlock: React.FC<CodeBlockProps> = ({ children, className }) => {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  // Reset copied state after a short delay
  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => {
        setCopied(false);
      }, 2000); // Reset "Copied!" after 2 seconds
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const handleCopy = async () => {
    if (preRef.current) {
      const codeToCopy = preRef.current.textContent;
      try {
        if (codeToCopy) {
          await navigator.clipboard.writeText(codeToCopy);
          setCopied(true);
        }
      } catch (err) {
        console.error('Failed to copy code: ', err);
      }
    }
  };

  return (
    <div className="relative mb-6"> {/* Use Tailwind for positioning and margin */}
      <pre
        ref={preRef}
        className={`${className || ''} bg-gray-800 text-gray-50 p-4 rounded-md overflow-x-auto text-sm leading-relaxed`}
      >
        {children}
      </pre>
      <button
        onClick={handleCopy}
        // Tailwind classes for styling the button:
        // absolute positioning, small padding, rounded corners, text color (for icon)
        // subtle background color (like the screenshot), no transition (for simplicity)
        // focus states for accessibility
        className="absolute top-2 right-2 p-1.5 rounded-md cursor-pointer text-gray-400
                   bg-white/5 hover:bg-white/10
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        title={copied ? 'Copied!' : 'Copy code'} // Tooltip text on hover
      >
        {/* Conditional rendering of icons */}
        {copied ? <CheckIcon /> : <CopyIcon />}
      </button>
    </div>
  );
};

export default CodeBlock;