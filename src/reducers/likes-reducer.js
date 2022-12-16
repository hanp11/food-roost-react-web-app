import {createSlice} from "@reduxjs/toolkit";
import {
  findRecipesLikedByUserThunk, findUsersThatLikeRecipeThunk,
  userLikesRecipeThunk
} from "../services/likes-thunks";

const initialState = {
  likes: [],
  loading: false
}

export const likesReducer = createSlice({
  name: 'likes',
  initialState,
  extraReducers: {
    [userLikesRecipeThunk.fulfilled]: (state, {payload}) => {
      state.likes = payload
    },
    [userLikesRecipeThunk.fulfilled]: (state, {payload}) => {
      state.likes = payload
    },
    [findRecipesLikedByUserThunk.fulfilled]: (state, {payload}) => {
      state.likes = payload
    },
    [findRecipesLikedByUserThunk.rejected]: (state) => {
      state.likes = []
    },
    [findUsersThatLikeRecipeThunk.fulfilled]: (state, {payload}) => {
      state.likes = payload
    },
  }
})

export default likesReducer.reducer;