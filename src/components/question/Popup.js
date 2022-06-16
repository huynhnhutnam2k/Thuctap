import React, { useState, useEffect } from "react";
import "./popup.css";
import { getDiagnose, getQuestion, getTreatment, makeRequest } from "./getdata";
import "suneditor/dist/css/suneditor.min.css";

export default function Popup({ open, id, onClose }) {
  const [questiondisplay, setQuestiondiaplay] = useState({
    _id: "",
    diagnose: [],
    image: "",
  });
  const [answer, setAnswer] = useState([]);

  useEffect(() => {
    getQuestion(id).then((res) => setQuestiondiaplay(res));
    setAnswer((answer) => [...answer, id]);
  }, [id]);
  const [diagnosedisplay, setDiagnosedisplay] = useState({});
  const [treatmentdisplay, setTreatmentdisplay] = useState({});
  const [hidediagnosebtn, setHidediagnosebtn] = useState(true);
  const [hidetreatmentbtn, setHidetreatmentbtn] = useState(true);
  const [shownote, setShownote] = useState(false);
  const [hidenotebtn, setHidenotebtn] = useState(false);

  const handleDiagnose = (id) => {
    setAnswer((answer) => [...answer, id]);
    getDiagnose(id).then((res) => setDiagnosedisplay(res));
    setHidediagnosebtn(false);
  };
  const handleClose = () => {
    setQuestiondiaplay({});
    setDiagnosedisplay({});
    setHidediagnosebtn(true);
    onClose();
    setHidetreatmentbtn(true);
    setAnswer([id]);
    setTreatmentdisplay({});
    setShownote(false);
    setHidenotebtn(true);
  };

  const handleTreatment = (id) => {
    setAnswer((answer) => [...answer, id]);
    setHidetreatmentbtn(false);
    getTreatment(id).then((res) => setTreatmentdisplay(res));
    console.log(answer);
  };

  const handleResult = () => {};

  const handleNote = () => {
    setShownote(true);
    setHidenotebtn(true);
  };

  const reDo = () => {
    setDiagnosedisplay({});
    setHidediagnosebtn(true);
    setTreatmentdisplay({});
    setHidetreatmentbtn(true);
    setAnswer([]);
    console.log(answer);
    setShownote(false);
    setHidenotebtn(false);

    console.log(diagnosedisplay);
  };

  const redo = (
    <div className="error">
      <div>Không chính xác !!! </div>
      <button onClick={reDo}>Chọn lại</button>
    </div>
  );

  return open ? (
    <div key="OVERLAY" className="OVERLAY">
      <div key="POPUP" className="POPUP_STYLE">
        <button className="close-btn" onClick={handleClose}>
          X
        </button>
        {/*display question*/}
        <>
          <div key="tinhuong" className="QUESTION">
            <div className="HIGHLIGHT">Tình huống</div>{" "}
            {questiondisplay?.description} <br></br>
            <br></br>
            <img src={questiondisplay?.image} className="center" />
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
              <div
                dangerouslySetInnerHTML={{
                  __html: diagnosedisplay.description,
                }}
              />

              <img src={diagnosedisplay.image} />
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
              <div className="HIGHLIGHT">Điều trị </div>
              {treatmentdisplay.desc}
              <img src={treatmentdisplay.image} />
              <div className="HIGHLIGHT">Kết quả điều trị</div>
              {treatmentdisplay.result}
              {/* {treatmentdisplay.result?.length > 0 ? null : redo} */}
            </div>
          ) : null}
          {treatmentdisplay.note?.length > 0 ? (
            hidenotebtn ? null : (
              <button className="choice-btn" onClick={handleNote}>
                lưu ý
              </button>
            )
          ) : null}
          {shownote ? (
            <>
              <div className="QUESTION">
                <div className="HIGHLIGHT">Lưu ý</div>
                {treatmentdisplay.note}
              </div>
              <div className="error">
                <div>Điều trị thành công </div>
                <button onClick={handleClose}>Quay lại trang chủ</button>
              </div>
            </>
          ) : null}
        </>
      </div>
    </div>
  ) : null;
}
