import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "./url"
const url = `${URL}/treatment`
export const getAllTreatment = createAsyncThunk(
  "treatment/fetchAll",
  async () => {
    try {
      const res = await axios.get(`${url}`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers":
            "origin, x-requested-with, content-type",
          "Access-Control-Allow-Methods": "PUT, GET, POST, DELETE, OPTIONS",
        },
      });
      return res?.data;
    } catch (error) {
      console.log(error.response.data);
    }
  }
);
export const getATreatment = createAsyncThunk(
  "treatment/fetchOne",
  async (id) => {
    try {
      const res = await axios.get(`${url}/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers":
              "origin, x-requested-with, content-type",
            "Access-Control-Allow-Methods": "PUT, GET, POST, DELETE, OPTIONS",
          },
        });
      return res?.data;
    } catch (error) {
      console.log(error.response.data);
    }
  }
);
export const treatmentSlice = createSlice({
  name: "treatment",
  initialState: {
    listTreatment: [],
    treatment: {},
    error: false,
    pending: false,
    msg: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllTreatment.pending, (state) => {
        state.pending = true;
      })
      .addCase(getAllTreatment.fulfilled, (state, action) => {
        state.listTreatment = action.payload;
        state.pending = false;
      })
      .addCase(getAllTreatment.rejected, (state) => {
        state.pending = false;
        state.error = true;
      })
      .addCase(getATreatment.pending, (state) => {
        state.pending = true;
      })
      .addCase(getATreatment.fulfilled, (state, action) => {
        state.treatment = action.payload;
        state.pending = false;
      })
      .addCase(getATreatment.rejected, (state) => {
        state.pending = false;
        state.error = true;
      });
  },
});

export default treatmentSlice.reducer;
