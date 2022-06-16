import { useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

 function  Auth() {
    const {userInfo} = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(()=> {  
      if(!userInfo){
        navigate('/Login')
      }
    },[dispatch])
    return (  
      <></>
        // <login/>
    );
}

export default Auth ;