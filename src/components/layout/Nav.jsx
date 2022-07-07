import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getAllDepartment } from "../../redux/departmentSlice";
function Nav({ departId, setDepartId }) {
  // const { departId, setDepartId } = props;
  // console.log(departId);
  // console.log(departId, typeof setDepartId);
  // console.log(departId);
  const dispatch = useDispatch();
  const { listDepartment: department } = useSelector(
    (state) => state.department
  );
  // console.log(department);
  let navigate = useNavigate();
  const routeChange = (e) => {
    let path = e.target.value;
    navigate(path);
  };
  useEffect(() => {
    dispatch(getAllDepartment());
  }, []);
  return (
    <>
      <div className="nav-menu-container">
        <div className="menu-container">
          <nav className="navbar navbar-expand-sm navbar-light bg">
            {/* <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#collapsibleNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button> */}
            <div className="collapse navbar-collapse" id="collapsibleNavbar">
              <ul className="navbar-nav">
                {department?.map(
                  (item) =>
                    item.situation?.length > 0 && (
                      <div
                        className="submenu nav-item"
                        key={item._id}
                        id={item._id}
                      >
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
                    )
                )}
              </ul>
            </div>
          </nav>
        </div>
        <div className="all">
          <select
            name="sort"
            id="sort"
            onChange={(e) => setDepartId(e.target.value)}
          >
            <option value="">-Chọn Khoa-</option>
            {department?.map((item) => (
              <option
                value={item._id}
                key={item._id}
                // onClick={() => setDepartId(item._id)}
              >
                {item.name}
              </option>
            ))}
            <option value={`/#`}>Tất cả</option>
          </select>
        </div>
      </div>
    </>
  );
}

export default Nav;
