import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getAccessToken, login } from '@store/reducers/authSlice';

import './_loginscreen.scss';

const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const accessToken = useSelector(getAccessToken);

  useEffect(() => {
    if (accessToken) {
      navigate('/');
    }
  }, [accessToken]);

  const handleLogin = () => {
    dispatch(login());
  };

  return (
    <div className="login">
      <div className="login__container">
        <img src="https://pngimg.com/uploads/youtube/youtube_PNG2.png" alt="Youtube Logo" />
        <button onClick={handleLogin}>Login with Google</button>
        <p>This project is a Youtube Clone using youtube API and React JS</p>
      </div>
    </div>
  );
};

export default LoginScreen;
