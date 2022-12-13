import {createAsyncThunk} from "@reduxjs/toolkit";
import {findAllUsers, findUserById, login, logout, profile, register} from "./users-service";

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
    async (user, { rejectedWithValue }) => {
      const response = await register(user);

      if (response.status) {
        debugger;
        throw rejectedWithValue("Incorrect username or password");
      }
    }
)

export const loginThunk = createAsyncThunk(
    'login',
    async (user, { rejectedWithValue }) => {
      const response = await login(user);

      if (response.status) {
        debugger;
        throw rejectedWithValue("Incorrect username or password");
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