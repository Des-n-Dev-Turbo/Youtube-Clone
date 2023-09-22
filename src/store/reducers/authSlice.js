/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { GoogleAuthProvider, getAdditionalUserInfo, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../../firebase';

const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/youtube.force-ssl');

export const login = createAsyncThunk('login', async () => {
  try {
    const res = await signInWithPopup(auth, provider);

    const credential = GoogleAuthProvider.credentialFromResult(res);
    const additional = getAdditionalUserInfo(res);

    const user = {
      accessToken: credential.accessToken,
      displayName: additional.profile.name,
      photoURL: additional.profile.picture,
      email: additional.profile.email,
      uid: additional.profile.id,
    };

    sessionStorage.setItem('ytc-access-token', user.accessToken);
    sessionStorage.setItem(
      'ytc-user',
      JSON.stringify({ displayName: user.displayName, photoURL: user.photoURL, email: user.email, uid: user.uid })
    );

    return user;
  } catch (error) {
    return error.message;
  }
});

export const logout = createAsyncThunk('logout', async () => {
  try {
    await signOut(auth);

    sessionStorage.removeItem('ytc-access-token');
    sessionStorage.removeItem('ytc-user');
  } catch (error) {
    return error.message;
  }
});

const initialState = {
  accessToken: sessionStorage.getItem('ytc-access-token') ? sessionStorage.getItem('ytc-access-token') : null,
  user: sessionStorage.getItem('ytc-user') ? JSON.parse(sessionStorage.getItem('ytc-user')) : null,
  loading: false,
  error: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload.accessToken;
        const user = {
          name: action.payload.displayName,
          photoUrl: action.payload.photoURL,
          email: action.payload.email,
          uid: action.payload.uid,
        };
        state.user = user;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
        state.accessToken = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
        state.accessToken = null;
      });
  },
});

// export const {} = authSlice.actions;

export const getAccessToken = (state) => state.auth.accessToken;

export const getUser = (state) => state.auth.user;

export const getError = (state) => state.auth.error;

export default authSlice.reducer;
