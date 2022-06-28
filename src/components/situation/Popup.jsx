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
  const [situationdisplay, setSituationdiaplay] = useState(initSituation);
  const [mark, setMark] = useState(10);
  const [diagnosedisplay, setDiagnosedisplay] = useState(initDiagnose);
  const [treatmentdisplay, setTreatmentdisplay] = useState(initTreatment);
  const [hidediagnosebtn, setHidediagnosebtn] = useState(true);
  const [hidetreatmentbtn, setHidetreatmentbtn] = useState(true);
  const [shownote, setShownote] = useState(false);
  const [hidenotebtn, setHidenotebtn] = useState(false);
  const [returnStep, setReturnStep] = useState(1);
  const [diagnoseIsDisplay, setDiagnoseIsDisplay] = useState(false);
  const [treatmentIsDisplay, setTreatmentIsDisplay] = useState(false);

  const setSituation = (id) => {
    setSituationdiaplay(
      situation.find((obj) => {
        return obj._id === id;
      })
    );
  };
  const setDiagnose = (id) => {
    setDiagnosedisplay(
      diagnose.find((obj) => {
        return obj._id === id;
      })
    );
  };
  const setTreatment = (id) => {
    setTreatmentdisplay(
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
    setHidediagnosebtn(false);
    setDiagnose(id);
    // eslint-disable-next-line no-unused-expressions
    diagnosedisplay.isTrue ? null : setReturnStep(2);
  };
  const handleClose = () => {
    window.location.reload();
  };

  const handleTreatment = (id) => {
    setHidetreatmentbtn(false);
    setTreatment(id);
    setTreatmentIsDisplay(true);
  };

  const handleNote = () => {
    setShownote(true);
    setHidenotebtn(true);
  };
  const handleComplete = () => {
    axios.post(url_point, {
      userId: userInfo.id,
      situation: id,
      mark: mark,
    });
    window.location.reload();
  };
  const reDoStep1 = () => {
    setDiagnosedisplay({});
    setHidediagnosebtn(true);
    setTreatmentdisplay({});
    setHidetreatmentbtn(true);
    setShownote(false);
    setHidenotebtn(false);
    setMark(mark - 2.5);
  };
  const reDoStep2 = () => {
    setHidediagnosebtn(false);
    setTreatmentdisplay({});
    setHidetreatmentbtn(true);
    setShownote(false);
    setHidenotebtn(false);
    setMark(mark - 2.5);
  };

  const reDo = () => {
    returnStep === 1 ? reDoStep1() : reDoStep2();
  };

  const redo = (
    <div className="error">
      <div>Không chính xác !!! </div>
      <button onClick={() => reDo()}>Chọn lại</button>
    </div>
  );
  const previousmark = (id, user) => {};

  return open ? (
    <div key="OVERLAY" className="OVERLAY">
      <div key="POPUP" className="POPUP_STYLE">
        <button className="close-btn" onClick={() => handleClose()}>
          X
        </button>
        <div className="score">Điểm: {mark}</div>
        {/*display situation*/}
        <>
          <div key="tinhuong" className="QUESTION">
            <div className="HIGHLIGHT">{situationdisplay?.name}</div>
            <div
              dangerouslySetInnerHTML={{
                __html: situationdisplay?.desc,
              }}
            />
          </div>
          {/** choice diagnose button */}
          <div className="choice-diagnose">
            {situationdisplay?.diagnose?.map((id, index) =>
              hidediagnosebtn ? (
                <button
                  className="choice-btn"
                  key={index}
                  onClick={() => handleDiagnose(id._id)}
                >
                  {id.name}
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
                  <span className="namechoice">{diagnosedisplay.name}</span>
                </div>
                <div className="HIGHLIGHT">Chẩn Đoán sơ bộ </div>
                {
                  <div
                    dangerouslySetInnerHTML={{
                      __html: diagnosedisplay.desc,
                    }}
                  />
                }
                {diagnosedisplay.treatment.length > 0 ? null : redo}
              </div>
              {/** choice treatment button */}
              <div className="choice-diagnose">
                {diagnosedisplay.treatment?.map((id, index) =>
                  hidetreatmentbtn ? (
                    <button
                      className="choice-btn"
                      key={index}
                      onClick={() => handleTreatment(id._id)}
                    >
                      {id.name}
                    </button>
                  ) : null
                )}
              </div>
            </>
          )}
          {/*display treatment */}
          {treatmentIsDisplay && (
            <div className="QUESTION">
              <div className="HIGHLIGHT-CHOICED">
                Lựa chọn của bạn:{" "}
                <span className="namechoice">{treatmentdisplay.name}</span>
              </div>
              <div className="HIGHLIGHT">
                <div
                  dangerouslySetInnerHTML={{
                    __html: treatmentdisplay.desc,
                  }}
                />{" "}
              </div>
              {treatmentdisplay.isTrue ? null : redo}
            </div>
          )}
          {treatmentdisplay.isTrue ? (
            hidenotebtn ? null : (
              <button className="choice-btn" onClick={() => handleNote()}>
                LƯU Ý
              </button>
            )
          ) : null}
          {shownote ? (
            <>
              <div className="QUESTION">
                <div className="HIGHLIGHT">Lưu ý</div>
                {treatmentdisplay.note}
              </div>
              <div className="success">
                <div>Điều trị thành công !!!</div>
                <button onClick={() => handleComplete()}>
                  Quay lại trang chủ
                </button>
              </div>
            </>
          ) : null}
          {/* <button
            onClick={() =>
              window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
            }
          >
            top
          </button> */}
        </>
      </div>
    </div>
  ) : null;
}
