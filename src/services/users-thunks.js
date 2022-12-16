import {createAsyncThunk} from "@reduxjs/toolkit";
import {
  findAllUsers,
  findUserById,
  login,
  logout,
  profile,
  register,
  updateUser
} from "./users-service";

export const findUserByIdThunk = createAsyncThunk(
    'findUserById',
    async (uid) => await findUserById(uid)
)

export const findAllUsersThunk = createAsyncThunk(
    'findAllUsers',
    async () => await findAllUsers()
)

export const registerThunk = createAsyncThunk(
    'register',
    async (user, { rejectWithValue }) => {
      try {
        return await register(user);
      } catch (e) {
        return rejectWithValue(e.response.data);
      }
    }
)

export const loginThunk = createAsyncThunk(
    'login',
    async (user, { rejectWithValue}) => {
      try {
        return await login(user);
      } catch (e) {
        return rejectWithValue(e.response.data);
      }
    }
)

export const logoutThunk = createAsyncThunk(
    'logout',
    async () => await logout()
)

export const profileThunk = createAsyncThunk(
    'profile',
    async () => await profile()
)

export const updateUserThunk = createAsyncThunk(
    'updateUser',
    async (updates) => await updateUser(updates)
)