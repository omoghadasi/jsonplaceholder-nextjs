import { configureStore } from "@reduxjs/toolkit";
import { postReducer } from "./../slice/postsSlice";
import { userReducer } from "./../slice/usersSlice";
import { commentReducer } from "./../slice/commentsSlice";

// config the store
const store = configureStore({
  reducer: { posts: postReducer, users: userReducer, comments: commentReducer },
});
// export default the store
export default store;
