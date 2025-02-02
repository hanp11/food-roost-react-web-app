import {createSlice} from "@reduxjs/toolkit";
import {
  createRecipesThunk,
  findAllRecipesThunk, findRecipeByEdamamIdThunk
} from "../services/recipes-thunk";

const myRecipesReducer = createSlice({
  name: 'recipes',
  initialState: {
    recipes: []
  },
  extraReducers: {
    [findAllRecipesThunk.fulfilled]: (state, {payload}) => {
      state.recipes = payload
    },
    [createRecipesThunk.fulfilled]: (state, {payload}) => {
      state.recipes = payload
    },
    [findRecipeByEdamamIdThunk.fulfilled]: (state, {payload}) => {
      state.recipes = payload
    }
  }
})

export default myRecipesReducer.reducer;