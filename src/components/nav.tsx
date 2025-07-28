import { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";


const DarkToggle = dynamic(() => import("@/components/dark-toggle"));

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="relative w-full max-w-7xl py-8 px-4 animate-fade_in">
      {/* Top Bar */}
      <div className="flex justify-between items-center">
        <Link href="/" className="text-xl font-mono font-bold dark:text-gray-100 text-gray-800 hover:text-pink-500">
          Yash.
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-6 font-mono text-xl font-light text-gray-800 dark:text-gray-100">
          <li><Link href="/" className="p-0.5">home</Link></li>
          <li><Link href="/about" className="p-0.5">about</Link></li>
          <li><Link href="/projects" className="p-0.5">projects</Link></li>
          <li><Link href="/blog" className="p-0.5">blog</Link></li>
          <li><Link href="/dataset" className="p-0.5">dataset</Link></li>
          <li><Link href="/ctf_tool" className="p-0.5 block">tools</Link></li>
          <li><Link href="https://crusblog.vercel.app" className="p-0.5">ctf</Link></li>
          <li><Link href="/dashbord" className="p-0.5">dashbord</Link></li>
        </ul>

        {/* Dark Toggle + Mobile Button */}
        <div className="flex items-center gap-4">
          <DarkToggle />
          <button
            className="md:hidden text-gray-800 dark:text-gray-100"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            {isOpen ? (
              // X Icon (Close)
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              // Hamburger Icon
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}`}
      >
        <ul className="flex flex-col gap-4 font-mono text-lg font-light text-gray-800 dark:text-gray-100 mt-4">
          <li><Link href="/" className="p-0.5 block">home</Link></li>
          <li><Link href="/about" className="p-0.5 block">about</Link></li>
          <li><Link href="/projects" className="p-0.5 block">projects</Link></li>
          <li><Link href="/blog" className="p-0.5 block">blog</Link></li>
          <li><Link href="/dataset" className="p-0.5 block">dataset</Link></li>
          <li><Link href="/ctf_tool" className="p-0.5 block">tools</Link></li>
          <li><Link href="https://crusblog.vercel.app" className="p-0.5 block">ctf</Link></li>
          <li><Link href="/dashbord" className="p-0.5 block">dashbord</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;