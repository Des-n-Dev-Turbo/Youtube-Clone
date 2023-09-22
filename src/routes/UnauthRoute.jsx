import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { getAccessToken } from '@store/reducers/authSlice';

/* eslint-disable react/prop-types */
const UnauthRoute = ({ children }) => {
  const accessToken = useSelector(getAccessToken);

  if (accessToken) {
    return <Navigate to="/" />;
  }
  return children;
};

export default UnauthRoute;
