import React from "react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const maxPagesToShow = 5;
  let start = Math.max(currentPage, 1);
  let end = Math.min(currentPage + maxPagesToShow, totalPages);

  const pages = [];
  for (let i = start; i < end; i++) {
    pages.push(i);
  }
  console.log(pages);
  return (
    <div className="mt-4 flex justify-center gap-2">
      {/* หน้าแรก + … */}
      {start > 1 && (
        <>
          <button onClick={() => onPageChange(1)} className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300">
            หน้าแรก
          </button>
          {start > 2 && <span className="px-2">...</span>}
        </>
      )}
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
      >
        Prev
      </button>
      {/* กลุ่มเลขหน้า */}
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`px-3 py-1 rounded ${currentPage === p ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
        >
          {p}
        </button>
      ))}
      {end < totalPages && (
        <>
          <button
            onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            Next
          </button>
        </>
      )}
      {/* หน้าสุดท้าย + … */}
      {start > 1 && (
        <>
          {start > 2 && <span className="px-2">...</span>}

          <button onClick={() => onPageChange(totalPages)} className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300">
            หน้าสุดท้าย
          </button>
        </>
      )}
    </div>
  );
}
