import React from 'react';
import Input from '../../components/input';
import {useFormik} from 'formik';
import * as Yup from 'yup';
// import './login.scss';
import { logIn } from '../../redux/authSlice';
import Message from "../../components/LoadingError/Error";
import Loading from "../../components/LoadingError/Loading";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    // window.scrollTo(0, 300);
    const pending = useSelector(state => state.auth.login?.pending)
    const error = useSelector(state => state.auth.login?.error)
    const msg = useSelector(state => state.auth.login?.msg)
    const dispatch = useDispatch()
    const navigate = useNavigate()
   
    const formik = useFormik({
      initialValues:{
          email:"",
          password: ""
      },
      validationSchema: Yup.object({
          email: Yup.string().email().required(""),
          password: Yup.string().min(8, "").required("")
      }),

      onSubmit: (values) => {
          const user = {
              email: values.email,
              password: values.password
          }
          dispatch(logIn({user, navigate}))
      }
  })
 
  return (
    <>
    <div className="account-page">
        <div className="row">
          <div className="form-container col-sm-5">
            <div className="title-log"><h5>Đăng nhập tài khoản</h5></div>
            {pending ? <Loading /> : error && <Message variant="alert-danger">{msg}</Message>}
            <form action="#" method="post" className="login" onSubmit={formik.handleSubmit}>
              <Input
                className="log"
                name="email"
                id=""
                type="text"
                placeHolder="Email"
                value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                  {formik.errors.email  ? <p >{formik.errors.email}</p> : ""}
              <Input
                className="log"
                name="password"
                id=""
                type="password"
                placeHolder="Mật khẩu"
                value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                {formik.errors.password ? <p >{formik.errors.password}</p> : ""}
              <button name="dangnhap" type="submit" className="btn1 login-submit">
                Đăng nhập
              </button>
              <div>
                <a href="/#">Quên mật khẩu?</a>
              </div>
            </form>
          </div>
          <div className="mid col-sm-1">
            <br></br>
          </div>
          <div className="bannerlog col-sm-5">
            <img
              src="https://cdn.glitch.global/7b4743d8-a7e2-4d18-a87b-a1248d42b7cc/logo.png?v=1653215058970" alt=""
            />
          </div>
        </div>
      </div>
      </>
  )
}

export default Login