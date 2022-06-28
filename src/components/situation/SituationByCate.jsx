import { useParams } from "react-router-dom";
import Nav from "../layout/Nav";
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect,useState } from 'react';
import Popup from "./Popup";
import parse from 'html-react-parser';
import { getAllSituation } from "../../redux/situationSlice";

function SituationByCate() {
    const situationByCate = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getAllSituation())
    },[dispatch])   
    const {listSituation:situation} = useSelector((state) => state.situation)
    const close = () =>{
        setIsOpen(false);
        setSituationId("");
    }
    const [isOpen, setIsOpen] = useState(false)
    const [situationId, setSituationId] = useState("")

    const handleClick= (id) =>{
      setIsOpen(true)
      setSituationId(id)
    }
    console.log(situation);
    
    return (
         <>
        <Nav />
        <div className="question col-12">
        {situation?.map(item =>(item.departmentId?._id === situationByCate.id?(
                <div className="situation col-6 col-md-4 col-lg-2" key={item._id} onClick={()=>handleClick(item._id)}>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8uRX4rai3Bv0Lb_B6XL0WCUbQ4i-QajaX8sgavBvkI7hSCC-5lBTAJBFKm7tX0AGzzlo&usqp=CAU"/>
                <p><b>Tình huống:</b> {item.name}</p>                
                <div className="desc"><p><b>Mô tả:</b> {parse(item.desc)}</p></div>
                <p><b>Điểm TB:</b> {item.averageMark}</p>
            </div>
            ):"")
            )}
        </div>
        <Popup open={isOpen} id={situationId} onClose={close}></Popup> 
        </>
    );
}

export default SituationByCate;