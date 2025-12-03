import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFavorites } from "../ContextAPI/FavoriteContext";
import { fetchMealbyID } from "../api/mealDB";
import LoadingSpinner from "../components/LoadingSpinner";
import Favorites from "../components/Favorites";

const MealDetail = () => {
  const { id } = useParams();

  const { toggle, isfavorite } = useFavorites();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchMealbyID(id)
      .then((res) => {
        setMeal(res.data.meals?.[0] || []);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);
  if (loading) {
    return <LoadingSpinner />;
  }
  if (!meal) {
    return <p>Meal detail not found</p>;
  }
  const ingredients = [];
  for (let i = 0; i <= 20; i++) {
    const ing = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ing?.trim()) ingredients.push(`${measure} ${ing}`);
  }
  return (
    <>
      <div>
        <h1 className="flex max-w-7xl mx-auto p-6 pb-1 pl-0 ">
          <span className="text-3xl md:text-2xl font-semibold text-emerald-900 text-center mb-8">
            {meal.strMeal}
          </span>
        </h1>
      </div>
      <div className="flex max-w-7xl mx-auto p-1 gap-5">
        <div className="flex-3 max-w-2xl gap-2">
          <div className="relative">
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className="w-full rounded shadow-sm"
            />
            <div className="absolute top-4 right-4">
              <Favorites
                meal={meal}
                onToggle={toggle}
                isFav={isfavorite(meal.idMeal)}
              />
            </div>
          </div>
        </div>
        <div className="flex-9 max-w-2xl gap-2">
          <div className="flex flex-col items-start">
            <div className="flex gap-2 text-sm">
              <span className="rounded-full font-medium text-blue-700 bg-blue-100 px-4 py-2">
                {meal.strArea}
              </span>
              <span className="rounded-full font-medium text-green-700 bg-blue-100 px-4 py-2">
                {meal.strCategory}
              </span>
            </div>
            <div className="flex text-md mt-4 font-medium">Ingredients</div>
            <div className="flex text-md mt-2">
              <ul>
                {ingredients.map((item, idMeal) => {
                  return (
                    <li key={idMeal} className="flex gap-3 items-center">
                      <span className="text-sm">*</span>
                      <span className="text-gray-600">{item}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="flex text-md mt-4 font-medium">
              {meal.strYoutube && (
                <a
                  href={meal.strYoutube}
                  target="_blank"
                  className="bg-red-700 hover:bg-red-800 cursor-pointer text-white text-sm px-3 py-2 rounded"
                >
                  Watch Video
                </a>
              )}
            </div>
            <div className="flex flex-col text-md mt-4">
              <span className="font-medium mb-2">Instructions</span>
              <span>{meal.strInstructions}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MealDetail;
