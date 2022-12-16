import {createAsyncThunk} from "@reduxjs/toolkit";
import {
  findAllRecipeOfTheDay,
  userSelectsRecipeOfTheDay
} from "./recipe-of-the-day-service";

export const userSelectsRecipeOfTheDayThunk = createAsyncThunk(
    'userSelectsRecipeOfTheDay',
    async (data) => await userSelectsRecipeOfTheDay(data)
)

export const findAllRecipeOfTheDayThunk = createAsyncThunk(
    'findRecipeOfTheDayByDate',
    async () => await findAllRecipeOfTheDay()
)