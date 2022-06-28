import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { getAllDepartment } from "../../redux/departmentSlice";
function Nav() {
  const dispatch = useDispatch();
  const { listDepartment: department } = useSelector(
    (state) => state.department
  );
  const { pathname } = useLocation();
  let navigate = useNavigate();
  const routeChange = (e) => {
    let path = e.target.value;
    navigate(path);
  };
  useEffect(() => {
    dispatch(getAllDepartment());
  }, []);
  const [current, setCurret] = useState("");
  return (
    <div>
      <nav className="navbar navbar-expand-sm navbar-light bg">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav">
            {department?.map((item) => (
              <div className="submenu nav-item" key={item._id} id={item._id}>
                <li className="nav-item">
                  <NavLink
                    className={(navData) =>
                      navData.isActive ? "nav-item active" : "nav-item"
                    }
                    to={`/department/${item._id}`}
                  >
                    <span>{item.name}</span>
                  </NavLink>
                </li>
              </div>
            ))}

            <div className="all">
              <select
                name="sort"
                id="sort"
                onClick={routeChange}
                defaultValue={""}
              >
                <option value="">-Chọn Khoa-</option>
                {department?.map((item) => (
                  <option value={`/department/${item._id}`} key={item._id}>
                    {item.name}
                  </option>
                ))}
                <option value={`/#`}>Tất cả</option>
              </select>
            </div>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Nav;
