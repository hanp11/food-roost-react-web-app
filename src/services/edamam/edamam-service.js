import axios from "axios";

const EDAMAM_API = 'https://api.edamam.com/api/recipes/v2';
const APP_TYPE = 'public';
const APP_ID = 'f4dca695';
const APP_KEY = '7051d31856b13ccc9bd37da657093bc5';

export const findRecipes = async (queryText) => {
  const params = {
    type: APP_TYPE,
    app_id: APP_ID,
    app_key: APP_KEY,
    q: queryText
  };
  const response = await axios.get(EDAMAM_API, { params });
  return response.data;
}