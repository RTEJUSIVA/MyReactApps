import React from "react";

const Favorites = ({ isFav, onToggle, meal }) => {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onToggle(meal);
      }}
      className={`absolute cursor-pointer top-1 right-2 w-10 h-10 rounded-full ${
        isFav ? "bg-red-500 text-white" : "bg-white/80 text-gray-700"
      } text-xl`}
    >
      {isFav ? "❤︎" : "♡"}
    </button>
  );
};

export default Favorites;
