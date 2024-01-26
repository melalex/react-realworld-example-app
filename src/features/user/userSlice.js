import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Status from "../../utils/Status";
import { createUser, getUserByToken, login, modifyUser } from "./userApi";
import { errorReducer, handleApiError } from "../../utils/utilityFunctions";

const initialUserState = {
  status: Status.IDLE.value,
  isAuthenticated: false,
};

const successReducer = (state, action) => {
  state.status = Status.SUCCESS.value;
  state.isAuthenticated = true;
  state.profile = action.payload.user;
  state.token = action.payload.user.token;
};

const pendingReducer = (state, action) => {
  state.status = Status.LOADING.value;
};

export const registerUser = createAsyncThunk(
  "user/register",
  async ({ username, email, password }, { rejectWithValue }) =>
    createUser(username, email, password)
      .then((it) => it.data)
      .catch((error) => handleApiError(error, rejectWithValue))
);

export const updateUser = createAsyncThunk(
  "user/update",
  async ({ username, email, password, bio, image }, { rejectWithValue }) =>
    modifyUser(username, email, password, bio, image)
      .then((it) => it.data)
      .catch((error) => handleApiError(error, rejectWithValue))
);

export const loginUser = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) =>
    login(email, password)
      .then((it) => it.data)
      .catch((error) => handleApiError(error, rejectWithValue))
);

export const loginUserWithToken = createAsyncThunk(
  "user/loginWithToken",
  async ({ token }, { rejectWithValue }) =>
    getUserByToken(token)
      .then((it) => it.data)
      .catch((error) => handleApiError(error, rejectWithValue))
);

export const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    logout: (state) => initialUserState,
  },
  extraReducers(builder) {
    builder
      .addCase(registerUser.pending, pendingReducer)
      .addCase(registerUser.fulfilled, successReducer)
      .addCase(registerUser.rejected, errorReducer);

    builder
      .addCase(updateUser.pending, pendingReducer)
      .addCase(updateUser.fulfilled, successReducer)
      .addCase(updateUser.rejected, errorReducer);

    builder
      .addCase(loginUser.pending, pendingReducer)
      .addCase(loginUser.fulfilled, successReducer)
      .addCase(loginUser.rejected, errorReducer);

    builder
      .addCase(loginUserWithToken.pending, pendingReducer)
      .addCase(loginUserWithToken.fulfilled, successReducer)
      .addCase(loginUserWithToken.rejected, errorReducer);
  },
});

export const { logout } = userSlice.actions;

export const selectUser = (state) => state.user;
export const selectUserStatus = (state) => selectUser(state).status;
export const selectUserErrors = (state) => selectUser(state).errors;

export default userSlice.reducer;
