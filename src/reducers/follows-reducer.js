import {createSlice} from "@reduxjs/toolkit";
import {
  findFollowersThunk,
  findFollowingThunk,
  followUserThunk, unfollowUserThunk
} from "../services/follows-thunks";

const followsReducer = createSlice({
  name: 'follows',
  initialState: {
    following: [],
    followers: []
  },
  extraReducers: {
    [followUserThunk.fulfilled]: (state, {payload}) => {
      state.following = payload
    },
    [unfollowUserThunk.fulfilled]: (state, {payload}) => {
      state.following = payload
    },
    [findFollowersThunk.fulfilled]: (state, {payload}) => {
      state.followers = payload
    },
    [findFollowingThunk.fulfilled]: (state, {payload}) => {
      state.following = payload
    },
  }
})

export default followsReducer.reducer;