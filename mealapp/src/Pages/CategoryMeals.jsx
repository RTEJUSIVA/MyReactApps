import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMealsbyCategory } from "../api/mealDB";
import LoadingSpinner from "../components/LoadingSpinner";
import MealCard from "../components/MealCard";
import usePagination from "../Hooks/usePagination";
import PaginationControls from "../components/PaginationControls";

const CategoryMeals = () => {
  const { category } = useParams();
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
    setLoading(true);
    fetchMealsbyCategory(category)
      .then((res) => {
        setMeals(res.data.meals) || [];
        // console.log(res.data.meals);
      })
      // .then((res) => {
      //   console.log(res);
      // })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [category]);

  if (loading) return <LoadingSpinner />;
  return (
    <div className="mx-auto flex items-center justify-center flex-col max-w-6xl">
      {currentItems.length === 0 ? (
        <p>No Meals Found</p>
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
        Showing **{currentItems.length}** of **{meals.length}** total items.
        (Page {currentPage} of {totalPages})
      </p>
    </div>
  );
};

export default CategoryMeals;
