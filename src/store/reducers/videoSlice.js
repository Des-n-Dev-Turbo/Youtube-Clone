import request from '@axios/api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  videos: [],
  loading: false,
  error: null,
  nextPageToken: null,
  activeCategory: 'All',
};

//* Action Creator using Async Thunk for getPopularVideos
export const getPopularVideos = createAsyncThunk('getPopularVideos', async (_, thunkAPI) => {
  try {
    const { data } = await request('/videos', {
      params: {
        part: 'snippet',
        chart: 'mostPopular',
        regionCode: 'IN',
        maxResults: 20,
        pageToken: thunkAPI.getState().video.nextPageToken || '',
      },
    });

    const videoData = { videos: data.items, nextPageToken: data.nextPageToken, category: 'All' };
    return videoData;
  } catch (error) {
    return error.response.data;
  }
});

//* Action Creator using Async Thunk for getVideosByCategory
export const getVideosByCategory = createAsyncThunk('getVideosByCategory', async (keyword, thunkAPI) => {
  try {
    const { data } = await request('/search', {
      params: {
        part: 'snippet',
        maxResults: 20,
        pageToken: thunkAPI.getState().video.nextPageToken,
        q: keyword,
        type: 'video',
      },
    });

    const videoData = {
      videos: data.items,
      nextPageToken: data.nextPageToken,
      category: keyword,
    };

    return videoData;
  } catch (error) {
    return error.response.data;
  }
});

export const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPopularVideos.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPopularVideos.fulfilled, (state, { payload }) => {
        state.videos =
          state.activeCategory === payload.category ? state.videos.concat(...payload.videos) : payload.videos;
        state.loading = false;
        state.nextPageToken = payload.nextPageToken;
        state.activeCategory = payload.category;
      })
      .addCase(getPopularVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getVideosByCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(getVideosByCategory.fulfilled, (state, { payload }) => {
        state.videos =
          state.activeCategory === payload.category ? state.videos.concat(...payload.videos) : payload.videos;
        state.loading = false;
        state.nextPageToken = payload.nextPageToken;
        state.activeCategory = payload.category;
      })
      .addCase(getVideosByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const getVideos = (state) => state.video.videos;

export const getVideosLoading = (state) => state.video.loading;

export const getVideosError = (state) => state.video.error;

export const getVideosActiveCategory = (state) => state.video.activeCategory;

export const getVideosNextPageToken = (state) => state.video.nextPageToken;

export default videoSlice.reducer;
