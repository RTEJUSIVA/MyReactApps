import React from "react";
import { useFavorites } from "../ContextAPI/FavoriteContext";
import MealCard from "../components/MealCard";

const Favorites = () => {
  const { favorites } = useFavorites();
  console.log(favorites);
  return (
    <div className="mx-auto flex items-center justify-center flex-col max-w-7xl">
      {favorites.length === 0 ? (
        <p>No Favorites Found</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-10">
          {favorites.map((meal) => (
            <MealCard key={meal.idMeal} meal={meal} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Favorites
