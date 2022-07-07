import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useParams } from "react-router-dom";

const url = "https://sv-dhyd.herokuapp.com/api/situation";
export const situationSlice = createSlice({
  name: "situation",
  initialState: {
    listSituation: [],
    situation: {},
    error: false,
    pending: false,
    msg: "",
    page: 1,
    maxPage: 1,
  },
  reducers: {
    increment: (state) => {
      state.page += 1;
    },
    decrement: (state) => {
      state.page -= 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllSituation.pending, (state) => {
        state.pending = true;
      })
      .addCase(getAllSituation.fulfilled, (state, action) => {
        state.listSituation = action.payload.situation;
        state.maxPage = action.payload.maxPage;
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

export const getAllSituation = createAsyncThunk(
  "situation/fetchAll",
  async (page = 1, { getState }) => {
    try {
      const {
        situation: { page },
      } = getState();
      const res = await axios.get(`${url}/page/${page}`);
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

export const { increment, decrement } = situationSlice.actions;
export default situationSlice.reducer;
