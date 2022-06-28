import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllQuestion } from "../../redux/apiRequest";
import Pagination from "../../components/pagination";
import Popup from "./Popup";
import parse from "html-react-parser";

function Question() {
  const [isOpen, setIsOpen] = useState(false);
  const [questionId, setQuestionId] = useState("");
  const question = useSelector(
    (state) => state.question.questions?.allQuestion
  );

  const handleClick = (id) => {
    setIsOpen(true);
    setQuestionId(id);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    getAllQuestion(dispatch);
  }, [dispatch]);

  const close = () => {
    setIsOpen(false);
    setQuestionId("");
  };
  return (
    <>
      <div className="question col-12">
        {question?.map((item) => (
          <div
            className="situation col-6 col-md-4 col-lg-2"
            value={item._id}
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
        ))}
        {/* POPUP_QUESTION */}
        <Popup open={isOpen} id={questionId} onClose={close}></Popup>
      </div>
      <div className="pagination"></div>
    </>
  );
}
export default Question;
