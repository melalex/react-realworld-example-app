import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../features/user/userSlice";
import articleReducer from "../features/article/articleSlice";
import tagReducer from "../features/tag/tagSlice";
import profileReducer from "../features/profile/profileSlice";
import commentReducer from "../features/comment/commentSlice";

export default configureStore({
  reducer: {
    user: usersReducer,
    article: articleReducer,
    tag: tagReducer,
    profile: profileReducer,
    comment: commentReducer,
  },
  devTools: true,
});
