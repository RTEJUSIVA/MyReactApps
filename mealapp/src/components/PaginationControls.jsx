import React from "react";

const PaginationControls = ({
  currentPage,
  totalPages,
  goToPage,
  nextPage,
  prevPage,
}) => {
  // Create an array of page numbers for rendering the buttons
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const baseClasses =
    "px-4 py-2 border rounded-lg mx-1 text-sm font-medium transition duration-150 ease-in-out cursor-pointer";
  const defaultClasses =
    "bg-white text-gray-700 hover:bg-gray-100 border-gray-300 cursor-pointer";
  const activeClasses =
    "bg-blue-600 text-white border-blue-600 hover:bg-blue-700 cursor-pointer";
  const disabledClasses =
    "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-300 cursor-pointer";

  return (
    <div className="flex justify-center items-center py-6">
      {/* Previous Button */}
      <button
        onClick={prevPage}
        disabled={currentPage === 1}
        className={`${baseClasses} ${
          currentPage === 1 ? disabledClasses : defaultClasses
        }`}
      >
        Previous
      </button>

      {/* Page Number Buttons */}
      <nav
        className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
        aria-label="Pagination"
      >
        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => goToPage(page)}
            aria-current={currentPage === page ? "page" : undefined}
            className={`${baseClasses} ${
              currentPage === page ? activeClasses : defaultClasses
            }`}
          >
            {page}
          </button>
        ))}
      </nav>

      {/* Next Button */}
      <button
        onClick={nextPage}
        disabled={currentPage === totalPages}
        className={`${baseClasses} ${
          currentPage === totalPages ? disabledClasses : defaultClasses
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default PaginationControls;
