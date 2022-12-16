import {createAsyncThunk} from "@reduxjs/toolkit";
import {
  createRecipe,
  findAllRecipes,
  findRecipeByEdamamId
} from "./recipes-service";

export const createRecipesThunk = createAsyncThunk(
    'createRecipe',
    async (recipe) => await createRecipe(recipe)
)

export const findAllRecipesThunk = createAsyncThunk(
    'findAllRecipes',
    async () => await findAllRecipes()
)

export const findRecipeByEdamamIdThunk = createAsyncThunk(
    'findRecipeByEdamamId',
    async (edamamId) => await findRecipeByEdamamId(edamamId)
)