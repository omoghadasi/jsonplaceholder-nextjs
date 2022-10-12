import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";
import axios from "axios";

const albumsAdapter = createEntityAdapter();

export const {
  selectById: selectAlbumById,
  selectIds: selectAlbumIds,
  selectAll: selectAllAlbums,
} = albumsAdapter.getSelectors((state) => state.albums);

export const selectAlbumsByUserId = createSelector(
  selectAllAlbums,
  (state, userId) => userId,
  (albums, userId) => albums.filter((album) => album.userId === userId)
);

const initialState = albumsAdapter.getInitialState({
  status: "idle",
  error: null,
});

export const fetchAllAlbums = createAsyncThunk(
  "Albums/fetchAllAlbums",
  async () => {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/albums"
    );
    if (response.status == 200) {
      return response.data;
    }
  }
);

export const fetchAlbumsByUserId = createAsyncThunk(
  "Albums/fetchAlbumsByUserId",
  async (userId) => {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/albums?userId=${userId}`
    );
    if (response.status == 200) {
      return response.data;
    }
  }
);

// create a slice
export const albums = createSlice({
  name: "albums",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchAllAlbums.pending]: (state) => {
      state.status = "loading";
    },
    [fetchAllAlbums.fulfilled]: (state, action) => {
      albumsAdapter.upsertMany(state, action.payload);
      state.status = "success";
    },
    [fetchAllAlbums.rejected]: (state, action) => {
      state.error = action.payload;
      state.status = "error";
    },
    [fetchAlbumsByUserId.fulfilled]: (state, action) => {
      albumsAdapter.upsertMany(state, action.payload);
    },
  },
});

// export the reducer
export const albumReducer = albums.reducer;
// export the action
export const { addAlbums } = albums.actions;
