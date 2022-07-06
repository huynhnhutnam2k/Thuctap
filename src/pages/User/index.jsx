import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Auth from "../../pages/Login/Login";
import { useEffect } from "react";
import { getAllMark } from "../../redux/markSlice";
function User() {
  const { listMark } = useSelector((state) => state.mark);
  const { userInfo } = useSelector((state) => state.auth);


  const getMarkPerSituation = (situationId) => {
    const marksArr = []
    listMark.filter(listMarks => listMarks.userId === userInfo?._id).map(marksPerSituation => { marksPerSituation?.situation?._id === situationId && marksArr.push(marksArr.marks) })
      // eslint-disable-next-line array-callback-return
      ;
    return marksArr;
  };


  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllMark());
  }, [dispatch]);



  ///list Situation user do
  const userSituation = [
    ...new Map(listMark.map((item) => [item["situation"]?._id, item])).values()
  ];
  console.log("1", userSituation)


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
                <td>{mark.situation?.name}
                </td>
                <td>
                  <table>
                    <tbody>
                      <tr>
                        <th>Lần làm</th>
                        <th>Điểm</th>
                      </tr>
                      {getMarkPerSituation(mark.situation?._id)?.map((mark, index) => (
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
