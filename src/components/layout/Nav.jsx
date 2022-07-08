import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getAllDepartment } from "../../redux/departmentSlice";

import "./Style.scss";
function Nav({ departId, setDepartId }) {
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
  const [active, setActive] = useState("");
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
                <div className="submenu nav-item" key={1} id={1}>
                  <li
                    className={`nav-item ${departId === "" ? "active" : ""}`}
                    onClick={() => setDepartId("")}
                  >
                    <span>Tất cả</span>
                  </li>
                </div>
                {department?.map(
                  (item) =>
                    item.situation?.length > 0 && (
                      <div className="submenu" key={item._id} id={item._id}>
                        <b>{/* <i className="fa fa-circle"></i> */}|</b>
                        <li
                          className={`nav-item ${
                            departId === item._id ? "active" : ""
                          }`}
                          onClick={() => setDepartId(item._id)}
                        >
                          <span>
                            &nbsp;
                            {item.name}
                          </span>
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
            {department?.map(
              (item) =>
                item.situation?.length > 0 && (
                  <option value={item._id} key={item._id}>
                    {item.name}
                  </option>
                )
            )}
            <option value="">Tất cả</option>
          </select>
        </div>
      </div>
    </>
  );
}

export default Nav;
