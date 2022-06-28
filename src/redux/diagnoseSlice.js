import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "https://sv-dhyd.herokuapp.com/api/diagnose";
export const getAllDiag = createAsyncThunk("diagnose/fetchAll", async () => {
  try {
    const res = await axios.get(`${url}`);
    return res?.data;
  } catch (error) {
    console.log(error.response.data);
  }
});
export const getADiag = createAsyncThunk("diagnose/fetchOne", async (id) => {
  try {
    const res = await axios.get(`${url}/${id}`);
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
      .addCase(getAllDiag.pending, (state) => {
        state.pending = true;
      })
      .addCase(getAllDiag.fulfilled, (state, action) => {
        state.listDiagnose = action.payload;
        state.pending = false;
      })
      .addCase(getAllDiag.rejected, (state) => {
        state.pending = false;
        state.error = true;
      })
      .addCase(getADiag.pending, (state) => {
        state.pending = true;
      })
      .addCase(getADiag.fulfilled, (state, action) => {
        state.diagnose = action.payload;
        state.pending = false;
      })
      .addCase(getADiag.rejected, (state) => {
        state.pending = false;
        state.error = true;
      });
  },
});

export default diagnoseSlice.reducer;
