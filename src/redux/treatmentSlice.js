import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "https://sv-dhyd.herokuapp.com/api/treatment";
export const getAllTreatment = createAsyncThunk(
  "treatment/fetchAll",
  async () => {
    try {
      const res = await axios.get(`${url}`);
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
      const res = await axios.get(`${url}/${id}`);
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
