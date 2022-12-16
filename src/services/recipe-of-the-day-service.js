import axios from "axios";

//TODO: change to environment variable
const BASE_API_URL = 'http://localhost:4000/api';//process.env.BASE_API_URL;
const RECIPE_OF_THE_DAY_API_URL = `${BASE_API_URL}/recipeOfTheDay`;

const api = axios.create({withCredentials: true})

export const userSelectsRecipeOfTheDay = async (data) => {
  const response = await api.post(`${RECIPE_OF_THE_DAY_API_URL}`, data)
  return response.data
}

export const findAllRecipeOfTheDay = async () => {
  const response = await api.get(RECIPE_OF_THE_DAY_API_URL)
  return response.data
}