import React from "react";
import { Link, NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div>
      <aside className="navbar-aside" id="offcanvas_aside">
        <div className="aside-top">
          <Link to="/" className="brand-wrap">
            <img
              src="/images/logo.gif"
              style={{ height: "46" }}
              className="logo"
              alt="Ecommerce dashboard template"
            />
          </Link>
          <div>
            <button className="btn btn-icon btn-aside-minimize">
              <i className="text-muted fas fa-stream"></i>
            </button>
          </div>
        </div>

        <nav>
          <ul className="menu-aside">
            <li className="menu-item" key="1">
              <NavLink
                className={(navData) => (navData.isActive ? "menu-link active" : 'menu-link')}
                to="/"
              >
                <i className="icon fas fa-home"></i>
                <span className="text">Trang chủ</span>
              </NavLink>
            </li>

            <li className="menu-item" key="2">
              <NavLink
                className={(navData) => (navData.isActive ? "menu-link active" : 'menu-link')}
                to="/qnas"
              >
                <i className="icon fas fa-shopping-bag"></i>
                <span className="text">Danh sách câu hỏi</span>
              </NavLink>
            </li>
            {/* <li className="menu-item">
              <NavLink
                className={(navData) => (navData.isActive ? "menu-link active" : 'menu-link')}
                to="/add-qna"
              >
                <i class="icon fas fa-plus "></i>
                <span className="text">Thêm câu hỏi</span>
              </NavLink>
            </li> */}

            <li className="menu-item" key="3">
              <NavLink
                className={(navData) => (navData.isActive ? "menu-link active" : 'menu-link')}
                to="/users"
              >
                <i className="icon fas fa-user"></i>
                <span className="text">Nhân viên</span>
              </NavLink>
            </li>
            <li className="menu-item" key="4">
              <NavLink
                className={(navData) => (navData.isActive ? "menu-link active" : 'menu-link')}
                to="/department"
              >
                <i className="icon fas fa-user"></i>
                <span className="text">Chuyên khoa</span>
              </NavLink>
            </li>
            <li className="menu-item" key="5">
              <NavLink
                className={(navData) => (navData.isActive ? "menu-link active" : 'menu-link')}
                to="/diagnose"
              >
                <i className="icon fas fa-user"></i>
                <span className="text">Chẩn đoán</span>
              </NavLink>
            </li>
            <li className="menu-item" key="6">
              <NavLink
                className={(navData) => (navData.isActive ? "menu-link active" : 'menu-link')}
                to="/treatment"
              >
                <i className="icon fas fa-user"></i>
                <span className="text">Điều trị</span>
              </NavLink>
            </li>
            {/* <li className="menu-item">
              <NavLink
                className={(navData) => (navData.isActive ? "menu-link active" : 'menu-link')}
                to="/add-user"
              >
                <i class="icon fas fa-plus "></i>
                <span className="text">Thêm nhân viên</span>
              </NavLink>
            </li> */}
          </ul>
          <br />
          <br />
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;