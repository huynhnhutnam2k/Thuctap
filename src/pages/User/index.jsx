import React from "react";
import { logOut } from "../../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Auth from "../../pages/Login/Login";
import { useState, useEffect } from "react";
import { getAllMark } from "../../redux/markSlice";

function User() {
  const [userMark, setUserMark] = useState([])
  const [markPerSituation, setMarkPerSituation] = useState([])
  const { listMark: listMark } = useSelector((state) => state.mark)
  const getUserMark = () => {
    // eslint-disable-next-line array-callback-return
    userMark?.length === 0 && listMark?.map((mark) => {
      mark.userId === userInfo?._id && setUserMark(userMark => [...userMark, mark])
    })
  }
  const getMarkperSituation = (situationId) => {
    // eslint-disable-next-line array-callback-return
    markPerSituation?.length === 0 && userMark?.map((mark) => {
      mark?.situation === situationId && setMarkPerSituation(markPerSituation => [...markPerSituation, mark.mark])
    })
  }

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllMark())
  }, [dispatch]);

  useEffect(() => {
    getUserMark()
  }, [listMark])

  const { userInfo } = useSelector((state) => state.auth);
  const handleLogout = () => {
    if (userInfo.token) {
      const { token, _id: id } = userInfo;
      dispatch(logOut({ token, id }));
    }
  };
  const uniqueIds = [];
  const userSituation = userMark.filter(element => {
    const isDuplicate = uniqueIds.includes(element.situation);
    if (!isDuplicate) {
      uniqueIds.push(element.situation);
      return true;
    }
    return false;
  });
  return (
    <>
      <Auth />
      {/*<div className="account">
        <div className="user col-sm-5">
          <div className="user-info">
            <div className="user-header">
              <h5>
                <b>Thông tin tài khoản</b>
              </h5>
            </div>
            <p>
              <b>Email: {userInfo.email}</b>
              <span></span>
            </p>
            <p>
              <b>Số câu đã làm: </b>
            </p>
            
            <Link className="user-item d-flex" to="/#" onClick={handleLogout}>
              <i className="fa fa-sign-out"> Đăng xuất</i>
            </Link>
          </div>
        </div>
        <div className="mid col-1">
          <br></br>
        </div>
        <div className="bannerlog col-sm-5">
          <img
            src="https://cdn.glitch.global/7b4743d8-a7e2-4d18-a87b-a1248d42b7cc/logo.png?v=1653215058970"
            alt=""
          />
        </div>
      </div>*/}
      <table>
        <tbody>
          <th>Câu Hỏi</th>
          <th>Số Điểm</th>
        </tbody>
        {userSituation?.map((mark, i) =>
          <tbody key={i}>
            <th>{mark.situation}</th>
            <th>
              <table>
                <tbody>
                  <th>Lần làm</th>
                  <th>Điểm</th>
                </tbody>
                {getMarkperSituation(mark.situation)}
                {markPerSituation?.map((mark, index) => (
                  <tbody >
                    <th>{index + 1}</th>
                    <th>{mark}</th>
                  </tbody>))}
              </table>
            </th>
          </tbody>
        )}

      </table>
    </>
  );
}

export default User;
