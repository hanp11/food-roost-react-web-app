import {createSlice} from "@reduxjs/toolkit";
import {findRecipesThunk, findRecipeWithIdThunk} from "../../services/edamam/edamam-thunks";

const initialState = {
  recipes: [],
  currentRecipe: null,
  loading: false
}

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  extraReducers: {
    [findRecipesThunk.pending]: (state) => {
      state.loading = true
      state.recipes = []
    },
    [findRecipesThunk.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.recipes = payload
    },
    [findRecipesThunk.rejected]: (state) => {
      state.loading = false
    },
    [findRecipeWithIdThunk.pending]: (state) => {
      state.loading = true
      state.currentRecipe = null
    },
    [findRecipeWithIdThunk.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.currentRecipe = payload
    },
    [findRecipeWithIdThunk.rejected]: (state) => {
      state.currentRecipe = false
    }
  }
});

export default recipesSlice.reducer;