import React, { useState } from "react";
import axios from "axios";
const Url = "https://sv-dhyd.herokuapp.com/api";
const MyContext = React.createContext();

const getQuestion = async (id) => {
  try {
    const { data: res } = await axios.get(`${Url}/situation/${id}`); //use data destructuring to get data from the promise object
    return res;
  } catch (error) {
    console.log(error);
  }
};

const getDiagnose = async (id) => {
  try {
    const { data: res } = await axios.get(`${Url}/diagnose/${id}`); //use data destructuring to get data from the promise object
    return res;
  } catch (error) {
    console.log(error);
  }
};

const getTreatment = async (id) => {
  try {
    const { data: res } = await axios.get(`${Url}/treatment/${id}`); //use data destructuring to get data from the promise object
    return res;
  } catch (error) {
    console.log(error);
  }
};

export { getTreatment, getDiagnose, getQuestion };