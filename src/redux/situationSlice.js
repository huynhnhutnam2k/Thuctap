import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "https://sv-dhyd.herokuapp.com/api/situation";
export const getAllSituation = createAsyncThunk(
  "situation/fetchAll",
  async () => {
    try {
      const res = await axios.get(`${url}`);
      return res?.data;
    } catch (error) {
      console.log(error.response.data);
    }
  }
);
export const getASituation = createAsyncThunk(
  "situation/fetchOne",
  async (id) => {
    try {
      const res = await axios.get(`${url}/${id}`);
      return res?.data;
    } catch (error) {
      console.log(error.response.data);
    }
  }
);
export const situationSlice = createSlice({
  name: "situation",
  initialState: {
    listSituation: [],
    situation: {},
    error: false,
    pending: false,
    msg: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllSituation.pending, (state) => {
        state.pending = true;
      })
      .addCase(getAllSituation.fulfilled, (state, action) => {
        state.listSituation = action.payload;
        state.pending = false;
      })
      .addCase(getAllSituation.rejected, (state) => {
        state.pending = false;
        state.error = true;
      })
      .addCase(getASituation.pending, (state) => {
        state.pending = true;
      })
      .addCase(getASituation.fulfilled, (state, action) => {
        state.situation = action.payload;
        state.pending = false;
      })
      .addCase(getASituation.rejected, (state) => {
        state.pending = false;
        state.error = true;
      });
  },
});

export default situationSlice.reducer;
