import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

const Layout = ({ loading, error }) => {
  return (
    <div>
      <NavBar />
      <main className="container">
        {loading ? (
          <p>Đang tải câu hỏi...</p>
        ) : error ? (
          <p>Không tải được câu hỏi</p>
        ) : (
          <Outlet />
        )}
      </main>
    </div>
  );
};

export default Layout;