import {createSlice} from "@reduxjs/toolkit";

const usersReducer = createSlice({
  name: 'users',
  initialState: {
    currentUser: null
  },
  extraReducers: {
    [signupThunk.fulfilled]: (state, action) => {},
    [loginThunk.fulfilled]: (state, action) => {},
    [profileThunk.fulfilled]: (state, action) => {},
    [logoutThunk.fulfilled]: (state, action) => {},
  }
})

export default usersReducer.reducer;