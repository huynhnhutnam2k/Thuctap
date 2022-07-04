import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Auth from "../../pages/Login/Login";
import { useState, useEffect } from "react";
import { getAllMark } from "../../redux/markSlice";
function User() {
  const [userMark, setUserMark] = useState([]);
  const { listMark } = useSelector((state) => state.mark);
  const { userInfo } = useSelector((state) => state.auth);


  const getUserMark = () => {
    console.log(userMark?.length === 0)
    console.log(userMark)
    userMark.length === 0 &&
      listMark?.map((mark, i) => {
        mark.userId === userInfo?._id &&
          setUserMark((userMark) => [...userMark, mark]);
      });
  };
  const getMarkPerSituation = (situationId) => {
    const marks = []
    // eslint-disable-next-line array-callback-return
    userMark?.map((mark) => {
      mark?.situation._id === situationId && marks.push(mark.marks)
      // setMarkPerSituation((markPerSituation) => [
      //   ...markPerSituation, mark.mark,
      // ]);
    });
    return marks
  };


  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllMark());
  }, [dispatch]);



  useEffect(() => {
    getUserMark();
  }, [listMark]);

  ///list Situation user do
  const uniqueIds = [];
  const userSituation = userMark.filter((element) => {
    const isDuplicate = uniqueIds.includes(element.situation._id);
    if (!isDuplicate) {
      uniqueIds.push(element.situation._id);
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
              <th>Tình huống</th>
              <th>Điểm số</th>
            </tr>
          </thead>
          <tbody>
            {userSituation?.map((mark, i) => (
              <tr key={i}>
                <td>{mark.situation.name}
                </td>
                <td>
                  <table>
                    <tbody>
                      <tr>
                        <th>Lần làm</th>
                        <th>Điểm</th>
                      </tr>
                      {getMarkPerSituation(mark.situation._id)?.map((mark, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{mark}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </td>
              </tr>
            ))}
          </tbody>
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
