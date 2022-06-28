import React, { useState, useEffect, useRef } from "react";
import "./popup.css";
import { getDiagnose, getQuestion, getTreatment, makeRequest } from "./getdata";
import "suneditor/dist/css/suneditor.min.css";
import axios, { AxiosError } from "axios";
const url_point = "";
export default function Popup({ open, id, onClose }) {
  const [questiondisplay, setQuestiondiaplay] = useState({
    _id: "",
    diagnose: [],
    image: "",
  });

  useEffect(() => {
    getQuestion(id).then((res) => setQuestiondiaplay(res));
  }, [id]);
  const [score, setScore] = useState(10);
  const [diagnosedisplay, setDiagnosedisplay] = useState({});
  const [treatmentdisplay, setTreatmentdisplay] = useState({});
  const [hidediagnosebtn, setHidediagnosebtn] = useState(true);
  const [hidetreatmentbtn, setHidetreatmentbtn] = useState(true);
  const [shownote, setShownote] = useState(false);
  const [hidenotebtn, setHidenotebtn] = useState(false);

  const handleDiagnose = (id) => {
    getDiagnose(id).then((res) => setDiagnosedisplay(res));
    setHidediagnosebtn(false);
  };
  const handleClose = () => {
    window.location.reload();
  };

  const handleTreatment = (id) => {
    setHidetreatmentbtn(false);
    getTreatment(id).then((res) => setTreatmentdisplay(res));
  };

  const handleNote = () => {
    setShownote(true);
    setHidenotebtn(true);
  };
  const handleComplete = () => {
    axios.post(url_point, {
      user: "test",
      questionId: id,
      score: score,
    });
    window.location.reload();
  };
  const reDo = () => {
    setDiagnosedisplay({});
    setHidediagnosebtn(true);
    setTreatmentdisplay({});
    setHidetreatmentbtn(true);
    setShownote(false);
    setHidenotebtn(false);
    setScore(score - 2.5);
    ///post result
    console.log(score);
  };

  const redo = (
    <div className="error">
      <div>Không chính xác !!! </div>
      <button onClick={reDo}>Chọn lại</button>
    </div>
  );
  const testRef = useRef(null);
  useEffect(() => {
    // document.addEventListener("load", () => {
    //   console.log(testRef.current);
    // });
  }, [open]);
  return open ? (
    <div key="OVERLAY" className="OVERLAY">
      <div className="score">
        <table className="scoretable">
          <tr>
            <th>Lần làm</th>
            <td>1</td>
          </tr>
          <tr>
            <th>Điểm</th>
            <td>{score}</td>
          </tr>
        </table>
      </div>
      <div key="POPUP" className="POPUP_STYLE">
        <button className="close-btn" onClick={handleClose}>
          X
        </button>
        <div>score: {score}</div>
        {/*display question*/}
        <>
          <div key="tinhuong" className="QUESTION">
            <div className="HIGHLIGHT">{questiondisplay.name}</div>

            <div
              dangerouslySetInnerHTML={{
                __html: questiondisplay?.description,
              }}
            />
          </div>
          {/** choice diagnose button */}
          <div className="choice-diagnose">
            {questiondisplay.diagnose?.map((id, index) =>
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
          {JSON.stringify(diagnosedisplay) !== "{}" ? (
            <div className="QUESTION">
              <div className="HIGHLIGHT-CHOICED">
                <div>Lựa chọn của bạn: </div>
                <span className="namechoice">{diagnosedisplay.name}</span>
              </div>
              <div className="HIGHLIGHT">Chẩn Đoán sơ bộ </div>
              {
                <div
                  dangerouslySetInnerHTML={{
                    __html: diagnosedisplay.description,
                  }}
                />
              }
              {diagnosedisplay.treatment.length > 0 ? null : redo}
            </div>
          ) : null}
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
          {/*display treatment */}
          {JSON.stringify(treatmentdisplay) !== "{}" ? (
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
              {treatmentdisplay.note?.length > 0 ? null : redo}
            </div>
          ) : null}
          {treatmentdisplay.note?.length > 0 ? (
            hidenotebtn ? null : (
              <button className="choice-btn" onClick={handleNote}>
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
                <div>Điều trị thành công </div>
                <button onClick={handleComplete}>Quay lại trang chủ</button>
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
