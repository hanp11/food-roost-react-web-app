import {createAsyncThunk} from "@reduxjs/toolkit";
import * as service from "./edamam-service"

export const findRecipesThunk = createAsyncThunk(
    'edamam/findRecipes',
    async (queryText) => await service.findRecipes(queryText)
)

export const findRecipeWithIdThunk = createAsyncThunk(
    'edamam/findRecipeWithId',
    async (recipeId) => await service.findRecipeWithId(recipeId)
)