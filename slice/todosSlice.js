import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";

const todosAdapter = createEntityAdapter();

export const { selectById: selectTodoById, selectIds: selectTodoIds } =
  todosAdapter.getSelectors((state) => state.todos);
const initialState = todosAdapter.getInitialState({
  status: "idle",
  error: null,
});

export const fetchAllTodos = createAsyncThunk(
  "Todos/fetchAllTodos",
  async () => {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/todos"
    );
    if (response.status == 200) {
      return response.data;
    }
  }
);

// create a slice
export const todos = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchAllTodos.pending]: (state) => {
      state.status = "loading";
    },
    [fetchAllTodos.fulfilled]: (state, action) => {
      todosAdapter.upsertMany(state, action.payload);
      state.status = "success";
    },
    [fetchAllTodos.rejected]: (state, action) => {
      state.error = action.payload;
      state.status = "error";
    },
  },
});

// export the reducer
export const todoReducer = todos.reducer;
// export the action
export const { addTodos } = todos.actions;
