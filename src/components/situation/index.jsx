import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Popup from "./Popup";
import { Link } from "react-router-dom";
import { useLayoutEffect } from "react";
import {
  decrement,
  getAllSituation,
  getPage,
  increment,
} from "../../redux/situationSlice";

function Situation() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [situationId, setSituationId] = useState("");
  const { listSituation, page, maxPage } = useSelector(
    (state) => state.situation
  );
  useLayoutEffect(() => {
    dispatch(getAllSituation());
  }, [dispatch, situationId, listSituation?.length, page]);

  // const { listSituation: situation } = useSelector((state) => state.situation);
  // console.log(listMark);

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
        {listSituation?.map((item) => (
          <div
            className="situation col-6 col-md-4 col-lg-3"
            value={item._id}
            key={item._id}
            onClick={() => handleClick(item._id)}
          >
            <img
              src="https://caodangyduocsaigon.com/images/files/caodangyduocsaigon.com/bieu-tuong-nganh-y.png"
              alt="img"
            />
            <h6>
              <b>{item.name}</b>
            </h6>
            {/* <div className="desc">{parse(item.desc)}</div> */}
          </div>
        ))}
        {/* POPUP_QUESTION */}
        <Popup open={isOpen} id={situationId} onClose={close}></Popup>
      </div>
      <nav className="nav-pagination">
        <ul className="pagination">
          <li className={`page-item ${page === 1 ? "disabled" : ""} `}>
            <Link
              className="page-link"
              to="#"
              onClick={() => dispatch(decrement())}
            >
              <i class="fa fa-angle-double-left" aria-hidden="true"></i>
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
              <i class="fa fa-angle-double-right" aria-hidden="true"></i>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Situation;
