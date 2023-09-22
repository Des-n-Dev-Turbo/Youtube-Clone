/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import request from '@axios/api';

const initialState = {
  loading: false,
  videos: [],
  error: null,
};

export const getSubscribedChannels = createAsyncThunk('getSubscribedChannels', async (_, thunkAPI) => {
  try {
    const { data } = await request('/subscriptions', {
      params: {
        part: 'snippet,contentDetails',
        mine: true,
      },
      headers: {
        Authorization: `Bearer ${thunkAPI.getState().auth.accessToken}`,
      },
    });

    const subscribedChannelsData = data.items;

    return subscribedChannelsData;
  } catch (error) {
    return error.response.data.message;
  }
});

export const subscriptionsChannelSlice = createSlice({
  name: 'subscriptionChannel',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSubscribedChannels.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSubscribedChannels.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.videos = payload;
      })
      .addCase(getSubscribedChannels.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const getSubscriptionChannelVideos = (state) => state.subscriptionChannel.videos;

export const getSubscriptionChannelLoading = (state) => state.subscriptionChannel.loading;

export const getSubscriptionChannelError = (state) => state.subscriptionChannel.error;

export default subscriptionsChannelSlice.reducer;
