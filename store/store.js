import { configureStore } from "@reduxjs/toolkit";
import { postReducer } from "./../slice/postsSlice";
import { userReducer } from "./../slice/usersSlice";
import { commentReducer } from "./../slice/commentsSlice";
import { albumReducer } from "../slice/albumsSlice";
import { photoReducer } from "../slice/photosSlice";

// config the store
const store = configureStore({
  reducer: {
    posts: postReducer,
    users: userReducer,
    comments: commentReducer,
    albums: albumReducer,
    photos: photoReducer,
  },
});
// export default the store
export default store;
