// src/components/layout-project.tsx
import React from 'react';
import Mask from '@/components/mask';
import Navbar from '@/components/nav';
import Footer from '@/components/footer';
import useStore from '@/lib/zustand'; // Default import

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const { theme } = useStore();
  const dotColor = theme === 'dark' ? '333333' : '777777'; // Hex without # for SVG encoding
  const dotOpacity = '0.8'; // ~80% for visibility

  // Inline SVG with dynamic fill
  const svgBackground = `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='10' cy='10' r='0.5' fill='%23${dotColor}' fill-opacity='${dotOpacity}'/%3E%3C/svg%3E")`;

  return (
    <div
      className="flex overflow-hidden overflow-y-auto flex-col items-center px-6 h-full duration-500 xl:px-0 dark:bg-gray-900 selection:bg-pink-300 selection:text-white dark:selection:bg-palevioletred"
      style={{
        backgroundImage: svgBackground,
        backgroundSize: '20px 20px',
        backgroundRepeat: 'repeat',
        backgroundPosition: '0 0',
      }}
    >
      
      <Mask />
      <Navbar />
      <main className="flex relative flex-col flex-1 items-center max-w-7xl">{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
