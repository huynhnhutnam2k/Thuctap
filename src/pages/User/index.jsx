import React from "react";
import { logOut } from "../../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Auth from "../../pages/Login/Login";
import { useState, useEffect } from "react";
import { getAllMark } from "../../redux/markSlice";

function User() {
  const [userMark, setUserMark] = useState([]);
  const [markPerSituation, setMarkPerSituation] = useState([]);
  const { listMark: listMark } = useSelector((state) => state.mark);
  const getUserMark = () => {
    // eslint-disable-next-line array-callback-return
    userMark?.length === 0 &&
      listMark?.map((mark) => {
        mark.userId === userInfo?._id &&
          setUserMark((userMark) => [...userMark, mark]);
      });
  };
  const getMarkperSituation = (situationId) => {
    // eslint-disable-next-line array-callback-return
    markPerSituation?.length === 0 &&
      userMark?.map((mark) => {
        mark?.situation === situationId &&
          setMarkPerSituation((markPerSituation) => [
            ...markPerSituation,
            mark.mark,
          ]);
      });
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllMark());
  }, [dispatch]);

  useEffect(() => {
    getUserMark();
  }, [listMark]);

  const { userInfo } = useSelector((state) => state.auth);
  const handleLogout = () => {
    if (userInfo.token) {
      const { token, _id: id } = userInfo;
      dispatch(logOut({ token, id }));
    }
  };
  const uniqueIds = [];
  const userSituation = userMark.filter((element) => {
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
      <div className="score">
        <table>
          <thead>
            <tr>
              <th>Câu Hỏi</th>
              <th>Số Điểm</th>
            </tr>
          </thead>
          {userSituation?.map((mark, i) => (
            <tbody key={i}>
              <tr>
                <td>{mark.situation}</td>
                <td>
                  <table>
                    <tbody>
                      <tr>
                        <th>Lần làm</th>
                        <th>Điểm</th>
                      </tr>
                      {getMarkperSituation(mark.situation)}
                      {markPerSituation?.map((mark, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{mark}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
      {/* <div className="bannerlog">
        <img
          src="https://cdn.glitch.global/7b4743d8-a7e2-4d18-a87b-a1248d42b7cc/logo.png?v=1653215058970"
          alt=""
        />
      </div> */}
    </>
  );
}

export default User;
