import {createSlice} from "@reduxjs/toolkit";
import {findRecipesThunk} from "../../services/edamam/edamam-thunks";

const initialState = {
  recipes: [],
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
      state.loading = true
      state.recipes = payload
    },
    [findRecipesThunk.rejected]: (state) => {
      state.loading = false
    }
  }
});

export default recipesSlice.reducer;