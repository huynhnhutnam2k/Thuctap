import axios from "axios";
import apiConfig from "../api/apiConfig";
import queryString from 'query-string';
import { useState } from 'react';
import Pagination from '../../src/components/pagination';


import { 
//   getAllUserAccess, 
//   getAllUserFail, 
//   getAllUserStart, 
//   loginFail, 
//   loginStart, 
//   loginSuccess, 
//   logoutAccess, 
//   logoutFail, 
//   logoutStart, 
  // registerAccess, 
  // registerFail, 
  // registerStart 
} from "./authSlice"

// import {
//   deleteUserFail,
//   deleteUserStart,
//   deleteUserSuccess,
//   getUsersAccess,
//   getUsersFail,
//   getUsersStart,
//   updateUserAccess,
//   updateUserFail,
//   updateUserStart,
// } from "./userSlice";

import {
  getAllCateAccess,
  getAllCateFail,
  getAllCateStart,
  getAnCateAccess,
  getAnCateFail,
  getAnCateStart,
} from "./cateSlice";

import {
  getAllQuestionAccess,
  getAllQuestionFail,
  getAllQuestionStart,
  getAQuestionAccess,
  getAQuestionFail,
  getAQuestionStart,
} from "./questionSlice";

// export const loginUser = async (user, dispatch, navigate) => {
//   dispatch(loginStart());
//   try {
//     const res = await axios.post(`${apiConfig.baseUrl}/auth/login`, user);
//     dispatch(loginSuccess(res.data));
//     localStorage.setItem("userInfo",JSON.stringify(res.data))
//     navigate("/");
//   } catch (error) {
//     dispatch(loginFail(error.response.data));
//   }
// };

// export const registerRequest = async(dispatch, token, user) => {
//   dispatch(registerStart())
//   try {
//       await axios.post(`${apiConfig.baseUrl}/auth/register`, user , {
//           headers: {
//               token: `Bearer ${token}`
//           }
//       })
//       dispatch(registerAccess())
//   } catch (error) {
//       dispatch(registerFail(error.response.data))
//   }
// }

// export const logoutRequest = async(dispatch, token, userId, navigate) => {
//   dispatch(logoutStart())
//   try {
//       await axios.post(`${apiConfig.baseUrl}/auth/logout`, userId, {
//           headers: {
//               token: `Bearer ${token}`
//           }
//       })
//       dispatch(logoutAccess())
//       localStorage.removeItem("userInfo")
//       navigate("/login")
//   } catch (error) {
//       dispatch(logoutFail())
//   }
// }

// export const getUser = async(dispatch, token) => {
//   dispatch(getUsersStart())
//   try {
//       const res = await axios.get(`${apiConfig.baseUrl}/auth` , {
//           headers: {
//               token: `Bearer ${token}`
//           }
//       })
//       dispatch(getUsersAccess(res.data))
//   } catch (error) {
//       dispatch(getUsersFail())
//   }
// }

// export const getAllUser = async(dispatch, token) => {
//   dispatch(getAllUserStart())
//   try {
//       const res = await axios.get(`${apiConfig.baseUrl}/auth` , {
//           headers: {
//               token: `Bearer ${token}`
//           }
//       })
//       dispatch(getAllUserAccess(res.data))
//   } catch (error) {
//       dispatch(getAllUserFail())
//   }
// }


// export const deleteUser = async (accessToken, dispatch, id) => {
//   dispatch(deleteUserStart());
//   try {
//     const res = await axios.delete(`${apiConfig.baseUrl}/auth/delete/${id}`, {
//       headers: {
//         token: `Bearer ${accessToken}`,
//       },
//     });
//     dispatch(deleteUserSuccess(res.data));
//   } catch (error) {
//     dispatch(deleteUserFail(error.response.data));
//   }
// };

// export const updateUser = async (accessToken, dispatch, id, user) => {
//   dispatch(updateUserStart());
//   try {
//     const res = await axios.put(
//       `${apiConfig.baseUrl}/auth/update/${id}`,
//       user,
//       {
//         headers: {
//           token: `Bearer ${accessToken}`,
//         },
//       }
//     );
//     dispatch(updateUserAccess());
//   } catch (error) {
//     dispatch(updateUserFail());
//   }
// };

export const getAllCate = async (dispatch) => {
  dispatch(getAllCateStart());
  try {
    const res = await axios.get(`${apiConfig.baseUrl}/categories/`);
    dispatch(getAllCateAccess(res.data));
  } catch (error) {
    dispatch(getAllCateFail(error.response.data));
  }
};
export const getAnCate = async (dispatch, id) => {
  dispatch(getAnCateStart());
  try {
    const res = await axios.get(`${apiConfig.baseUrl}/categories/${id}`);
    dispatch(getAnCateAccess(res.data));
  } catch (error) {
    dispatch(getAnCateFail());
  }
};



export const getAllQuestion = async (dispatch) => {

  // const [filters, setFilters] = useState({
  //   _limit: 10,
  //   _page: 1,
  // });

  // const [pagination, setPagination] = useState({
  //   _page: 1,
  //   _limit: 1,
  //   _totalRows: 1,
  // });

  dispatch(getAllQuestionStart());
  
  try {
    // const paramsString  = queryString.stringify(filters);
    const res = await axios.get(`${apiConfig.baseUrl}/question/`);
    dispatch(getAllQuestionAccess(res.data));
  } catch (error) {
    dispatch(getAllQuestionFail(error.response.data));
  }
};

export const getAQuestion = async (dispatch, id) => {
  dispatch(getAQuestionStart());
  try {
    const res = await axios.get(`${apiConfig.baseUrl}/question/${id}`);
    dispatch(getAQuestionAccess(res.data));
  } catch (error) {
    dispatch(getAQuestionFail());
  }
};
