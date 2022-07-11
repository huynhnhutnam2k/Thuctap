import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "./url"
const url = `${URL}/diagnose`
export const getAllDiagnose = createAsyncThunk("diagnose/fetchAll", async () => {
  try {
    const res = await axios.get(`${url}`, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "origin, x-requested-with, content-type",
        "Access-Control-Allow-Methods": "PUT, GET, POST, DELETE, OPTIONS",
      }
    });
    return res?.data;
  } catch (error) {
    console.log(error.response.data);
  }
});
export const getADiagnose = createAsyncThunk("diagnose/fetchOne", async (id) => {
  try {
    const res = await axios.get(`${url}/${id}`, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "origin, x-requested-with, content-type",
        "Access-Control-Allow-Methods": "PUT, GET, POST, DELETE, OPTIONS",
      }
    });
    return res?.data;
  } catch (error) {
    console.log(error.response.data);
  }
});
export const diagnoseSlice = createSlice({
  name: "diagnose",
  initialState: {
    listDiagnose: [],
    diagnose: {},
    error: false,
    pending: false,
    msg: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllDiagnose.pending, (state) => {
        state.pending = true;
      })
      .addCase(getAllDiagnose.fulfilled, (state, action) => {
        state.listDiagnose = action.payload;
        state.pending = false;
      })
      .addCase(getAllDiagnose.rejected, (state) => {
        state.pending = false;
        state.error = true;
      })
      .addCase(getADiagnose.pending, (state) => {
        state.pending = true;
      })
      .addCase(getADiagnose.fulfilled, (state, action) => {
        state.diagnose = action.payload;
        state.pending = false;
      })
      .addCase(getADiagnose.rejected, (state) => {
        state.pending = false;
        state.error = true;
      });
  },
});

export default diagnoseSlice.reducer;
