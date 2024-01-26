import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../features/user/userSlice";

export default configureStore({
  reducer: {
    user: usersReducer,
  },
  devTools: true,
});
