/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import request, { requestWithoutKey } from '@axios/api';

const initialState = {
  loading: false,
  videos: [],
  error: null,
};

export const getLikedVideos = createAsyncThunk('getLikedVideos', async (_, thunkAPI) => {
  try {
    const { data } = await request('/videos', {
      params: {
        part: 'snippet, contentDetails, statistics',
        myRating: 'like',
        maxResults: 20,
      },
      headers: {
        Authorization: `Bearer ${thunkAPI.getState().auth.accessToken}`,
      },
    });

    const likedVideos = data.items;

    return likedVideos;
  } catch (error) {
    return error.response.data.message;
  }
});

export const likeVideo = createAsyncThunk('likeVideo', async (id, thunkAPI) => {
  try {
    await requestWithoutKey.post(
      '/videos/rate',
      {},
      {
        params: {
          id,
          rating: 'like',
        },
        headers: {
          Authorization: `Bearer ${thunkAPI.getState().auth.accessToken}`,
        },
      }
    );

    return setTimeout(() => {
      thunkAPI.dispatch(getLikedVideos());
    }, 3000);
  } catch (error) {
    return error.response.data.message;
  }
});

export const dislikeVideo = createAsyncThunk('dislikeVideo', async (id, thunkAPI) => {
  try {
    await requestWithoutKey.post(
      '/videos/rate',
      {},
      {
        params: {
          id,
          rating: 'dislike',
        },
        headers: {
          Authorization: `Bearer ${thunkAPI.getState().auth.accessToken}`,
        },
      }
    );

    return 'Successful';
  } catch (error) {
    return error.response.data.message;
  }
});

export const likedVideosSlice = createSlice({
  name: 'likedVideos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLikedVideos.pending, (state) => {
        state.loading = true;
      })
      .addCase(getLikedVideos.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.videos = payload;
      })
      .addCase(getLikedVideos.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(likeVideo.pending, (state) => {
        state.loading = true;
      })
      .addCase(likeVideo.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(likeVideo.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(dislikeVideo.pending, (state) => {
        state.loading = true;
      })
      .addCase(dislikeVideo.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(dislikeVideo.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const getLikedVideosData = (state) => state.likedVideos.videos;

export const getLikedVideosLoading = (state) => state.likedVideos.loading;

export const getLikedVideosError = (state) => state.likedVideos.error;

export default likedVideosSlice.reducer;
