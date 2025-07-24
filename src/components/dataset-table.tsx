
import React, { useRef, useCallback } from "react";

type Dataset = {
  title: string
  headers: string[]
  rows: string[][]
}

function isValidUrl(str: string): boolean {
  try {
    const url = new URL(str)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

type DatasetTableProps = {
  dataset: Dataset
  minWideCols?: number
}

const DatasetTable = ({ dataset, minWideCols = 4 }: DatasetTableProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isWide = dataset.headers.length > minWideCols;

  // Drag state
  const isDown = useRef(false);
  const startX = useRef(0);
  const startY = useRef(0);
  const scrollLeft = useRef(0);
  const scrollTop = useRef(0);

  // Stable mousemove handler
  const onMouseMove = useCallback((e: MouseEvent) => {
    if (!isWide || !isDown.current || !containerRef.current) return;
    e.preventDefault();

    // Calculate how far the mouse has moved
    const walkX = e.pageX - startX.current;
    const walkY = e.pageY - startY.current;

    // Set the new scroll position
    containerRef.current.scrollLeft = scrollLeft.current - walkX;
    containerRef.current.scrollTop = scrollTop.current - walkY;
  }, [isWide]);

  // Stable mouseup handler
  const onMouseUp = useCallback(() => {
    if (!isWide) return;
    isDown.current = false;
    document.body.style.cursor = "";
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
  }, [isWide, onMouseMove]);

  // mousedown handler
  const onMouseDown = (e: React.MouseEvent) => {
    if (!isWide || !containerRef.current) return;
    isDown.current = true;
    
    // Store the initial mouse position on the page
    startX.current = e.pageX;
    startY.current = e.pageY;
    
    // Store the initial scroll position of the container
    scrollLeft.current = containerRef.current.scrollLeft;
    scrollTop.current = containerRef.current.scrollTop;

    document.body.style.cursor = "grabbing";
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  return (
    <div className="w-full my-8">
      <h2 className="text-2xl font-semibold mb-4">{dataset.title}</h2>
      <div
        ref={containerRef}
        className={`w-full overflow-auto shadow border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 ${isWide ? "cursor-grab" : ""}`}
        style={{ userSelect: isWide ? "none" : "auto" }}
        onMouseDown={onMouseDown}
      >
        <table className={`${isWide ? "min-w-[1400px]" : "w-full"} table-auto text-left border-collapse`}>
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              {dataset.headers.map((header, i) => (
                <th
                  key={i}
                  className="px-4 py-2 font-bold border-b border-r border-gray-200 dark:border-gray-700 whitespace-nowrap last:border-r-0"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dataset.rows.map((row, i) => (
              <tr key={i} className="even:bg-gray-50 dark:even:bg-gray-900">
                {row.map((cell, j) => (
                  <td
                    key={j}
                    className="px-4 py-2 border-b border-r border-gray-100 dark:border-gray-800 whitespace-nowrap last:border-r-0"
                  >
                    {isValidUrl(cell) ? (
                      <a
                        href={cell}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline dark:text-blue-400 hover:text-blue-800"
                      >
                        {cell}
                      </a>
                    ) : (
                      cell
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DatasetTable;