import React from 'react';
import { Link, NavLink } from "react-router-dom";


function Sidebar() {

  return (

    <div className="sidebar-menu">

      <ul className="menu-aside">

        <li className="menu-item" key="1">
          <NavLink
            className={(navData) => (navData.isActive ? "menuitem active" : 'menuitem')}
            to="/"
            data-toggle="popover-hover" data-content="Trang chủ">
            <i className="fas fa-home"></i>
          </NavLink>
        </li>

        <li className="menu-item" key="2">
          <a
            className='menuitem'
            href="http://lib.ctump.edu.vn/trang-chu" target="_blank"
            data-toggle="popover-hover3" data-content="Tài liệu">
            <i className="fas fa-book"></i>
          </a>
        </li>

        <li className="menu-item" key="3">
          <NavLink
            className={(navData) => (navData.isActive ? "menuitem active" : 'menuitem')}
            to="/User"
            data-toggle="popover-hover2" data-content="Tài khoản">
            <i className="fas fa-user"></i>
          </NavLink>
        </li>

        {/* <li className="menu-item" key="4">
  <NavLink
    className={(navData) => (navData.isActive ? "menuitem active" : 'menuitem')}
    to="/Question"
    data-toggle="popover-hover4" data-content="Tình huống">
      <i className="fas fa-question"></i>
  </NavLink>
  </li> */}


        <li className="menu-item" key="5">
          <NavLink
            className={(navData) => (navData.isActive ? "menuitem active" : 'menuitem')}
            to="/Introduce"
            data-toggle="popover-hover4" data-content="Giới thiệu">
            <i className="fas fa-info"></i>
          </NavLink>
        </li>

      </ul>
    </div>

  );
}

export default Sidebar;