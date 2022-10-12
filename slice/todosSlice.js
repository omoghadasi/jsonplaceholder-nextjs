import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";
import axios from "axios";

const todosAdapter = createEntityAdapter();

export const {
  selectById: selectTodoById,
  selectIds: selectTodoIds,
  selectAll: selectAllTodos,
} = todosAdapter.getSelectors((state) => state.todos);

export const selectTodosByUserId = createSelector(
  selectAllTodos,
  (state, userId) => userId,
  (todos, userId) => todos.filter((todo) => todo.userId === userId)
);
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
export const fetchTodosByUserId = createAsyncThunk(
  "Todos/fetchTodosByUserId",
  async (userId) => {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/todos?userId=${userId}`
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
    [fetchTodosByUserId.fulfilled]: (state, action) => {
      todosAdapter.upsertMany(state, action.payload);
    },
  },
});

// export the reducer
export const todoReducer = todos.reducer;
// export the action
export const { addTodos } = todos.actions;
