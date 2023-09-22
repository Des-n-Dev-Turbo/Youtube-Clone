/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import request from '@axios/api';

const initialState = {
  loading: false,
  channel: null,
  channelSubscriptionStatus: false,
  error: null,
};

export const getChannelById = createAsyncThunk('getChannelById', async (id) => {
  try {
    const { data } = await request('/channels', {
      params: {
        part: 'snippet, statistics, contentDetails',
        id,
      },
    });

    const channelData = data.items[0];

    return channelData;
  } catch (error) {
    return error.response.data;
  }
});

export const getChannelSubscribedStatus = createAsyncThunk('getChannelSubscribedStatus', async (id, thunkAPI) => {
  try {
    const { data } = await request('/subscriptions', {
      params: {
        part: 'snippet, contentDetails',
        forChannelId: id,
        mine: true,
      },
      headers: {
        Authorization: `Bearer ${thunkAPI.getState().auth.accessToken}`,
      },
    });

    return data.items.length !== 0;
  } catch (error) {
    return error.response.data;
  }
});

export const channelSlice = createSlice({
  name: 'selectedVideoChannel',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getChannelById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getChannelById.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.channel = payload;
      })
      .addCase(getChannelById.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(getChannelSubscribedStatus.fulfilled, (state, { payload }) => {
        state.channelSubscriptionStatus = payload;
      })
      .addCase(getChannelSubscribedStatus.rejected, (state, { payload }) => {
        state.error = payload;
      });
  },
});

export const getVideoChannelData = (state) => state.selectedVideoChannel.channel;

export const getVideoChannelLoading = (state) => state.selectedVideoChannel.loading;

export const getVideoChannelError = (state) => state.selectedVideoChannel.error;

export const getVideoChannelSubscriptionStatus = (state) => state.selectedVideoChannel.channelSubscriptionStatus;

export default channelSlice.reducer;
