/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import request from '@axios/api';

const initialState = {
  loading: false,
  error: null,
  videos: [],
};

export const getVideosByChannelId = createAsyncThunk('getVideosByChannelId', async (id) => {
  try {
    const { data } = await request('/channels', {
      params: {
        part: 'contentDetails',
        id,
      },
    });

    const channelUploadPlaylistId = data.items[0].contentDetails.relatedPlaylists.uploads;

    const { data: videosData } = await request('/playlistItems', {
      params: {
        part: 'snippet,contentDetails',
        playlistId: channelUploadPlaylistId,
        maxResults: 30,
      },
    });

    const channelPlaylistData = videosData.items;

    return channelPlaylistData;
  } catch (error) {
    return error.response.data;
  }
});

export const channelVideosSlice = createSlice({
  name: 'channelVideos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getVideosByChannelId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getVideosByChannelId.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.videos = payload;
      })
      .addCase(getVideosByChannelId.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const getChannelVideosData = (state) => state.channelVideos.videos;

export const getChannelVideosLoading = (state) => state.channelVideos.loading;

export const getChannelVideosError = (state) => state.channelVideos.error;

export default channelVideosSlice.reducer;
