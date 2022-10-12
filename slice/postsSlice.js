import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";
import axios from "axios";

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
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    if (response.status == 200) {
      return response.data;
    }
  }
);

export const fetchSinglePostById = createAsyncThunk(
  "posts/fetchSinglePostById",
  async (postId) => {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${postId}`
    );
    if (response.status == 200) {
      return response.data;
    }
  }
);

export const fetchPostsByUserId = createAsyncThunk(
  "posts/fetchPostsByUserId",
  async (userId) => {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
    );
    if (response.status == 200) {
      return response.data;
    }
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
