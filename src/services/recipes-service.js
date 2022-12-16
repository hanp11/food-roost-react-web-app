import axios from "axios";

//TODO: change to environment variable
const BASE_API_URL = 'http://localhost:4000/api';//process.env.BASE_API_URL;
const RECIPES_API_URL = `${BASE_API_URL}/recipes`;

const api = axios.create({withCredentials: true});

export const createRecipe = async (recipe) => {
  const response = await api.post(RECIPES_API_URL, recipe)
  const actualRecipe = response.data
  return actualRecipe
}

export const findAllRecipes = async () => {
  const response = await api.get(RECIPES_API_URL)
  const recipes = response.data
  return recipes
}

export const findRecipeByEdamamId = async (edamamId) => {
  const response = await api.get(`${RECIPES_API_URL}/edamamId/${edamamId}`)
  const recipes = response.data
  return recipes
}