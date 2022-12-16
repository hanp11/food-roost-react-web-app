import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {configureStore} from "@reduxjs/toolkit";
import {Provider} from "react-redux";
import recipesReducer from "./reducers/edamam/recipes-reducer";
import usersReducer from "./reducers/users-reducer";
import followsReducer from "./reducers/follows-reducer";
import myRecipesReducer from "./reducers/recipes-reducer";
import likesReducer from "./reducers/likes-reducer";
import recipeOfTheDayReducer from "./reducers/recipe-of-the-day-reducer";

const root = ReactDOM.createRoot(document.getElementById('root'));
const store = configureStore({
  reducer: {
    recipesData: recipesReducer,
    users: usersReducer,
    follows: followsReducer,
    myRecipes: myRecipesReducer,
    likes: likesReducer,
    recipeOfTheDay: recipeOfTheDayReducer,
  }
});

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
