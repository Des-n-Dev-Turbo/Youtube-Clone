import React from 'react';
import ReactDOM from 'react-dom/client';

import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import router from './router/index.jsx';
import { store } from './store';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-loading-skeleton/dist/skeleton.css';
import 'react-lazy-load-image-component/src/effects/blur.css';
import './_base.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
