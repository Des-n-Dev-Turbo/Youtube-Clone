/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import request from '@axios/api';

const initialState = {
  loading: false,
  comments: null,
  error: null,
};

export const getCommentsByVideoId = createAsyncThunk('getCommentsByVideoId', async (id) => {
  try {
    const { data } = await request('/commentThreads', {
      params: {
        part: 'snippet',
        videoId: id,
      },
    });

    const commentsData = data.items;
    return commentsData;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
});

export const addComment = createAsyncThunk('addComment', async ({ id, text }, thunkAPI) => {
  try {
    const obj = {
      snippet: {
        videoId: id,
        topLevelComment: {
          snippet: {
            textOriginal: text,
          },
        },
      },
    };

    await request.post('/commentThreads', obj, {
      params: {
        part: 'snippet',
      },
      headers: {
        Authorization: `Bearer ${thunkAPI.getState().auth.accessToken}`,
      },
    });

    return setTimeout(() => {
      thunkAPI.dispatch(getCommentsByVideoId(id));
    }, 5000);
  } catch (error) {
    return error.response.data;
  }
});

export const commentsSlice = createSlice({
  name: 'selectedVideoComments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCommentsByVideoId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCommentsByVideoId.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.comments = payload;
      })
      .addCase(getCommentsByVideoId.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(addComment.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addComment.rejected, (state, { payload }) => {
        state.error = payload;
      });
  },
});

export const getVideoComments = (state) => state.selectedVideoComments.comments;

export const getVideoCommentsLoading = (state) => state.selectedVideoComments.loading;

export const getVideoCommentsError = (state) => state.selectedVideoComments.error;

export default commentsSlice.reducer;
