import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { getAccessToken } from '@store/reducers/authSlice';

/* eslint-disable react/prop-types */
const AuthRoute = ({ children }) => {
  const accessToken = useSelector(getAccessToken);

  if (!accessToken) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default AuthRoute;
