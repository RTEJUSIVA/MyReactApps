import React, { useState, useEffect } from "react";

const Pagination = () => {
  const [data, setData] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const [currentpage, setCurrentPage] = useState(1);
  const [postperpage, setPostPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");
        const result = await res.json();
        setData(result);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  if (isloading) {
    return <p className="text-center text-gray-500 mt-10">Loading...</p>;
  }

  const indexOfLastPost = currentpage * postperpage;
  const indexOfFirstPost = indexOfLastPost - postperpage;

  const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(data.length / postperpage);

  const paginate = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Title */}
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Simple Pagination
      </h1>

      {/* Data list */}
      <ul className="divide-y divide-gray-200 bg-white rounded-lg shadow">
        {currentPosts.map((data) => (
          <li key={data.id} className="px-4 py-3 hover:bg-gray-50 transition">
            <span className="font-semibold text-gray-700">{data.id}.</span>{" "}
            <span className="text-gray-600">{data.title}</span>
          </li>
        ))}
      </ul>

      {/* Pagination controls */}
      <div className="flex items-center justify-center gap-2 mt-6 flex-wrap">
        {/* First */}
        <button
          className="px-3 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => paginate(1)}
          disabled={currentpage === 1}
        >
          First
        </button>

        {/* Previous */}
        <button
          className="px-3 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => paginate(currentpage - 1)}
          disabled={currentpage === 1}
        >
          Prev
        </button>

        {/* Page numbers */}
        {new Array(totalPages).fill(0).map((_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`px-3 py-2 text-sm font-medium rounded-lg transition 
              ${
                currentpage === index + 1
                  ? "bg-blue-700 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
          >
            {index + 1}
          </button>
        ))}

        {/* Next */}
        <button
          className="px-3 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => paginate(currentpage + 1)}
          disabled={currentpage === totalPages}
        >
          Next
        </button>

        {/* Last */}
        <button
          className="px-3 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => paginate(totalPages)}
          disabled={currentpage === totalPages}
        >
          Last
        </button>
      </div>
    </div>
  );
};

export default Pagination;
