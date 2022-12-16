import axios from "axios";

//TODO: change to environment variable
const BASE_API_URL = 'http://localhost:4000/api';//process.env.BASE_API_URL;
const EXPERT_ADVICE_API_URL = `${BASE_API_URL}/expertAdvice`;

const api = axios.create({withCredentials: true})

export const createExpertAdvice = async (data) => {
  const response = await api.post(EXPERT_ADVICE_API_URL, data);
  return response.data;
}

export const findAllExpertAdvice = async () => {
  const response = await api.get(EXPERT_ADVICE_API_URL);
  return response.data;
}

export const findExpertAdviceByUsernames = async (data) => {
  const response = await api.get(`${EXPERT_ADVICE_API_URL}/usernames`, data);
  return response.data;
}