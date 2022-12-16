import {createAsyncThunk} from "@reduxjs/toolkit";
import {
  findRecipesLikedByUser, findUsersThatLikeRecipe,
  userLikesRecipe, userUnlikesRecipe
} from "./likes-service";

export const userLikesRecipeThunk = createAsyncThunk(
    'userLikesRecipe',
    async (rid) => await userLikesRecipe(rid)
)

export const userUnlikesRecipeThunk = createAsyncThunk(
    'userUnlikesRecipe',
    async (rid) => await userUnlikesRecipe(rid)

)

export const findRecipesLikedByUserThunk = createAsyncThunk(
    'findRecipesLikedByUser',
    async (uid) => await findRecipesLikedByUser(uid)
)

export const findUsersThatLikeRecipeThunk = createAsyncThunk(
    'findUsersThatLikeRecipe',
    async (rid) => await findUsersThatLikeRecipe(rid)
)