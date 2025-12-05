import React from "react";
import { useFavorites } from "../ContextAPI/FavoriteContext";
import MealCard from "../components/MealCard";
import usePagination from "../Hooks/usePagination";
import PaginationControls from "../components/PaginationControls";

const Favorites = () => {
  const { favorites } = useFavorites();
  const {
    currentItems,
    currentPage,
    totalPages,
    goToPage,
    nextPage,
    prevPage,
  } = usePagination(favorites, 10);
  //console.log(currentItems);
  return (
    <div className="mx-auto flex items-center justify-center flex-col max-w-7xl">
      {currentItems.length === 0 ? (
        <p>No Favorites Found</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-10">
          {currentItems.map((meal) => (
            <MealCard key={meal.idMeal} meal={meal} />
          ))}
        </div>
      )}
      {/* 5. The Pagination Controls */}
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        goToPage={goToPage}
        nextPage={nextPage}
        prevPage={prevPage}
      />

      <p className="text-center text-sm text-gray-600 mt-4">
        Showing **{currentItems.length}** of **{currentItems.length}** total
        items. (Page {currentPage} of {totalPages})
      </p>
    </div>
  );
};

export default Favorites;
