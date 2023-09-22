import { useState } from 'react';

import { Container } from 'react-bootstrap';

import Header from '@components/header/Header';
import Sidebar from '@components/sidebar/Sidebar';

import '../../_app.scss';

/* eslint-disable react/prop-types */
const Layout = ({ children }) => {
  const [sidebar, setSidebar] = useState(false);

  const handleToggleSidebar = () => {
    setSidebar((prev) => !prev);
  };

  return (
    <>
      <Header handleToggleSidebar={handleToggleSidebar} />
      <div className="app__container">
        <Sidebar sidebar={sidebar} handleToggleSidebar={handleToggleSidebar} />
        <Container fluid className="app__main">
          {children}
        </Container>
      </div>
    </>
  );
};

export default Layout;
