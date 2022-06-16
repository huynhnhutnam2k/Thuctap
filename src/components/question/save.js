import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllQuestion, getAnQuestion } from "../../redux/apiRequest";
import Popup from "./Popup";
import {
  getDiagnose,
  getQuestion,
  getSubDiagnose,
  getTreatment,
} from "./getdata";

function Question() {
  const [isOpen, setIsOpen] = useState(false);
  var name = "";
  const [questiondisplay, setQuestiondiaplay] = useState({
    _id: "",
    diagnose: [],
    image: "",
  });
  const [hidediagnose, setHidediagnose] = useState(true);
  const [hidesubdiagnose, setHidesubdiagnose] = useState(true);
  const [diagnosedisplay, setDiagnosedisplay] = useState({});
  const question = useSelector(
    (state) => state.question.questions?.allQuestion
  );
  const [anwserchoice, setAnwserchoice] = useState([]);
  const [subdiagnose, setSubdiagnose] = useState({});
  // const questionbycate = useSelector(state => state.question.questions?.allQuestion)
  const dispatch = useDispatch();
  useEffect(() => {
    getAllQuestion(dispatch);
  }, [dispatch]);

  //
  const handleQuestion = (id) => {
    setIsOpen(true);
    getQuestion(id).then((res) => {
      setQuestiondiaplay(res);
    });
    setAnwserchoice([...anwserchoice, id]);
  };
  //

  const handleDiagnose = (id) => {
    getDiagnose(id).then((res) => setDiagnosedisplay(res));
    setAnwserchoice([...anwserchoice, id]);
    setHidediagnose(false);
    setHidesubdiagnose(false);
  };
  const close = () => {
    setDiagnosedisplay({});
    setAnwserchoice([]);
    setIsOpen(false);
    setQuestiondiaplay({
      _id: "",
      diagnose: [],
      image: "",
    });
    setHidediagnose(true);
    setHidesubdiagnose(true);
  };

  //
  const handleSubdiagnose = (id) => {
    getSubDiagnose(id).then((res) => setSubdiagnose(res));
    setAnwserchoice([...anwserchoice, id]);
  };

  //redo choice
  const reDo = () => {
    setAnwserchoice([]);
    setDiagnosedisplay({});
    setSubdiagnose({});
    setHidediagnose(true);
    setHidediagnose(true);
  };

  const redo = (
    <div className="error">
      <div>Lỗi</div> <button onClick={reDo}>Chọn lại</button>
    </div>
  );

  return (
    <div className="question col-12">
      {question?.map((item) => (
        <>
          <div
            className="situation col-6 col-md-4 col-lg-2"
            value={item._id}
            key={item._id}
            onClick={() => handleQuestion(item._id)}
          >
            <img src={item.image} />
            <p>Tình huống: {item.name}</p>
            <p>Mô tả: {item.description}</p>
            <p>Điểm TB: {item.averageMark}</p>
          </div>
        </>
      ))}
      {/* POPUP_QUESTION */}

      <Popup open={isOpen} onClose={close}>
        <div key="POPUP">
          {/*display question*/}
          <div key="tinhuong" className="QUESTION">
            <div className="HIGHLIGHT">Tình huống</div>{" "}
            {questiondisplay?.description} <br></br>
            <br></br>
            <img src={questiondisplay?.image} className="center" />
          </div>

          {questiondisplay.diagnose?.map((id) =>
            hidediagnose ? (
              <button
                className="choice-btn"
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
            </div>
          ) : null}
          {diagnosedisplay.subDiagnose?.map((subdiag) =>
            hidesubdiagnose ? (
              <button onClick={() => handleSubdiagnose(subdiag)}>
                {subdiag}
              </button>
            ) : null
          )}
          {diagnosedisplay.subDiagnose ? redo : null}

          {/*display subdiag */}
          {JSON.stringify(subdiagnose) != "{}" ? (
            <>
              <div>Chẩn Đoán sơ bộ</div>
              <div>
                {subdiagnose.description}
                <img />
              </div>
            </>
          ) : null}
          {subdiagnose?.treatment?.map((treat) => (
            <button onClick={() => handleSubdiagnose(treat)}>{treat}</button>
          ))}
        </div>
      </Popup>
    </div>
  );
}
export default Question;