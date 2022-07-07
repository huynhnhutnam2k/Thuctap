import { useParams } from "react-router-dom";
import Nav from "../layout/Nav";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import Popup from "./Popup";
import { getAllDepartment } from "../../redux/departmentSlice";
import { Link } from "react-router-dom";
import {
  decrement,
  getAllSituation,
  getPage,
  increment,
} from "../../redux/situationSlice";

function SituationByCate() {
  const situationByCate = useParams();
  const dispatch = useDispatch();
  const { listSituation, page, maxPage } = useSelector(
    (state) => state.situation
  );

  useEffect(() => {
    dispatch(getAllSituation());
    dispatch(getAllDepartment());
  }, [dispatch, listSituation?.length, page]);

  const [isOpen, setIsOpen] = useState(false);
  const [situationId, setSituationId] = useState("");

  const handleClick = (id) => {
    setIsOpen(true);
    setSituationId(id);
  };

  return (
    <>
      <Nav />
      <div className="question col-12">
        {listSituation?.map((item) =>
          item.departmentId?._id === situationByCate.id ? (
            <div
              className="situation col-6 col-md-4 col-lg-3"
              key={item._id}
              onClick={() => handleClick(item._id)}
            >
              <img
                src="https://caodangyduocsaigon.com/images/files/caodangyduocsaigon.com/bieu-tuong-nganh-y.png"
                alt=""
              />
              <h6>
                <b>{item.name}</b>
              </h6>
              {/* <div className="desc">{parse(item.desc)}</div> */}
            </div>
          ) : (
            ""
          )
        )}
      </div>
      <Popup open={isOpen} id={situationId}></Popup>
      <nav className="nav-pagination">
        <ul className="pagination">
          <li className={`page-item ${page === 1 ? "disabled" : ""} `}>
            <Link
              className="page-link"
              to="#"
              onClick={() => dispatch(decrement())}
            >
              <i className="fa fa-angle-double-left" aria-hidden="true"></i>
            </Link>
          </li>
          <li className="page-item active">
            <Link className="page-link" to="#">
              {page}
            </Link>
          </li>
          <li className={`page-item ${page >= maxPage ? "disabled" : ""} `}>
            <Link
              className="page-link"
              to="#"
              onClick={() => dispatch(increment())}
            >
              <i className="fa fa-angle-double-right" aria-hidden="true"></i>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default SituationByCate;
