import {createSlice} from "@reduxjs/toolkit";
import {
  findAllRecipeOfTheDayThunk,
  userSelectsRecipeOfTheDayThunk
} from "../services/recipe-of-the-day-thunk";

const initialState = {
  recipeOfTheDay: {},
  loading: false
}

export const recipeOfTheDayReducer = createSlice({
  name: 'recipeOfTheDay',
  initialState,
  extraReducers: {
    [userSelectsRecipeOfTheDayThunk.fulfilled]: (state, {payload}) => {
      state.recipeOfTheDay = payload
    },
    [findAllRecipeOfTheDayThunk.fulfilled]: (state, {payload}) => {
      const compare = new Date().toISOString().split('T')[0];
      state.recipeOfTheDay = payload.filter(r => new Date(payload[0].date).toISOString().split('T')[0] === compare)?.[0];
    }
  }
})

export default recipeOfTheDayReducer.reducer;