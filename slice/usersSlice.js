import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";

const usersAdapter = createEntityAdapter();

export const { selectById: selectUserById, selectIds: selectUserIds } =
  usersAdapter.getSelectors((state) => state.users);
const initialState = usersAdapter.getInitialState({
  status: "idle",
  error: null,
});

export const fetchAllUsers = createAsyncThunk(
  "Users/fetchAllUsers",
  async () => {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    if (response.status == 200) {
      return response.data;
    }
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
  },
});

// export the reducer
export const userReducer = users.reducer;
// export the action
export const { addUser } = users.actions;
