/* eslint-disable react/prop-types */
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  MdSubscriptions,
  MdExitToApp,
  MdThumbUp,
  MdHistory,
  MdLibraryBooks,
  MdHome,
  MdSentimentDissatisfied,
} from 'react-icons/md';
import cls from 'classnames';

import { logout } from '@store/reducers/authSlice';

import './_sidebar.scss';

const Sidebar = ({ sidebar, handleToggleSidebar }) => {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <nav className={cls('sidebar', { open: sidebar })} onClick={handleToggleSidebar}>
      <Link to="/">
        <li>
          <MdHome size={23} />
          <span>Home</span>
        </li>
      </Link>
      <Link to="/feed/subscriptions">
        <li>
          <MdSubscriptions size={23} />
          <span>Subscriptions</span>
        </li>
      </Link>
      <Link to="/playlist/liked-videos">
        <li>
          <MdThumbUp size={23} />
          <span>Liked Videos</span>
        </li>
      </Link>
      <li>
        <MdHistory size={23} />
        <span>History</span>
      </li>
      <li>
        <MdLibraryBooks size={23} />
        <span>Library</span>
      </li>
      <li>
        <MdSentimentDissatisfied size={23} />
        <span>I Don{`'`}t Know</span>
      </li>
      <hr />
      <li onClick={logoutHandler}>
        <MdExitToApp size={23} />
        <span>Logout</span>
      </li>
      <hr />
    </nav>
  );
};

export default Sidebar;
