import {createSlice} from "@reduxjs/toolkit";
import {
  findRecipesLikedByUserThunk, findUsersThatLikeRecipeThunk,
  userLikesRecipeThunk
} from "../services/likes-thunks";

const initialState = {
  likesRecipes: [],
  likesUsers: [],
  loading: false
}

export const likesReducer = createSlice({
  name: 'likes',
  initialState,
  extraReducers: {
    [userLikesRecipeThunk.fulfilled]: (state, {payload}) => {
      state.likesRecipes = payload
    },
    [userLikesRecipeThunk.fulfilled]: (state, {payload}) => {
      state.likesRecipes = payload
    },
    [findRecipesLikedByUserThunk.fulfilled]: (state, {payload}) => {
      state.likesRecipes = payload
    },
    [findRecipesLikedByUserThunk.rejected]: (state) => {
      state.likesRecipes = []
    },
    [findUsersThatLikeRecipeThunk.fulfilled]: (state, {payload}) => {
      state.likesUsers = payload
    },
  }
})

export default likesReducer.reducer;