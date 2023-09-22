import { configureStore } from '@reduxjs/toolkit';

import authSliceReducer from './reducers/authSlice';
import videoSliceReducer from './reducers/videoSlice';
import selectedVideoSliceReducer from './reducers/selectedVideoSlice';
import channelSliceReducer from './reducers/channelSlice';
import commentsSliceReducer from './reducers/commentsSlice';
import searchedVideosSliceReducer from './reducers/searchedVideosSlice';
import subscriptionChannelSliceReducer from './reducers/subscriptionChannelSlice';
import channelVideosSliceReducer from './reducers/channelVideosSlice';
import likedVideosSliceReducer from './reducers/likedVideosSlice';

export const store = configureStore({
  reducer: {
    video: videoSliceReducer,
    selectedVideo: selectedVideoSliceReducer,
    selectedVideoChannel: channelSliceReducer,
    channelVideos: channelVideosSliceReducer,
    selectedVideoComments: commentsSliceReducer,
    searchedVideos: searchedVideosSliceReducer,
    subscriptionChannel: subscriptionChannelSliceReducer,
    likedVideos: likedVideosSliceReducer,
    auth: authSliceReducer,
  },
  devTools: import.meta.env.DEV,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
