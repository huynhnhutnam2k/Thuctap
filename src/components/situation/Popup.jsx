import React, { useState, useEffect, useRef } from "react";
import "./popup.css";
import "suneditor/dist/css/suneditor.min.css";
import { useSelector, useDispatch } from "react-redux";
import { addMark, getAllMark } from "../../redux/markSlice";
import { getADiagnose } from "../../redux/diagnoseSlice";
import { getATreatment } from "../../redux/treatmentSlice";
import { getASituation } from "../../redux/situationSlice";
export default function Popup({ open, id }) {
  const { situation } = useSelector((state) => state.situation);
  const { diagnose } = useSelector((state) => state.diagnose);
  const { treatment } = useSelector((state) => state.treatment);
  const { listMark } = useSelector((state) => state.mark);
  const { userInfo } = useSelector((state) => state.auth);

  const markValid = listMark?.filter(
    (item) => item.situation?._id === id && item.userId === userInfo?._id
  );

  const [mark, setMark] = useState(10);
  const [showDiagnoseBtn, setShowDiagnoseBtn] = useState(true);
  const [showTreatmentBtn, setShowTreatmentBtn] = useState(true);
  const [showNoteBtn, setShowNotebtn] = useState(true);
  const [diagnoseIsDisplay, setDiagnoseIsDisplay] = useState(false);
  const [treatmentIsDisplay, setTreatmentIsDisplay] = useState(false);
  const [noteIsDisplay, setNoteIsDisplay] = useState(false);
  const [returnStep, setReturnStep] = useState(1);
  const dispatch = useDispatch();

  const handleDiagnose = async (id) => {
    await dispatch(getADiagnose(id));
    setDiagnoseIsDisplay(true);
    setShowDiagnoseBtn(false);
  };

  const handleClose = () => {
    window.location.reload();
  };

  const handleTreatment = async (id) => {
    await dispatch(getATreatment(id));
    setShowTreatmentBtn(false);
    setTreatmentIsDisplay(true);
    diagnose?.isTrue && !treatment?.isTrue && setReturnStep(2);
  };

  const handleNote = () => {
    setNoteIsDisplay(true);
    setShowNotebtn(false);
  };

  const handleComplete = async () => {
    const body = {
      userId: userInfo._id,
      marks: mark,
      situationId: situation?._id,
    };
    if (userInfo.token) {
      const token = userInfo.token;
      await dispatch(addMark({ body, token }));
      //console.log(body);
      window.location.reload();
    }
  };
  const reDoStep = (returnStep) => {
    if (returnStep === 1) {
      setDiagnoseIsDisplay(false);
      setShowDiagnoseBtn(true);
      setShowTreatmentBtn(true);
      setTreatmentIsDisplay(false);
      setNoteIsDisplay(false);
      setShowNotebtn(true);
      if (mark > 0) setMark(mark - 2.5);
    } else {
      setShowTreatmentBtn(true);
      setTreatmentIsDisplay(false);
      setNoteIsDisplay(false);
      setShowNotebtn(true);
      if (mark > 0) setMark(mark - 2.5);
    }
  };

  const redo = (
    <div div className="error">
      <div>Chẩn đoán của bạn không chính xác !!!</div>
      <button onClick={() => reDoStep(returnStep)}>Chọn lại</button>
    </div>
  );
  //scroll top
  const myRef = useRef(null);
  const scrollTop = () => myRef.current.scrollIntoView();

  useEffect(() => {
    dispatch(getASituation(id));
    dispatch(getAllMark());
  }, [id]);

  return open ? (
    <div className="OVERLAY">
      <div className="marks">
        <div className="markstable">
          <table>
            <thead>
              <tr>
                <th>Lần làm</th>
                <th>Điểm</th>
              </tr>
            </thead>
            {markValid?.map((mark, index) => (
              <tbody key={index}>
                <tr>
                  <td>{index + 1}</td>
                  <td>{mark.marks}</td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>

      <div className="marks2">
        <div className="markstable">
          <table>
            <thead>
              <tr>
                <th>Lần làm</th>
                {markValid?.map((mark, index) => (
                  <td key={index}>{index + 1}</td>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Điểm</th>
                {markValid?.map((mark, index) => (
                  <td key={index}>{mark.marks}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div ref={myRef} className="POPUP_STYLE">
        {/**closeBtn */}
        <button className="close-btn" onClick={() => handleClose()}>
          X
        </button>
        <div className="score2">Điểm: {mark}</div>

        {/*display situation*/}
        <>
          <div className="QUESTION">
            <div className="HIGHLIGHT">{situation?.name}</div>
            <div
              dangerouslySetInnerHTML={{
                __html: situation?.desc,
              }}
            />
          </div>

          {/** choice diagnose button */}
          <div className="choice-diagnose">
            {situation?.diagnose?.map((id, index) =>
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
                  <span className="namechoice">{diagnose?.name}</span>
                </div>
                <div className="HIGHLIGHT">Chẩn Đoán sơ bộ: </div>
                {
                  <div
                    dangerouslySetInnerHTML={{
                      __html: diagnose?.desc,
                    }}
                  />
                }
              </div>
              {diagnose?.treatment?.length > 0 ? (
                <div className="choice-diagnose">
                  {diagnose?.treatment?.map(
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
                  <span className="namechoice">{treatment?.name}</span>
                </div>
                <div className="HIGHLIGHT">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: treatment?.desc,
                    }}
                  />{" "}
                </div>
              </div>
              {treatment?.isTrue
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
              {treatment?.note?.length > 0 && (
                <div className="QUESTION">
                  <div className="HIGHLIGHT">Lưu ý:</div>
                  {treatment?.note}
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
