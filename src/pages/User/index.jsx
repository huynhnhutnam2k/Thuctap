import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Auth from "../../pages/Login/Login";
import { useEffect } from "react";
import { getAllMark } from "../../redux/markSlice";
import Popup from "../../components/situation/Popup";
function User() {
  const { listMark } = useSelector((state) => state.mark);
  const { userInfo } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const [situationId, setSituationId] = useState("");

  const getMarkPerSituation = (situationId) => {
    const marksArr = [];
    listMark
      .filter((listMarks) => listMarks.userId === userInfo?._id)
      .map((marksPerSituation) => {
        marksPerSituation?.situation?._id === situationId &&
          marksArr.push(marksPerSituation.marks);
      });
    // eslint-disable-next-line array-callback-return
    return marksArr;
  };
  const PopupOnUser = (id) => {
    setIsOpen(true);
    setSituationId(id);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllMark());
  }, [dispatch]);

  ///list Situation user do
  const userSituation = [
    ...new Map(listMark.map((item) => [item["situation"]?._id, item])).values(),
  ];

  return (
    <>
      <Auth />
      <div className="scoreuser">
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
                <td>
                  <div onClick={() => PopupOnUser(mark.situation._id)}>
                    {mark.situation?.name}
                  </div>
                  {isOpen && <Popup open={isOpen} id={situationId}></Popup>}
                </td>
                <td className="tablemarks">
                  <table>
                    <tbody>
                      <tr>
                        <td>Lần làm</td>
                        {getMarkPerSituation(mark.situation?._id)?.map(
                          (mark, index) => (
                            <td>{index + 1}</td>
                          )
                        )}
                      </tr>
                      <tr>
                        <td>Điểm</td>
                        {getMarkPerSituation(mark.situation?._id)?.map(
                          (mark, index) => (
                            <td>{mark}</td>
                          )
                        )}
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="scoreuser2">
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
                <td>
                  <div onClick={() => PopupOnUser(mark.situation._id)}>
                    {mark.situation?.name}
                  </div>
                  <Popup open={isOpen} id={situationId}></Popup>
                </td>
                <td className="tablemarks">
                  <table>
                    <tbody>
                      <tr>
                        <td>Lần làm</td>
                        <td>Điểm</td>
                      </tr>
                      {getMarkPerSituation(mark.situation?._id)?.map(
                        (mark, index) => (
                          <tr>
                            <td>{index + 1}</td>
                            <td>{mark}</td>
                          </tr>
                        )
                      )}
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
