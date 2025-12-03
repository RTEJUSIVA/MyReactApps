import React from "react";
import { Link } from "react-router-dom";
import Favorites from "../components/Favorites.jsx";
import { useFavorites } from "../ContextAPI/FavoriteContext.jsx";

const MealCard = ({ meal }) => {
  const { toggle, isfavorite } = useFavorites();
  const fav = isfavorite(meal.idMeal);
  return (
    <div className="relative" title={meal.strMeal}>
      <Favorites meal={meal} onToggle={toggle} isFav={fav} />
      <Link key={meal.idMeal} to={`/meal/${meal.idMeal}`} className="group">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="roundedw-full rounded-lg shadow group-hover:shadow-xl transition object-cover"
        />
        <p className="text-center truncate font-medium mt-2">{meal.strMeal}</p>
      </Link>
    </div>
  );
};

export default MealCard;
