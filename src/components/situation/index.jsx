import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Popup from "./Popup";
import parse from "html-react-parser";
import { getAllSituation } from "../../redux/situationSlice";
import { getAllDepartment } from "../../redux/departmentSlice";
import { getAllTreatment } from "../../redux/treatmentSlice";
import { getAllDiagnose } from "../../redux/diagnoseSlice";
import { getAllMark } from "../../redux/markSlice";
import Pagination from "../pagination";

import { useLayoutEffect } from "react";
// import queryString from 'query-string';

function Situation() {
  const [isOpen, setIsOpen] = useState(false);
  const [situationId, setSituationId] = useState("bmm");
  const dispatch = useDispatch();
  const { listMark } = useSelector((state) => state.mark);
  useLayoutEffect(() => {
    dispatch(getAllSituation());
    dispatch(getAllDepartment());
    dispatch(getAllTreatment());
    dispatch(getAllDiagnose());
    dispatch(getAllMark());
  }, [dispatch, situationId]);
  const { listSituation: situation } = useSelector((state) => state.situation);
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
        {situation?.map((item) => (
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
      {/* <Pagination /> */}
    </>
  );
}

export default Situation;
