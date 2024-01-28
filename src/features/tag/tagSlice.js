import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Status from "../../utils/Status";
import { getAllTags } from "./tagApi";
import {
  errorReducer,
  pendingReducer,
} from "../../utils/utilityFunctions";

const initialState = {
  data: [],
  errors: [],
  status: Status.IDLE,
};

export const loadTags = createAsyncThunk("tag/fetch", async () => getAllTags());

export const tagSlice = createSlice({
  name: "tag",
  initialState: initialState,
  extraReducers(builder) {
    builder
      .addCase(loadTags.pending, pendingReducer)
      .addCase(loadTags.rejected, errorReducer)
      .addCase(loadTags.fulfilled, (state, action) => {
        state.data = action.payload.tags;
        state.status = Status.SUCCESS;
      });
  },
});

export const selectTags = (state) => state.tag.data;
export const selectTagsStatus = (state) => state.tag.status;

export default tagSlice.reducer;
