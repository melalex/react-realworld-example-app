import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Status from "../../utils/Status";
import * as profileApi from "./profileApi";
import { errorReducer, pendingReducer } from "../../utils/utilityFunctions";
import { selectToken } from "../user/userSlice";

export const FollowingStatus = Object.freeze({
  FOLLOWING: { id: "following" },
  NOT_FOLLOWING: { id: "not-following" },
  UPDATING: { id: "updating" },
});

function toFollowingStatus(following) {
  if (following) return FollowingStatus.FOLLOWING;
  else return FollowingStatus.NOT_FOLLOWING;
}

const initialState = {
  data: {},
  status: Status.IDLE,
  errors: [],
};

const pendingFollowReducer = (state) => {
  state.data.followingStatus = FollowingStatus.UPDATING;
};

const successReducer = (state, action) => {
  state.status = Status.SUCCESS;
  state.data = action.payload.profile;
  state.data.followingStatus = toFollowingStatus(
    action.payload.profile.following
  );
};

export const getProfile = createAsyncThunk(
  "profile/getByUsername",
  async (username) => profileApi.getProfileByUsername(username)
);

export const switchFollowStatus = createAsyncThunk(
  "profile/followProfile",
  async (_, { getState }) => {
    const state = getState();
    const profile = selectProfile(state);
    const token = selectToken(state);

    if (profile.data.following) {
      return profileApi.unfollowProfileByUsername(token, profile.data.username);
    } else {
      return profileApi.followProfileByUsername(token, profile.data.username);
    }
  }
);

export const unfollowProfile = createAsyncThunk(
  "profile/unfollowProfile",
  async (username) => profileApi.unfollowProfileByUsername(username)
);

export const profileSlice = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {
    reInitProfile: () => initialState,
    setProfile: (state, action) => {
      state.status = Status.SUCCESS;
      state.data = {
        ...action.payload,
        followingStatus: toFollowingStatus(action.payload.following),
      };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getProfile.pending, pendingReducer)
      .addCase(getProfile.fulfilled, successReducer)
      .addCase(getProfile.rejected, errorReducer);

    builder
      .addCase(switchFollowStatus.pending, pendingFollowReducer)
      .addCase(switchFollowStatus.fulfilled, successReducer)
      .addCase(switchFollowStatus.rejected, errorReducer);
  },
});

export const selectProfile = (state) => state.profile;

export const { reInitProfile, setProfile } = profileSlice.actions;

export default profileSlice.reducer;
