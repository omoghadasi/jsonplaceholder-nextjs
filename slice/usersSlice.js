import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import NProgress from "nprogress";
import { req } from "../lib/client";

const usersAdapter = createEntityAdapter();

export const { selectById: selectUserById, selectIds: selectUserIds } =
  usersAdapter.getSelectors((state) => state.users);
const initialState = usersAdapter.getInitialState({
  status: "idle",
  error: null,
});

export const fetchAllUsers = createAsyncThunk(
  "users/fetchAllUsers",
  async () => {
    NProgress.start();
    const response = await req.get("users");
    if (response.status == 200) {
      NProgress.done();
      return response.data;
    }
    NProgress.done();
  }
);

export const fetchSingleUserById = createAsyncThunk(
  "users/fetchSingleUserById",
  async (postId) => {
    NProgress.start();
    const response = await req.get(`users/${postId}`);
    if (response.status == 200) {
      NProgress.done();
      return response.data;
    }
    NProgress.done();
  }
);

// create a slice
export const users = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchAllUsers.pending]: (state) => {
      state.status = "loading";
    },
    [fetchAllUsers.fulfilled]: (state, action) => {
      usersAdapter.upsertMany(state, action.payload);
      state.status = "success";
    },
    [fetchAllUsers.rejected]: (state, action) => {
      state.error = action.payload;
      state.status = "error";
    },
    [fetchSingleUserById.fulfilled]: (state, action) => {
      usersAdapter.upsertOne(state, action.payload);
    },
  },
});

// export the reducer
export const userReducer = users.reducer;
// export the action
export const { addUser } = users.actions;
