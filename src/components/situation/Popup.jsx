import React, { useState, useEffect } from "react";
import "./popup.css";
import "suneditor/dist/css/suneditor.min.css";
import axios from "axios";
import { useSelector } from "react-redux";
const url_point = "http://sv-dhyd.herokuapp.com/api/situation/submit";
export default function Popup({ open, id, onClose }) {
  const initSituation = {
    desc: "",
    _id: "",
    diagnose: [],
    name: "",
  };
  const initDiagnose = {
    desc: "",
    _id: "",
    treatment: [],
    name: "",
    isTrue: false,
  };
  const initTreatment = {
    _id: "",
    desc: "",
    note: "",
    name: "",
    isTrue: false,
  };

  const { listSituation: situation } = useSelector((state) => state.situation);
  const { listDiagnose: diagnose } = useSelector((state) => state.diagnose);
  const { listTreatment: treatment } = useSelector((state) => state.treatment);

  const { userInfo } = useSelector((state) => state.auth);
  const [situationDisplay, setSituationDisplay] = useState(initSituation);
  const [mark, setMark] = useState(10);
  const [diagnoseDisplay, setDiagnoseDisplay] = useState(initDiagnose);
  const [treatmentDisplay, setTreatmentDisplay] = useState(initTreatment);
  const [showDiagnoseBtn, setShowDiagnoseBtn] = useState(true);
  const [showTreatmentBtn, setHideTreatmentBtn] = useState(true);
  const [showNote, setShowNote] = useState(false);
  const [hideNoteBtn, setHideNoteBtn] = useState(false);
  const [returnStep, setReturnStep] = useState(1);
  const [diagnoseIsDisplay, setDiagnoseIsDisplay] = useState(false);
  const [treatmentIsDisplay, setTreatmentIsDisplay] = useState(false);
  const [diagnoseIsClicked, setDiagNoseIsClick] = useState(false);
  const [treatmentIsClicked, setTreatmentIsClick] = useState(false);
  const setSituation = (id) => {
    setSituationDisplay(
      situation.find((obj) => {
        return obj._id === id;
      })
    );
  };
  const setDiagnose = (id) => {
    setDiagnoseDisplay(
      diagnose.find((obj) => {
        return obj._id === id;
      })
    );
  };
  const setTreatment = (id) => {
    setTreatmentDisplay(
      treatment.find((obj) => {
        return obj._id === id;
      })
    );
  };

  useEffect(() => {
    setSituation(id);
  }, [id]);

  const handleDiagnose = (id) => {
    setDiagnoseIsDisplay(true);
    setShowDiagnoseBtn(false);
    setDiagnose(id);
    setDiagNoseIsClick(true);

  };
  const handleClose = () => {
    window.location.reload();
  };

  const handleTreatment = (id) => {
    setHideTreatmentBtn(false);
    setTreatment(id);
    setTreatmentIsDisplay(true);
    console.log(returnStep);
    diagnoseDisplay?.isTrue && !treatmentDisplay?.isTrue && setReturnStep(2)
    setTreatmentIsClick(true)
  };

  const handleNote = () => {
    setShowNote(true);
    setHideNoteBtn(true);
  };

  const handleComplete = () => {
    axios.post(url_point, {
      userId: userInfo.id,
      situation: id,
      mark: mark,
    });
    window.location.reload();
  };
  const reDoStep = (returnStep) => {
    if (returnStep === 1) {
      setDiagnoseIsDisplay(false)
      setDiagnoseDisplay({});
      setShowDiagnoseBtn(true);
      setDiagNoseIsClick(false)
      setTreatmentDisplay({});
      setHideTreatmentBtn(true);
      setTreatmentIsDisplay(false);
      setShowNote(false);
      setHideNoteBtn(false);
      setTreatmentIsClick(false);
      setMark(mark - 2.5);
    } else {
      setTreatmentDisplay({});
      setHideTreatmentBtn(true);
      setTreatmentIsDisplay(false);
      setShowNote(false);
      setHideNoteBtn(false);
      setTreatmentIsClick(false);
      setMark(mark - 2.5);
    }
  }

  const redo = (
    <div div className="error" >
      <div>Hướng làm của bạn chưa đúng </div>
      <button onClick={() => reDoStep(returnStep)}>Chọn lại</button>
    </div>
  );

  return open ? (
    <div key="OVERLAY" className="OVERLAY">
      <div key="POPUP" className="POPUP_STYLE">
        {/**closeBtn */}
        <button className="close-btn" onClick={() => handleClose()}>
          X
        </button>
        <div className="score">Điểm: {mark}</div>

        {/*display situation*/}
        <>
          <div key="tinhuong" className="QUESTION">
            <div className="HIGHLIGHT">{situationDisplay?.name}</div>
            <div
              dangerouslySetInnerHTML={{
                __html: situationDisplay?.desc,
              }}
            />
          </div>

          {/** choice diagnose button */}
          <div className="choice-diagnose">
            {situationDisplay?.diagnose?.map((id, index) =>
              showDiagnoseBtn ? (
                <button
                  className="choice-btn"
                  key={index}
                  onClick={() => handleDiagnose(id._id)}
                >
                  {id?.name}
                </button>
              ) : null
            )}
          </div>

          {/*display diagnose */}
          {diagnoseIsDisplay && (
            <>
              <div className="QUESTION">
                <div className="HIGHLIGHT-CHOICED">
                  <div>Lựa chọn của bạn: </div>
                  <span className="namechoice">{diagnoseDisplay?.name}</span>
                </div>
                <div className="HIGHLIGHT">Chẩn Đoán sơ bộ </div>
                {
                  <div
                    dangerouslySetInnerHTML={{
                      __html: diagnoseDisplay?.desc,
                    }}
                  />
                }
              </div>
              {/** choice treatment button */}
              {diagnoseIsClicked && diagnoseDisplay?.treatment?.length > 0 ?
                <div className="choice-diagnose">
                  {diagnoseDisplay?.treatment?.map((id, index) =>
                    showTreatmentBtn && (
                      <button
                        className="choice-btn"
                        key={index}
                        onClick={() => handleTreatment(id._id)}
                      >
                        {id.name}
                      </button>
                    )
                  )}
                </div> : redo}
            </>
          )}

          {/*display treatment */}
          {treatmentIsDisplay && (
            <div className="QUESTION">
              <div className="HIGHLIGHT-CHOICED">
                Lựa chọn của bạn:{" "}
                <span className="namechoice">{treatmentDisplay?.name}</span>
              </div>
              <div className="HIGHLIGHT">
                <div
                  dangerouslySetInnerHTML={{
                    __html: treatmentDisplay?.desc,
                  }}
                />{" "}
              </div>
            </div>
          )}
          {treatmentIsClicked && (treatmentDisplay?.isTrue ? (
            !hideNoteBtn && (
              <button className="choice-btn" onClick={() => handleNote()}>
                LƯU Ý
              </button>
            )
          ) : redo)}
          {showNote ? (
            <>
              <div className="QUESTION">
                <div className="HIGHLIGHT">Lưu ý</div>
                {treatmentDisplay?.note}
              </div>
              <div className="success">
                <div>Điều trị thành công !!!</div>
                <button onClick={() => handleComplete()}>
                  Quay lại trang chủ
                </button>
              </div>
            </>
          ) : null}
        </>
      </div>
    </div>
  ) : null;
}
