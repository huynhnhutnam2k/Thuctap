import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "https://sv-dhyd.herokuapp.com/api/department";
export const getAllDepartment = createAsyncThunk(
  "department/fetchAll",
  async () => {
    try {
      const res = await axios.get(`${url}`,{
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "origin, x-requested-with, content-type",
          "Access-Control-Allow-Methods": "PUT, GET, POST, DELETE, OPTIONS",
        }});
      return res?.data;
    } catch (error) {
      console.log(error.response.data);
    }
  }
);
export const getADepartment = createAsyncThunk(
  "department/fetchOne",
  async (id) => {
    try {
      const res = await axios.get(`${url}/${id}`,{
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "origin, x-requested-with, content-type",
          "Access-Control-Allow-Methods": "PUT, GET, POST, DELETE, OPTIONS",
        }});
      return res?.data;
    } catch (error) {
      console.log(error.response.data);
    }
  }
);
export const departmentSlice = createSlice({
  name: "department",
  initialState: {
    listDepartment: [],
    department: {},
    error: false,
    pending: false,
    msg: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllDepartment.pending, (state) => {
        state.pending = true;
      })
      .addCase(getAllDepartment.fulfilled, (state, action) => {
        state.listDepartment = action.payload;
        state.pending = false;
      })
      .addCase(getAllDepartment.rejected, (state) => {
        state.pending = false;
        state.error = true;
      })
      .addCase(getADepartment.pending, (state) => {
        state.pending = true;
      })
      .addCase(getADepartment.fulfilled, (state, action) => {
        state.department = action.payload;
        state.pending = false;
      })
      .addCase(getADepartment.rejected, (state) => {
        state.pending = false;
        state.error = true;
      });
  },
});

export default departmentSlice.reducer;
