import { useState, useMemo } from 'react';

/**
 * Custom hook to handle pagination logic.
 * @param {Array<any>} data - The full list of items to paginate.
 * @param {number} itemsPerPage - The number of items to show per page.
 * @returns {{
 * currentPage: number,
 * currentItems: Array<any>,
 * totalPages: number,
 * goToPage: (page: number) => void,
 * nextPage: () => void,
 * prevPage: () => void,
 * }}
 */
const usePagination = (data, itemsPerPage = 10) => {
  const [currentPage, setCurrentPage] = useState(1);

  // 1. Calculate the total number of pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // 2. Calculate the slice of data for the current page
  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  }, [data, currentPage, itemsPerPage]);

  // 3. Functions to control page navigation
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const nextPage = () => {
    goToPage(currentPage + 1);
  };

  const prevPage = () => {
    goToPage(currentPage - 1);
  };

  return {
    currentPage,
    currentItems,
    totalPages,
    goToPage,
    nextPage,
    prevPage,
  };
};

export default usePagination;