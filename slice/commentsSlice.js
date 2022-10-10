import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";

const commentsAdapter = createEntityAdapter();

export const {
  selectById: selectCommentById,
  selectIds: selectCommentIds,
  selectAll: selectAllComments,
} = commentsAdapter.getSelectors((state) => state.comments);
const initialState = commentsAdapter.getInitialState({
  status: "idle",
  error: null,
});

export const fetchAllComments = createAsyncThunk(
  "Comments/fetchAllComments",
  async () => {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/comments"
    );
    if (response.status == 200) {
      return response.data;
    }
  }
);

// create a slice
export const comments = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchAllComments.pending]: (state) => {
      state.status = "loading";
    },
    [fetchAllComments.fulfilled]: (state, action) => {
      commentsAdapter.upsertMany(state, action.payload);
      state.status = "success";
    },
    [fetchAllComments.rejected]: (state, action) => {
      state.error = action.payload;
      state.status = "error";
    },
  },
});

// export the reducer
export const commentReducer = comments.reducer;
// export the action
export const { addComment } = comments.actions;
