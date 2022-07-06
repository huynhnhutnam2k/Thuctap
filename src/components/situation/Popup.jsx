import React, { useState, useEffect, useRef } from "react";
import "./popup.css";
import "suneditor/dist/css/suneditor.min.css";
import { useSelector, useDispatch } from "react-redux";
import { addMark } from "../../redux/markSlice";
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
      // eslint-disable-next-line array-callback-return
      listMark?.map((mark) => {
        mark.userId === userInfo?._id &&
          mark?.situation === situationId &&
          setAllMark((allMark) => [...allMark, mark.mark]);
      });
  };



  const handleDiagnose = async (id) => {
    await dispatch(getADiagnose(id))
    setDiagnoseIsDisplay(true);
    setShowDiagnoseBtn(false);
  };

  const handleClose = () => {
    window.location.reload();
  };

  const handleTreatment = async (id) => {
    setShowTreatmentBtn(false);
    setTreatmentIsDisplay(true);
    await dispatch(getATreatment(id))

    diagnose?.isTrue && !treatment?.isTrue && setReturnStep(2);
  };

  const handleNote = () => {
    setNoteIsDisplay(true);
    setShowNotebtn(false);
  };

  const handleComplete = () => {
    const body = {
      // userId: userInfo._id,
      marks: mark,
      situationId: situation?._id,
    };
    if (userInfo.token) {
      const token = userInfo.token;
      dispatch(addMark({ body, token })).then(window.location.reload());
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
      setMark(mark - 2.5);
    } else {
      setShowTreatmentBtn(true);
      setTreatmentIsDisplay(false);
      setNoteIsDisplay(false);
      setShowNotebtn(true);
      setMark(mark - 2.5);
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
    dispatch(getASituation(id))
  }, [id]);

  console.log(diagnose)

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
