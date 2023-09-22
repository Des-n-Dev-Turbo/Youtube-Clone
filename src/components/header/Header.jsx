/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { FaBars } from 'react-icons/fa6';
import { AiOutlineSearch } from 'react-icons/ai';
import { MdNotificationsNone, MdApps } from 'react-icons/md';

import { getUser } from '@store/reducers/authSlice';

import './_header.scss';

// eslint-disable-next-line react/prop-types
const Header = ({ handleToggleSidebar }) => {
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/');
    setSearchText('');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search/${searchText}`);
  };

  const user = useSelector(getUser);

  return (
    <div className="header">
      <FaBars className="header__menu" size={26} onClick={handleToggleSidebar} />
      <img
        src="https://pngimg.com/uploads/youtube/youtube_PNG2.png"
        alt="Youtube Logo"
        className="header__logo"
        onClick={handleHomeClick}
      />

      <form onSubmit={handleSearch}>
        <input type="text" placeholder="Search" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
        <button type="submit">
          <AiOutlineSearch size={22} />
        </button>
      </form>

      <div className="header__icons">
        <MdApps size={28} />
        <MdNotificationsNone size={28} />
        <img src={user.photoURL} alt={user.displayName} />
      </div>
    </div>
  );
};

export default Header;
