import {createAsyncThunk} from "@reduxjs/toolkit";
import * as service from "./edamam-service"

export const findRecipesThunk = createAsyncThunk(
    'edamam/findRecipes',
    async (queryText) => await service.findRecipes(queryText)
)