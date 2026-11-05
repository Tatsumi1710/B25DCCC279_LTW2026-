import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  const getNavClass = ({ isActive }) => (isActive ? 'nav-link active' : 'nav-link');

  return (
    <nav className="navbar">
      <NavLink to="/" end className={getNavClass}>
        Trang chủ
      </NavLink>
      <NavLink to="/questions" className={getNavClass}>
        Ngân hàng câu hỏi
      </NavLink>
      <NavLink to="/history" className={getNavClass}>
        Lịch sử
      </NavLink>
    </nav>
  );
};

export default NavBar;