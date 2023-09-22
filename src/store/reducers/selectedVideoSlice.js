import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import request from '@axios/api';

const initialState = {
  loading: false,
  error: null,
  video: null,
};

//* Action Creator using Async Thunk for getVideoById
export const getVideoById = createAsyncThunk('getVideoById', async (id) => {
  try {
    const { data } = await request('/videos', {
      params: {
        part: 'snippet, statistics',
        id,
      },
    });

    const videoData = data.items[0];

    return videoData;
  } catch (error) {
    return error.response.data;
  }
});

export const selectedVideoSlice = createSlice({
  name: 'selectedVideo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getVideoById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getVideoById.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.video = payload;
      })
      .addCase(getVideoById.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const getSelectedVideo = (state) => state.selectedVideo.video;

export const getSelectedVideoLoading = (state) => state.selectedVideo.loading;

export const getSelectedVideoError = (state) => state.selectedVideo.error;

export default selectedVideoSlice.reducer;
