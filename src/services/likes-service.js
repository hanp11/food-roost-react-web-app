import axios from "axios";

//TODO: change to environment variable
const BASE_API_URL = 'http://localhost:4000/api';//process.env.BASE_API_URL;
const USER_API_URL = `${BASE_API_URL}/users`;
const RECIPES_API_URL = `${BASE_API_URL}/recipes`;

const api = axios.create({withCredentials: true})

export const userLikesRecipe = async (rid) => {
  const response = await api.post(`${USER_API_URL}/likes/${rid}`)
  return response.data
}

export const userUnlikesRecipe = async (rid) => {
  const response = await api.delete(`${USER_API_URL}/unlikes/${rid}`)
  return response.data
}

export const findRecipesLikedByUser = async (uid) => {
  const response = await api.get(`${USER_API_URL}/${uid}/likes`)
  return response.data
}

export const findUsersThatLikeRecipe = async (rid) => {
  const response = await api.get(`${RECIPES_API_URL}/${rid}/likes`)
  return response.data
}