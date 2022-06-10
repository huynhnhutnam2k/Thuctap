import React from 'react';
import { useEffect, useState } from "react";
import { deleteUser, getAllUser } from "../../redux/apiRequest";
import { logIn} from '../../redux/authSlice';
import { logOut} from '../../redux/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Auth from "../../pages/Login/Login";

function User() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {userInfo} = useSelector(state => state.auth)

    const handleLogout = () => {
      if(userInfo.token){
        const {token, _id:id} = userInfo
        dispatch(logOut({token, id}))
      }
    }
    return (
    <>
    <Auth/>
    <div className="account">
        <div className="user col-sm-5">
            <div className="user-info">
                <div className="user-header"> <h5> <b>Thông tin tài khoản</b></h5></div>
                <p><b>Họ và Tên: </b></p>
                <p><b>Email: </b></p>
                <p><b>Số câu đã làm: </b></p>
                <p><b>Điểm trung bình: </b></p>
                <Link className="user-item d-flex" to="/#" onClick={handleLogout}>
                <li className="fa fa-sign-out">
                Đăng xuất</li>
              </Link>
            </div>
        
        </div>
        <div className="mid col-1">
            <br></br>
        </div>
        <div className="bannerlog col-sm-5">
            <img
              src="https://cdn.glitch.global/7b4743d8-a7e2-4d18-a87b-a1248d42b7cc/logo.png?v=1653215058970" alt=""
            />
        </div>
    </div>
    </> 
    );
}

export default User;