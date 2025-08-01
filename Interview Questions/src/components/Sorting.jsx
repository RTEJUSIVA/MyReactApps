import React, { useState } from "react";

const Sorting = () => {
  const [numbers, setNumbers] = useState([5, 3, 8, 1, 2]);

  const sortNumbers = () => {
    const arr = [...numbers]; // Clone the array to avoid direct mutation
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          // Swap the numbers
          const temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
        }
      }
    }
    setNumbers(arr); // Update state with sorted array
  };
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Number Sorter</h2>
      <p className="mb-2">Numbers: {numbers.join(", ")}</p>
      <button
        onClick={sortNumbers}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Sort
      </button>
    </div>
  );
};

export default Sorting;
