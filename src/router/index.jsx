import { Navigate, createBrowserRouter } from 'react-router-dom';

import Root from './Root';
import Layout from '@components/layout/Layout';

import App from '../App';
import LoginScreen from '@screens/login-screen/LoginScreen';
import WatchScreen from '@screens/watch-screen/WatchScreen';
import SearchScreen from '@screens/search-screen/SearchScreen';
import SubscriptionsScreen from '@screens/subscriptions-screen/SubscriptionsScreen';
import ChannelScreen from '@screens/channel-screen/ChannelScreen';
import LikedScreen from '@screens/liked-screen/LikedScreen';

import AuthRoute from '@routes/AuthRoute';
import UnauthRoute from '@routes/UnauthRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <Navigate to="/login" />,
    children: [
      {
        index: true,
        element: (
          <AuthRoute>
            <Layout>
              <App />
            </Layout>
          </AuthRoute>
        ),
      },
      {
        path: 'login',
        element: (
          <UnauthRoute>
            <LoginScreen />
          </UnauthRoute>
        ),
      },
      {
        path: 'search/:query',
        element: (
          <AuthRoute>
            <Layout>
              <SearchScreen />
            </Layout>
          </AuthRoute>
        ),
      },
      {
        path: 'watch/:id',
        element: (
          <AuthRoute>
            <Layout>
              <WatchScreen />
            </Layout>
          </AuthRoute>
        ),
      },
      {
        path: 'feed/subscriptions',
        element: (
          <AuthRoute>
            <Layout>
              <SubscriptionsScreen />
            </Layout>
          </AuthRoute>
        ),
      },
      {
        path: 'channel/:channelId',
        element: (
          <AuthRoute>
            <Layout>
              <ChannelScreen />
            </Layout>
          </AuthRoute>
        ),
      },
      {
        path: 'playlist/liked-videos',
        element: (
          <AuthRoute>
            <Layout>
              <LikedScreen />
            </Layout>
          </AuthRoute>
        ),
      },
    ],
  },
]);

export default router;
