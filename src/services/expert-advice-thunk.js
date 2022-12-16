import {createAsyncThunk} from "@reduxjs/toolkit";
import {
  createExpertAdvice, findAllExpertAdvice,
  findExpertAdviceByUsernames
} from "./expert-advice-service";

export const createExpertAdviceThunk = createAsyncThunk(
    'createExpertAdvice',
    async (data) => await createExpertAdvice(data)
)

export const findAllExpertAdviceThunk = createAsyncThunk(
    'findAllExpertAdvice',
    async () => await findAllExpertAdvice()
)

export const findExpertAdviceByUsernamesThunk = createAsyncThunk(
    'findExpertAdviceByUsernames',
    async (data) => await findExpertAdviceByUsernames(data)
)