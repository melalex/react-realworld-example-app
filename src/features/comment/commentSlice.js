import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import Status from "../../utils/Status";
import * as commentApi from "./commentApi";
import { errorReducer, pendingReducer } from "../../utils/utilityFunctions";
import { selectToken } from "../user/userSlice";

const commentAdapter = createEntityAdapter({
  selectId: (entity) => entity.id,
  sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt),
});

const initialState = commentAdapter.getInitialState({
  article: "",
  status: Status.IDLE,
  erors: [],
});

export const loadComments = createAsyncThunk(
  "comments/loadComments",
  async (_, { getState }) => {
    const slug = selectCommentsArticle(getState());

    if (slug) {
      return await commentApi.getAllCommentByArticle(slug);
    } else {
      return {
        comments: [],
      };
    }
  }
);

export const addComment = createAsyncThunk(
  "comments/addComment",
  async (body, { getState }) => {
    const state = getState();
    const slug = selectCommentsArticle(state);
    const token = selectToken(state);

    return commentApi.createComment(token, slug, { comment: body });
  }
);

export const removeComment = createAsyncThunk(
  "comments/removeComment",
  async (_, { getState }) => {
    const state = getState();
    const slug = selectCommentsArticle(state);
    const token = selectToken(state);

    return commentApi.deleteComment(token, slug);
  }
);

export const commentSlice = createSlice({
  name: "comment",
  initialState: initialState,
  reducers: {
    setArticle: (state, action) => {
      state.status = Status.IDLE;
      state.article = action.payload;
      state.data = [];
      state.erors = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loadComments.pending, pendingReducer)
      .addCase(loadComments.fulfilled, (state, action) => {
        commentAdapter.setAll(state, action.payload.comments);
        state.status = Status.SUCCESS;
      })
      .addCase(loadComments.rejected, errorReducer);

    builder
      .addCase(addComment.pending, pendingReducer)
      .addCase(addComment.fulfilled, (state, action) => {
        commentAdapter.addOne(state, action.payload.comment);
        state.status = Status.SUCCESS;
      })
      .addCase(addComment.rejected, errorReducer);

    builder
      .addCase(removeComment.pending, pendingReducer)
      .addCase(removeComment.fulfilled, (state, action) => {
        commentAdapter.removeOne(state, action.payload.comment.id);
        state.status = Status.SUCCESS;
      })
      .addCase(removeComment.rejected, errorReducer);
  },
});

export const selectComments = (state) => state.comment;
export const selectCommentsArticle = (state) => selectComments(state).article;
export const selectCommentsStatus = (state) => selectComments(state).status;

export const commentSelectors = commentAdapter.getSelectors(selectComments);

export const { setArticle } = commentSlice.actions;

export default commentSlice.reducer;
