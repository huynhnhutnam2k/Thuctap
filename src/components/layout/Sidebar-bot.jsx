import React from 'react';
import { Link, NavLink } from "react-router-dom";


function Sidebar_bot() {
  
return (
  
<div className="sidebar-menu-bot" id="visible2">
<div className="navbar navbar-expand-sm">
<ul  className="menu-aside2">

  <li className="menu-item2" key="1">
  <NavLink
    className={(navData) => (navData.isActive ? "menuitem2 active" : 'menuitem2')}
    to="/"
    data-toggle="popover-hover">
      <i  className="fas fa-home"></i>
  </NavLink>
  </li>

  <li className="menu-item2" key="2">
  <a
    className='menuitem2'
    href="http://lib.ctump.edu.vn/trang-chu" target="_blank"
    data-toggle="popover-hover3" data-content="Tài liệu">
    <i  className="fas fa-book"></i>
  </a>
  </li>

  <li className="menu-item2" key="3">
  <NavLink
    className={(navData) => (navData.isActive ? "menuitem2 active" : 'menuitem2')}
    to="/User"
    data-toggle="popover-hover2">
      <i  className="fas fa-user"></i>
  </NavLink>
  </li>

  <li className="menu-item2" key="4">
  <NavLink
    className={(navData) => (navData.isActive ? "menuitem2 active" : 'menuitem2')}
    to="/Introduce"
    data-toggle="popover-hover4">
      <i className="fas fa-info"></i>
  </NavLink>
  </li>

</ul>

{/* <a href="/Question">
  <div className="menuitem2" data-toggle="popover-hover4" data-content="Câu hỏi">
    <li  className="fa fa-question-circle"></li>
  </div>
</a> */}
</div>
</div>

);
}

export default Sidebar_bot;