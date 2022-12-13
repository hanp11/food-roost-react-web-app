import {createSlice} from "@reduxjs/toolkit";
import {
  findUserByIdThunk,
  loginThunk, logoutThunk,
  profileThunk,
  registerThunk
} from "../services/users-thunks";

const usersReducer = createSlice({
  name: 'users',
  initialState: {
    currentUser: null,
    loading: false,
    publicProfile: null,
    error: null,
  },
  extraReducers: {
    [findUserByIdThunk.fulfilled]: (state, action) => {
      state.loading = false
      state.publicProfile = action.payload
      state.error = null
    },
    [registerThunk.fulfilled]: (state, action) => {
      state.loading = false
      state.currentUser = action.payload
      state.error = null
    },
    [registerThunk.rejected]: (state, action) => {
      state.loading = false
      state.currentUser = null
      state.error = action.payload
    },
    [loginThunk.fulfilled]: (state, action) => {
      state.loading = false
      state.currentUser = action.payload
      state.error = null
    },
    [loginThunk.rejected]: (state, action) => {
      state.loading = false
      state.currentUser = null
      state.error = action.payload
    },
    [logoutThunk.fulfilled]: (state) => {
      state.loading = false
      state.currentUser = null
      state.error = null
    },
    [profileThunk.fulfilled]: (state, action) => {
      state.loading = false
      state.currentUser = action.payload
      state.error = null
    },
  }
})

export default usersReducer.reducer;