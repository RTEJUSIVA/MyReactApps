import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import { searchMeals } from "../api/mealDB";
import MealCard from "../components/MealCard";
import usePagination from "../Hooks/usePagination";
import PaginationControls from "../components/PaginationControls";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const {
    currentItems,
    currentPage,
    totalPages,
    goToPage,
    nextPage,
    prevPage,
  } = usePagination(meals, 10);

  useEffect(() => {
    if (!query) {
      setMeals([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    searchMeals(query)
      .then((res) => setMeals(res.data.meals || []))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [query]);

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <div className="flex max-w-7xl mx-auto p-1 gap-5">
        <h1 className="flex max-w-7xl mx-auto p-6 pb-1 pl-0 ">
          <span className="text-3xl md:text-2xl font-semibold text-emerald-900 text-center mb-8">
            Search Results for "{query}"
          </span>
        </h1>
      </div>
      <div className="mx-auto flex items-center justify-center flex-col max-w-7xl">
        {currentItems.length === 0 ? (
          <p>No Search Results Found</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-10">
            {currentItems.map((meal) => (
              <MealCard key={meal.idMeal} meal={meal} />
            ))}
          </div>
        )}
      </div>
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

export default SearchResults;
