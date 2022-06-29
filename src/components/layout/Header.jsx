import { Link } from "react-router-dom";
import { logOut } from "../../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleLogout = () => {
    if (userInfo.token) {
      const { token, _id: id } = userInfo;
      dispatch(logOut({ token, id }));
    }
  };
  console.log(userInfo)
  return (
    <div className="header" id="visible">
      <div className="info">
        <h5>
          <b>HỆ THỐNG HỖ TRỢ CHẨN ĐOÁN Y KHOA</b>
        </h5>
        {userInfo ? (
          <div className="d-flex hi">
            <p className="header-user">
              <b>
                Chào ngươi dùng, <span>{userInfo.email}</span>
              </b>
            </p>
            <Link className="logout-btn" to="/#" onClick={handleLogout}>
              <li className="fa fa-sign-out"></li>
            </Link>
          </div>
        ) : (
          ""
        )}
      </div>

      {/* <div className="input-group">
          <input type="text" className="form-control" placeholder="Tìm kiếm" />
          <button type="button" className="btn btn-primary">
            <i className="fa fa-search"> </i>
          </button>
        
        </div> */}
    </div>
  );
};

export default Header;
