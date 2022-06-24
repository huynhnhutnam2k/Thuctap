import { useParams } from "react-router-dom";
import Nav from "../../components/layout/Nav";
import { useDispatch, useSelector } from 'react-redux';
import { getAllQuestion} from '../../redux/apiRequest';
import Question from "../../components/question";
import React, { useEffect,useState } from 'react';
import Popup from "./Popup";
import parse from 'html-react-parser';

function QuestionByCate() {
  
  var name="";    
    const questionByCate = useParams();
    const question = useSelector(state => state.question.questions?.allQuestion)
    const dispatch = useDispatch()
      useEffect(() => {
        getAllQuestion(dispatch)
      },[dispatch])
    const close = () =>{
        setIsOpen(false);
        setQuestionId("");
    }
    const [isOpen, setIsOpen] = useState(false)
    const [questionId, setQuestionId] = useState("")

    const handleClick= (id) =>{
      setIsOpen(true)
      setQuestionId(id)
    }
    
    return (
         <>
        <Nav />
        <div className="question col-12">
        {question?.map(item =>(item.categories === questionByCate.id?(
                <div className="situation col-6 col-md-4 col-lg-2" key={item._id} onClick={()=>handleClick(item._id)}>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8uRX4rai3Bv0Lb_B6XL0WCUbQ4i-QajaX8sgavBvkI7hSCC-5lBTAJBFKm7tX0AGzzlo&usqp=CAU"/>
                <p><b>Tình huống:</b> {item.name}</p>                
                <div className="desc"><p><b>Mô tả:</b> {parse(item.description)}</p></div>
                <p><b>Điểm TB:</b> {item.averageMark}</p>
            </div>
            ):"")
            )}
        </div>
        <Popup open={isOpen} id={questionId} onClose={close}></Popup> 
        </>
    );
}

export default QuestionByCate;