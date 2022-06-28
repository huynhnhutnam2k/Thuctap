import { useParams } from "react-router-dom";
import Nav from "../../components/layout/Nav";
import { useDispatch, useSelector } from "react-redux";
import { getAllQuestion } from "../../redux/apiRequest";
import React, { useEffect, useState } from "react";
import Popup from "./Popup";
import parse from "html-react-parser";

function QuestionByCate() {
  var name = "";
  const questionByCate = useParams();
  const question = useSelector(
    (state) => state.question.questions?.allQuestion
  );
  console.log(question);
  const dispatch = useDispatch();
  useEffect(() => {
    getAllQuestion(dispatch);
  }, [dispatch]);
  const close = () => {
    setIsOpen(false);
    setQuestionId("");
  };
  const [isOpen, setIsOpen] = useState(false);
  const [questionId, setQuestionId] = useState("");

  const handleClick = (id) => {
    setIsOpen(true);
    setQuestionId(id);
  };

  return (
    <>
      <Nav />
      <div className="question col-12">
        {question?.map((item) =>
          item.departmentId?._id === questionByCate.id ? (
            <div
              className="situation col-6 col-md-4 col-lg-2"
              key={item._id}
              onClick={() => handleClick(item._id)}
            >
              {/* <img
                src="https://caodangyduocsaigon.com/images/files/caodangyduocsaigon.com/bieu-tuong-nganh-y-te.jpg"
                alt="img"
              /> */}
              <p>
                <b>{item.name}</b>
              </p>
              <p>
                <b>Mô tả:</b> <div className="desc">{parse(item.desc)}</div>
              </p>
              <p>{/* <b>Điểm TB:</b> {item.averageMark} */}</p>
            </div>
          ) : (
            ""
          )
        )}
      </div>
      <Popup open={isOpen} id={questionId} onClose={close}></Popup>
    </>
  );
}

export default QuestionByCate;
