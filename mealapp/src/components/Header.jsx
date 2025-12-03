import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [query, setQuery] = useState("");
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/search?q=${encodeURIComponent(query)}`);
    setQuery("");
  };

  return (
    <header className="bg-blue-900 text-white shadow outline-0">
      <nav className="flex max-w-7xl mx-auto flex-col sm:flex-row p-3 gap-4 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="text-xl font-bold">
            MealDB
          </Link>
          <Link to="/">Home</Link>
          <Link to="/">Categories</Link>
          <Link to="/favorites">Favorites</Link>
        </div>
        <form className="flex gap-3" onSubmit={handleSubmit}>
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            placeholder="Enter Search Text"
            className="text-gray-600 bg-white px-2 py-1 rounded w-48 sm:w-64 outline-none"
          ></input>
          <button
            className="bg-blue-400 cursor-pointer text-white rounded-md px-3 py-1 outline-blue-400 border-blue-400"
            type="submit"
          >
            Search
          </button>
        </form>
      </nav>
    </header>
  );
};

export default Header;
