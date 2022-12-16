import axios from "axios";

//TODO: change to environment variable
const BASE_API_URL = 'http://localhost:4000/api';//process.env.BASE_API_URL;
const USER_API_URL = `${BASE_API_URL}/users`;

const api = axios.create({withCredentials: true});

export const findUserById = async (uid) => {
  const response = await api.get(`${USER_API_URL}/${uid}`);
  const user = response.data;
  return user;
}

export const findAllUsers = async () => {
  const response = await axios.get(USER_API_URL);
  return response.data;
}

export const register = async (user) => {
  const response = await api.post(`${BASE_API_URL}/register`, user);
  const newUser = response.data;
  return newUser;
}

export const login = async (user) => {
  const response = await api.post(`${BASE_API_URL}/login`, user);
  return response.data;
}

export const logout = async () => {
  const response = await api.post(`${BASE_API_URL}/logout`);
  return response.data;
}

export const profile = async () => {
  const response = await api.get(`${BASE_API_URL}/profile`);
  return response.data;
}

export const updateUser = async (updates) => {
  const response = await api.put(`${USER_API_URL}/${updates._id}`, updates);
  return response.data;
}

const deleteUser = () => {}