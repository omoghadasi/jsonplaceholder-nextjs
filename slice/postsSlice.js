import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";
import NProgress from "nprogress";
import { req } from "../lib/client";

const postsAdapter = createEntityAdapter();

export const {
  selectById: selectPostById,
  selectIds: selectPostIds,
  selectAll: selectAllPosts,
} = postsAdapter.getSelectors((state) => state.posts);

export const selectPostsByUserId = createSelector(
  selectAllPosts,
  (state, userId) => userId,
  (posts, userId) => posts.filter((post) => post.userId === userId)
);
const initialState = postsAdapter.getInitialState({
  status: "idle",
  error: null,
});

export const fetchAllPosts = createAsyncThunk(
  "posts/fetchAllPosts",
  async () => {
    NProgress.start();
    const response = await req.get("posts");
    if (response.status == 200) {
      NProgress.done();
      return response.data;
    }
    NProgress.done();
  }
);

export const fetchSinglePostById = createAsyncThunk(
  "posts/fetchSinglePostById",
  async (postId) => {
    NProgress.start();
    const response = await req.get(`posts/${postId}`);
    if (response.status == 200) {
      NProgress.done();
      return response.data;
    }
    NProgress.done();
  }
);

export const fetchPostsByUserId = createAsyncThunk(
  "posts/fetchPostsByUserId",
  async (userId) => {
    NProgress.start();
    const response = await req.get(`posts?userId=${userId}`);
    if (response.status == 200) {
      NProgress.done();
      return response.data;
    }
    NProgress.done();
  }
);

// create a slice
export const posts = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchAllPosts.pending]: (state) => {
      state.status = "loading";
    },
    [fetchAllPosts.fulfilled]: (state, action) => {
      postsAdapter.upsertMany(state, action.payload);
      state.status = "success";
    },
    [fetchAllPosts.rejected]: (state, action) => {
      state.error = action.payload;
      state.status = "error";
    },
    [fetchSinglePostById.fulfilled]: (state, action) => {
      postsAdapter.upsertOne(state, action.payload);
    },
    [fetchPostsByUserId.fulfilled]: (state, action) => {
      postsAdapter.upsertMany(state, action.payload);
    },
  },
});

// export the reducer
export const postReducer = posts.reducer;
// export the action
export const { addPost } = posts.actions;
