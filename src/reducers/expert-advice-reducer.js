import {createSlice} from "@reduxjs/toolkit";
import {
  createExpertAdviceThunk, findAllExpertAdviceThunk,
  findExpertAdviceByUsernamesThunk
} from "../services/expert-advice-thunk";

const initialState = {
  expertAdvice: [],
  loading: false
}

export const expertAdviceReducer = createSlice({
  name: 'expertAdvice',
  initialState,
  extraReducers: {
    [createExpertAdviceThunk.fulfilled]: (state, {payload}) => {
      state.expertAdvice = payload
    },
    [findAllExpertAdviceThunk.fulfilled]: (state, {payload}) => {
      state.expertAdvice = payload
    },
    [findExpertAdviceByUsernamesThunk.fulfilled]: (state, {payload}) => {
      state.expertAdvice = payload
    }
  }
})

export default expertAdviceReducer.reducer;