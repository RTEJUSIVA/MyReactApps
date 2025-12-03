import axios from "axios";
const BASE = "https://www.themealdb.com/api/json/v1/1"

export const fetchCategories = () => axios.get(`${BASE}/categories.php`);
export const fetchMealsbyCategory = (cat) => axios.get(`${BASE}/filter.php?c=${cat}`);
export const fetchMealbyID = (id) => axios.get(`${BASE}/lookup.php?i=${id}`);
export const searchMeals = (query) => axios.get(`${BASE}/search.php?s=${query}`)