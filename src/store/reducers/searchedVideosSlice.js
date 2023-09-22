import request from '@axios/api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  videos: [],
  loading: false,
  error: null,
};

//* Action Creator using Async Thunk for getSearchedVideos
export const getSearchedVideos = createAsyncThunk('getSearchedVideos', async (keyword) => {
  try {
    const { data } = await request('/search', {
      params: {
        part: 'snippet',
        maxResults: 20,
        q: keyword,
      },
    });

    const videoData = data.items;

    return videoData;
  } catch (error) {
    return error.response.data;
  }
});

export const searchedVideosSlice = createSlice({
  name: 'searchedVideos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSearchedVideos.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSearchedVideos.fulfilled, (state, { payload }) => {
        state.videos = payload;
        state.loading = false;
      })
      .addCase(getSearchedVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const getSearchedVideosData = (state) => state.searchedVideos.videos;

export const getSearchedVideosLoading = (state) => state.searchedVideos.loading;

export const getSearchedVideosError = (state) => state.searchedVideos.error;

export default searchedVideosSlice.reducer;
