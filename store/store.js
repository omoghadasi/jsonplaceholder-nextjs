import { configureStore } from "@reduxjs/toolkit";
import { postReducer } from "./../slice/postsSlice";
import { userReducer } from "./../slice/usersSlice";

// config the store
const store = configureStore({
  reducer: { posts: postReducer, users: userReducer },
});
// export default the store
export default store;
