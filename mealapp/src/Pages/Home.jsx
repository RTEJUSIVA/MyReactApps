import React, { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import { fetchCategories } from "../api/mealDB";
import { Link } from "react-router-dom";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories()
      .then((res) => {
        setCategories(res.data.categories);
        //console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  if (loading) return <LoadingSpinner />;
  return (
    <div className="flex items-center justify-center flex-col">
      <div className="w-full text-center text-3xl text-blue-950 mt-4 mb-2">
        All Food Categories
      </div>
      <div className="w-full text-center">All Listed in One Place</div>
      <div className="w-50 h-1 bg-cyan-800 rounded text-center mt-3"></div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-10">
        {categories.map((cat) => {
          return (
            <div key={cat.idCategory} className="block object-cover">
              <Link
                to={`/category/${cat.strCategory}`}
                className="group cursor-pointer"
              >
                <img
                  src={cat.strCategoryThumb}
                  alt={cat.strCategory}
                  className="w-full rounded-lg shadow group-hover:shadow-xl transition"
                />
                <p className="text-center mt-2 font-medium">
                  {cat.strCategory}
                </p>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
