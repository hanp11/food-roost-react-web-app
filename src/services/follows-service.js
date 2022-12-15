import axios from "axios";

//TODO: change to environment variable
const BASE_API_URL = 'http://localhost:4000/api';//process.env.BASE_API_URL;
const FOLLOWS_API = `${BASE_API_URL}/follows`;
const USER_API_URL = `${BASE_API_URL}/users`;

const api = axios.create({withCredentials: true});

export const followUser = async (follow) => {
  const response = await api.post(`${FOLLOWS_API}`, follow);
  return response.data;
}

export const findFollowers = async (followed) => {
  const response = await api.get(`${USER_API_URL}/${followed}/followers`);
  return response.data;
}

export const findFollowing = async (follower) => {
  const response = await api.get(`${USER_API_URL}/${follower}/following`);
  return response.data;
}