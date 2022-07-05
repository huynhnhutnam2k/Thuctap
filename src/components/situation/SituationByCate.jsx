import { useParams } from "react-router-dom";
import Nav from "../layout/Nav";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import Popup from "./Popup";
import parse from "html-react-parser";
import { getAllSituation } from "../../redux/situationSlice";
import { getAllDiagnose } from "../../redux/diagnoseSlice";
import { getAllTreatment } from "../../redux/treatmentSlice";
import { getAllMark } from "../../redux/markSlice";
import { getAllDepartment } from "../../redux/departmentSlice";
import Pagination from "../pagination";

function SituationByCate() {
  const situationByCate = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllSituation());
    dispatch(getAllDiagnose());
    dispatch(getAllTreatment());
    dispatch(getAllDepartment());
    dispatch(getAllMark());
  }, [dispatch]);
  const { listSituation: situation } = useSelector((state) => state.situation);
  const close = () => {
    setIsOpen(false);
    setSituationId("");
  };
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
        {situation?.map((item) =>
          item.departmentId?._id === situationByCate.id ? (
            <div
              className="situation col-6 col-md-4 col-lg-3"
              key={item._id}
              onClick={() => handleClick(item._id)}
            >
              <img src="https://caodangyduocsaigon.com/images/files/caodangyduocsaigon.com/bieu-tuong-nganh-y.png" />
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
      <Popup open={isOpen} id={situationId} onClose={close}></Popup>
      {/* <Pagination /> */}
    </>
  );
}

export default SituationByCate;
