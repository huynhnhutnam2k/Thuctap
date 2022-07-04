import React, { useState, useEffect, useRef } from "react";
import "./popup.css";
import "suneditor/dist/css/suneditor.min.css";
import { useSelector, useDispatch } from "react-redux";
import { addMark } from "../../redux/markSlice";
export default function Popup({ open, id }) {
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
  const { listMark } = useSelector((state) => state.mark);
  const { userInfo } = useSelector((state) => state.auth);
  const markValid = listMark?.filter(
    (item) => item.situation._id === id && item.userId === userInfo?._id
  );

  const [situationDisplay, setSituationDisplay] = useState(initSituation);
  const [diagnoseDisplay, setDiagnoseDisplay] = useState(initDiagnose);
  const [treatmentDisplay, setTreatmentDisplay] = useState(initTreatment);
  const [mark, setMark] = useState(10);
  const [allMark, setAllMark] = useState([]);
  const [showDiagnoseBtn, setShowDiagnoseBtn] = useState(true);
  const [showTreatmentBtn, setShowTreatmentBtn] = useState(true);
  const [showNoteBtn, setShowNotebtn] = useState(true);
  const [diagnoseIsDisplay, setDiagnoseIsDisplay] = useState(false);
  const [treatmentIsDisplay, setTreatmentIsDisplay] = useState(false);
  const [noteIsDisplay, setNoteIsDisplay] = useState(false);
  const [returnStep, setReturnStep] = useState(1);
  const dispatch = useDispatch();

  const setUserMark = (situationId) => {
    // eslint-disable-next-line array-callback-return
    allMark?.length === 0 &&
      listMark?.map((mark) => {
        mark.userId === userInfo?._id &&
          mark?.situation === situationId &&
          setAllMark((allMark) => [...allMark, mark.mark]);
      });
  };

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
    setUserMark(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleDiagnose = (id) => {
    setDiagnoseIsDisplay(true);
    setShowDiagnoseBtn(false);
    setDiagnose(id);
  };

  const handleClose = () => {
    window.location.reload();
  };

  const handleTreatment = (id) => {
    setShowTreatmentBtn(false);
    setTreatment(id);
    setTreatmentIsDisplay(true);
    diagnoseDisplay?.isTrue && !treatmentDisplay?.isTrue && setReturnStep(2);
  };

  const handleNote = () => {
    setNoteIsDisplay(true);
    setShowNotebtn(false);
  };

  const handleComplete = () => {
    const body = {
      // userId: userInfo._id,
      marks: mark,
      situationId: situationDisplay?._id,
    };
    if (userInfo.token) {
      const token = userInfo.token;
      dispatch(addMark({ body, token })).then(window.location.reload());
    }
  };
  const reDoStep = (returnStep) => {
    if (returnStep === 1) {
      setDiagnoseIsDisplay(false);
      setDiagnoseDisplay(initDiagnose);
      setShowDiagnoseBtn(true);
      setTreatmentDisplay(initTreatment);
      setShowTreatmentBtn(true);
      setTreatmentIsDisplay(false);
      setNoteIsDisplay(false);
      setShowNotebtn(true);
      setMark(mark - 2.5);
    } else {
      setTreatmentDisplay(initTreatment);
      setShowTreatmentBtn(true);
      setTreatmentIsDisplay(false);
      setNoteIsDisplay(false);
      setShowNotebtn(true);
      setMark(mark - 2.5);
    }
  };

  const redo = (
    <div div className="error">
      <div>Hướng làm của bạn chưa đúng </div>
      <button onClick={() => reDoStep(returnStep)}>Chọn lại</button>
    </div>
  );
  //scroll top
  const myRef = useRef(null);
  const scrollTop = () => myRef.current.scrollIntoView();

  return open ? (
    <div key="OVERLAY" className="OVERLAY">
      <div className="marks">
        <div className="markstable">
          <table>
            <tr>
              <th>Lần làm</th>
              <th>Điểm</th>
            </tr>
            {markValid?.map((mark, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{mark.marks}</td>
              </tr>
            ))}
          </table>
        </div>
      </div>

      <div className="marks2">
        <div className="markstable">
          <table>
            <tr>
              <th>Lần làm</th>
              {markValid?.map((mark, index) => (
                <td>{index + 1}</td>
              ))}
            </tr>
            <tr>
              <th>Điểm</th>
              {markValid?.map((mark) => (
                <td>{mark.marks}</td>
              ))}
            </tr>
          </table>
        </div>
      </div>

      <div key="POPUP" ref={myRef} className="POPUP_STYLE">
        {/**closeBtn */}
        <button className="close-btn" onClick={() => handleClose()}>
          X
        </button>
        <div className="score2">Điểm: {mark}</div>

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
              {diagnoseDisplay?.treatment?.length > 0 ? (
                <div className="choice-diagnose">
                  {diagnoseDisplay?.treatment?.map(
                    (id, index) =>
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
                </div>
              ) : (
                redo
              )}
            </>
          )}

          {/*display treatment */}
          {treatmentIsDisplay && (
            <>
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
              {treatmentDisplay?.isTrue
                ? showNoteBtn && (
                    <button className="choice-btn" onClick={() => handleNote()}>
                      LƯU Ý
                    </button>
                  )
                : redo}
            </>
          )}
          {noteIsDisplay ? (
            <>
              {treatmentDisplay?.note?.length > 0 && (
                <div className="QUESTION">
                  <div className="HIGHLIGHT">Lưu ý</div>
                  {treatmentDisplay?.note}
                </div>
              )}
              <div className="success">
                <div>Điều trị thành công !!!</div>
                <button onClick={() => handleComplete()}>
                  Quay lại trang chủ
                </button>
              </div>
            </>
          ) : null}
        </>
        <button className="btn-top" onClick={() => scrollTop()}>
          <li className="fa fa-arrow-circle-o-up"></li>
        </button>
      </div>
    </div>
  ) : null;
}
