import React, { useState, useEffect } from "react";
import "./popup.css";
import { getDiagnose, getQuestion, getTreatment } from "./getdata";

export default function Popup({ open, id, onClose }) {
  const [questiondisplay, setQuestiondiaplay] = useState({
    _id: "",
    diagnose: [],
    image: "",
  });
  useEffect(() => {
    getQuestion(id).then((res) => setQuestiondiaplay(res));
  }, [id]);

  console.log(questiondisplay._id);
  const [hidediagnose, setHidediagnose] = useState(true);
  const [diagnosedisplay, setDiagnosedisplay] = useState({});

  const handleDiagnose = (id) => {
    getDiagnose(id).then((res) => setDiagnosedisplay(res));
    setHidediagnose(false);
  };
  const handleClose = () => {
    setQuestiondiaplay({});
    setDiagnosedisplay({});
    setHidediagnose(true);
    onClose();
  };

  const redo = () => {};

  return open ? (
    <div key="OVERLAY" className="OVERLAY">
      <div key="POPUP" className="POPUP_STYLE">
        <button className="close-btn" onClick={handleClose}>
          CLOSE
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
          {questiondisplay.diagnose?.map((id, index) =>
            hidediagnose ? (
              <button
                className="choice-btn"
                key={index}
                onClick={() => handleDiagnose(id._id)}
              >
                {id.name}
              </button>
            ) : null
          )}

          {/*display diagnose */}
          {JSON.stringify(diagnosedisplay) != "{}" ? (
            <div className="QUESTION">
              <div className="HIGHLIGHT">Chẩn Đoán sơ bộ </div>
              {diagnosedisplay.description}
              {diagnosedisplay.subDiagnose.length > 0 ? null : redo}
            </div>
          ) : null}
        </>
      </div>
    </div>
  ) : null;
}