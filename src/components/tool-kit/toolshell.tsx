import React from "react";

type ToolShellProps = {
  title: string;
  description?: string; // optional 
  children: React.ReactNode;
};


const ToolShell: React.FC<ToolShellProps> = ({ title, description, children }) => {
  return (
    <div className="bg-[#1c1c1c]/50 text-white font-mono p-6 rounded-md border border-black/20 dark:border-transparent shadow-md w-full max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      {description && <p className="text-gray-400 mb-4">{description}</p>}
      <div className="text-gray-100">{children}</div>
    </div>
  );
};

export default ToolShell;
