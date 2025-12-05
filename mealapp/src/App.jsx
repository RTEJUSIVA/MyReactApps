import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Header from "./components/Header";
import CategoryMeals from "./Pages/CategoryMeals";
import Favorites from "./Pages/Favorites";
import MealDetail from "./Pages/MealDetail";
import { FavoritesProvider } from "./ContextAPI/FavoriteContext.jsx";
import SearchResults from "./Pages/SearchResults.jsx";
import Breadcrumb from "./components/Breadcrumb.jsx";
import Category from "./Pages/Category.jsx";
import Meal from "./Pages/Meal.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <FavoritesProvider>
          <Header />
          <Breadcrumb />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category" element={<Category />} />
            <Route path="/meal" element={<Meal />} />
            <Route path={`/category/:category`} element={<CategoryMeals />} />
            <Route path={`/meal/:id`} element={<MealDetail />} />
            <Route path={"/favorites"} element={<Favorites />} />
            <Route path={"/search"} element={<SearchResults />} />
          </Routes>
        </FavoritesProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
