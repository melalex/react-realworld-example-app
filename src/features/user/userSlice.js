import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Status from "../../utils/Status";
import { createUser, getUserByToken, login, modifyUser } from "./userApi";
import {
  errorReducer,
  handleApiError,
  pendingReducer,
} from "../../utils/utilityFunctions";

const initialUserState = {
  status: Status.IDLE,
  isAuthenticated: false,
};

const successReducer = (state, action) => {
  state.status = Status.SUCCESS;
  state.isAuthenticated = true;
  state.profile = action.payload.user;
  state.token = action.payload.user.token;
};

export const registerUser = createAsyncThunk(
  "user/register",
  async ({ username, email, password }, { rejectWithValue }) =>
    createUser(username, email, password).catch((error) =>
      handleApiError(error, rejectWithValue)
    )
);

export const updateUser = createAsyncThunk(
  "user/update",
  async (form, { rejectWithValue, getState }) => {
    const { username, email, password, bio, image } = form;
    const token = selectToken(getState());

    return modifyUser(token, username, email, password, bio, image).catch(
      (error) => handleApiError(error, rejectWithValue)
    );
  }
);

export const loginUser = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) =>
    login(email, password).catch((error) =>
      handleApiError(error, rejectWithValue)
    )
);

export const loginUserWithToken = createAsyncThunk(
  "user/loginWithToken",
  async ({ token }, { rejectWithValue }) =>
    getUserByToken(token).catch((error) =>
      handleApiError(error, rejectWithValue)
    )
);

export const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    logout: () => initialUserState,
    setIdleStatus: (state) => {
      state.status = Status.IDLE;
    },
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

export const { logout, setIdleStatus } = userSlice.actions;

export const selectUser = (state) => state.user;
export const selectIsAuthenticated = (state) =>
  selectUser(state).isAuthenticated;
export const selectUserStatus = (state) => selectUser(state).status;
export const selectUserErrors = (state) => selectUser(state).errors;
export const selectToken = (state) => selectUser(state).token;

export default userSlice.reducer;
