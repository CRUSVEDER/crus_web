import { useState } from "react";
import Link from "next/link";
import type { GetStaticProps } from "next";
import Layout from "@/components/layout";

type PdfItem = { name: string; fileId: string };

interface PdfLibraryProps {
  pdfFiles: PdfItem[];
}

// Fetch files from Google Drive folder
async function fetchDriveFiles(folderId: string, apiKey: string) {
  const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}' in parents and mimeType='application/pdf'&fields=files(id,name)&key=${apiKey}`;
  const res = await fetch(url);
  const data = await res.json();

  if (!data.files) return [];

  return data.files.map((file: any) => ({
    name: file.name.replace(/\.pdf$/i, ""),
    fileId: file.id,
  }));
}

export const getStaticProps: GetStaticProps<PdfLibraryProps> = async () => {
  const apiKey = process.env.GDRIVE_API_KEY;
  const folderIds = process.env.GDRIVE_FOLDER_IDS?.split(",") || [];

  let allFiles: PdfItem[] = [];

  if (!apiKey) {
    console.warn("Missing GDRIVE_API_KEY in .env. Returning empty PDF list.");
    return { props: { pdfFiles: [] } };
  }

  try {
    for (const folderId of folderIds) {
      const files = await fetchDriveFiles(folderId.trim(), apiKey);
      allFiles = allFiles.concat(files);
    }

    allFiles.sort((a, b) => a.name.localeCompare(b.name));
  } catch (error) {
    console.error("Error fetching PDF files from Google Drive:", error);
    return { props: { pdfFiles: [] } };
  }

  return { props: { pdfFiles: allFiles } };
};

export default function PdfLibrary({ pdfFiles }: PdfLibraryProps) {
  const [inputPassword, setInputPassword] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleUnlock = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/verify-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: inputPassword }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsUnlocked(true);
        setError(null);
      } else {
        setError(data.message || "Invalid password");
      }
    } catch (err) {
      setError("Failed to verify password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewPdf = (fileId: string) => {
    setIsLoading(true);
    const pdfUrl = `https://drive.google.com/file/d/${fileId}/preview`;
    try {
      window.open(pdfUrl, "_blank");
    } catch (err) {
      setError("Failed to open PDF. Please check the file or try downloading.");
    } finally {
      setIsLoading(false);
    }
  };

  const filteredPdfFiles = pdfFiles.filter((pdf) =>
    pdf.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isUnlocked) {
    return (
      <Layout>
        <h1 className="mb-8 w-full max-w-7xl text-6xl sm:text-8xl font-bold tracking-tighter leading-tight opacity-0 md:pr-8 lg:mb-12 dark:text-gray-100 animate-fade_in_up_10">
          locked files.{" "}
        </h1>
        <div className="flex flex-col items-center justify-center min-h-[80vh] gap-8 px-4 animate-fade_in_up_10 font-mono">
          <div className="w-full max-w-md bg-[#1c1c1c]/50 p-6 rounded-sm border border-black/20 dark:border-transparent shadow-md hover:shadow-lg transition-all duration-300">
            <label htmlFor="password" className="block text-gray-100 mb-2 text-lg">
              Enter Password
            </label>
            <input
              id="password"
              type="password"
              value={inputPassword}
              onChange={(e) => setInputPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-2 mb-4 bg-gray-300 dark:bg-gray-900 text-gray-800 dark:text-gray-100 rounded border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-300 dark:focus:ring-palevioletred transition"
              autoFocus
            />
            {error && <p className="text-red-400 mb-4">{error}</p>}
            <button
              onClick={handleUnlock}
              disabled={isLoading}
              className="w-full px-6 py-2 bg-gray-300 text-gray-800 rounded text-sm font-medium hover:bg-gray-400 dark:bg-palevioletred dark:text-gray-100 dark:hover:bg-pink-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Verifying..." : "Unlock"}
            </button>
          </div>
          <Link
            href="/"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Back to Home
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <h1 className="mb-8 w-full max-w-7xl text-6xl sm:text-8xl font-bold tracking-tighter leading-tight opacity-0 md:pr-8 lg:mb-12 dark:text-gray-100 animate-fade_in_up_10">
        files.{" "}
      </h1>
      <div className="w-full max-w-7xl mx-auto p-4 flex flex-col gap-8 animate-fade_in_up_10 min-h-[80vh] font-mono">
        {/* Search Bar */}
        <div className="relative w-full max-w-md">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search PDFs..."
            className="w-full px-4 py-2 bg-gray-300 dark:bg-gray-900 text-gray-800 dark:text-gray-100 rounded border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-300 dark:focus:ring-palevioletred font-mono transition"
            aria-label="Search PDFs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-800 dark:text-gray-100 hover:text-pink-300 dark:hover:text-pink-300"
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        {/* PDF List */}
        <ul className="flex flex-col gap-4">
          {filteredPdfFiles.length === 0 ? (
            <li className="text-gray-100 text-center text-base sm:text-lg">
              No PDFs found.
            </li>
          ) : (
            filteredPdfFiles.map((pdf, i) => (
              <li
                key={i}
                className="bg-[#1c1c1c]/50 text-white p-4 rounded-sm border border-black/20 dark:border-transparent shadow-md hover:shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <h2 className="text-base sm:text-lg font-semibold text-gray-100 flex-1">
                  {pdf.name}
                </h2>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleViewPdf(pdf.fileId)}
                    disabled={isLoading}
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded text-sm font-medium hover:bg-gray-400 dark:bg-palevioletred dark:text-gray-100 dark:hover:bg-pink-400 font-mono disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? "Loading..." : "View"}
                  </button>
                  <Link
                    href={`https://drive.google.com/uc?export=download&id=${pdf.fileId}`}
                    download
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded text-sm font-medium hover:bg-gray-400 dark:bg-blue-600 dark:text-gray-100 dark:hover:bg-blue-500 font-mono text-center"
                  >
                    Download
                  </Link>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </Layout>
  );
}