import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Popup from "./Popup";
import { Link } from "react-router-dom";
import { useLayoutEffect } from "react";
import Loading from "../LoadingError/Loading";

import {
  decrement,
  getAllSituation,
  getPage,
  getSituationByDepartment,
  increment,
} from "../../redux/situationSlice";
import { getAllTreatment } from "../../redux/treatmentSlice";
import { getAllDiagnose } from "../../redux/diagnoseSlice";
import { getAllMark } from "../../redux/markSlice";

function Situation({ departId, setDepartId }) {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [situationId, setSituationId] = useState("");
  const { listMark } = useSelector((state) => state.mark);
  const { pending, listSituation, page, maxPage } = useSelector(
    (state) => state.situation
  );
  const { userInfo } = useSelector((state) => state.auth);
  console.log("list",listMark)

  const checkSituationIsDone = (situationId, userId) => {
    if (
      listMark.filter(
        (item) => item.situation?._id === situationId && item.userId._id === userId
      )?.length > 0
    ) {
      return true;
    } else {
      return false;
    }
  };
  useLayoutEffect(() => {
    if (departId === "") {
      dispatch(getAllSituation());
    } else {
      dispatch(getSituationByDepartment(departId));
    }
    // dispatch(getAllDepartment());
    dispatch(getAllTreatment());
    dispatch(getAllDiagnose());
    dispatch(getAllMark());
  }, [dispatch, situationId, listSituation?.length, page, departId]);
  // dispatch(getAllSituation());
  // }, [dispatch, situationId, listSituation?.length, page]);

  const handleClick = (id) => {
    setIsOpen(true);
    setSituationId(id);
  };
  // console.log(check);
  const close = () => {
    setIsOpen(false);
    setSituationId("");
  };
  return (
    <>
      <div className="question col-12">
        {pending ? (
          <Loading />
        ) : (
          <>
            {listSituation?.map((item) => (
              <div
                className="situation col-6 col-md-4 col-lg-3"
                value={item._id}
                key={item._id}
                onClick={() => handleClick(item._id)}
              >
                {checkSituationIsDone(item?._id, userInfo?._id) && (
                  <i className="fa fa-check-square-o " aria-hidden="true"></i>
                )}
                <img
                  src="https://caodangyduocsaigon.com/images/files/caodangyduocsaigon.com/bieu-tuong-nganh-y.png"
                  alt="img"
                />{" "}
                <h6 className="situationname">
                  <b>{item.name} </b>
                </h6>
                <span>
                  <b>Lượt làm: &nbsp;</b>
                  {item.times}
                </span>
              </div>
            ))}
          </>
        )}
        {/* POPUP_QUESTION */}
        <Popup
          open={isOpen}
          id={situationId}
          onClose={close}
          key={situationId}
        ></Popup>
      </div>
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

export default Situation;
