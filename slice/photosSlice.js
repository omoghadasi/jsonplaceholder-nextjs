import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";
import NProgress from "nprogress";
import { req } from "../lib/client";

const photosAdapter = createEntityAdapter();

export const {
  selectById: selectPhotoById,
  selectIds: selectPhotoIds,
  selectAll: selectAllPhoto,
} = photosAdapter.getSelectors((state) => state.photos);

export const selectPhotoByAlbumId = createSelector(
  selectAllPhoto,
  (state, albumId) => albumId,
  (photos, albumId) => photos.filter((photo) => photo.albumId == albumId)
);

const initialState = photosAdapter.getInitialState({
  status: "idle",
  error: null,
});

export const fetchAllPhotos = createAsyncThunk(
  "photos/fetchAllPhotos",
  async () => {
    NProgress.start();
    const response = await req.get("photos");
    if (response.status == 200) {
      NProgress.done();
      return response.data;
    }
    NProgress.done();
  }
);

export const fetchPhotosByAlbumId = createAsyncThunk(
  "photos/fetchPhotosByAlbumId",
  async (albumId) => {
    NProgress.start();
    const response = await axios.get(`photos?albumId=${albumId}`);
    if (response.status == 200) {
      NProgress.done();
      return response.data;
    }
    NProgress.done();
  }
);

// create a slice
export const photos = createSlice({
  name: "photos",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchAllPhotos.pending]: (state) => {
      state.status = "loading";
    },
    [fetchAllPhotos.fulfilled]: (state, action) => {
      photosAdapter.upsertMany(state, action.payload);
      state.status = "success";
    },
    [fetchAllPhotos.rejected]: (state, action) => {
      state.error = action.payload;
      state.status = "error";
    },
    [fetchPhotosByAlbumId.fulfilled]: (state, action) => {
      photosAdapter.upsertMany(state, action.payload);
    },
  },
});

// export the reducer
export const photoReducer = photos.reducer;
// export the action
export const { addPhoto } = photos.actions;
