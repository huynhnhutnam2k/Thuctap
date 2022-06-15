import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
const url = `https://serverdhyd.herokuapp.com/api/v1`
export const getAllDiag = createAsyncThunk(
    "diagnose/getAll",
    async() => {
        try {
            const res = await axios.get(`${url}/diagnose`)
            return res.data
        } catch (error) {
            console.log(error.response.data)
        }
    }
)

export const getADiag = createAsyncThunk(
    "diagnose/getOne",
    async({id}) => {
        try {
            const res = await axios.get(`${url}/diagnose/${id}`)
            return res.data
        } catch (error) {
            console.log(error.response.data)
        }
    }
)
export const getDiagByQuestion = createAsyncThunk(
    "diagnose/getByQuestion", 
    async(query) => {
        try {
            const {data} = await axios.get(`${url}/diagnose/question/${query}`)
            return data
        } catch (error) {
            console.log(error.response.data)
        }
    }
)
export const getDiagnoseByQuery = createAsyncThunk(
    "diagnose/getByQuery",
    async(query) => {
        try{
            const res = await axios.get(`${url}/diagnose/search?${query}`)
            return res.data
        }catch(error){
            console.log(error.response.data)
        }
    }
)
export const addDiagnose = createAsyncThunk(
    "diagnose/add",
    async({body, token}) => {
        try {
            const res = await axios.post(`${url}/diagnose/add`, body, {
                headers: {
                    token: `Bearer ${token}`
                }
            })
            return res.data
        } catch (error) {
            console.log(error.response.data)
        }
    }
)

export const upDiagnose = createAsyncThunk(
    "diagnose/update", 
    async({id, body, token}) => {
        try {
            const { data } = await axios.put(`${url}/diagnose/update/${id}`, body, {
                headers: {
                    token: `Bearer ${token}`
                }
            })
            return data
        } catch (error) {
            console.log(error.response.data)
        }
    }
)

export const delDiagnose = createAsyncThunk(
    "diagnose/del",
    async({id, token}) => {
        try {
            const res = await axios.delete(`${url}/diagnose/delete/${id}`, {
                headers: {
                    token: `Bearer ${token}`
                }
            })
            return res.data
        } catch (error) {
            console.log(error.response.data)
        }
    }
)
export const diagnoseSlice = createSlice({
    name: "diagnose",
    initialState: {
        allDiagnose: [],
        listDiagnose: [],
        diagnose:{},
        pending: false,
        success: false,
        error: false,
        addSuccess: false,
        updateSuccess: false,
        deleteSuccess: false
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getAllDiag.pending, state => {
                state.pending = true
            })
            .addCase(getAllDiag.fulfilled, (state, action) => {
                state.listDiagnose = action.payload
                state.pending = false
            })
            .addCase(getAllDiag.rejected, state => {
                state.error = true
                state.pending = false
            })
            .addCase(getADiag.pending, state => {
                state.pending = true
            })
            .addCase(getADiag.fulfilled, (state, action) => {
                state.diagnose = action.payload
                state.pending = false
            })
            .addCase(getADiag.rejected, state => {
                state.error = true
                state.pending = false
            })
            .addCase(getDiagByQuestion.pending, state => {
                state.pending = true
            })
            .addCase(getDiagByQuestion.fulfilled, (state, action) => {
                state.listDiagnose= action.payload
                state.pending = false
            })
            .addCase(getDiagByQuestion.rejected, state => {
                state.error = true
                state.pending = false
            })
            .addCase(addDiagnose.pending, state => {
                state.pending = true
            })
            .addCase(addDiagnose.fulfilled, (state, action) => {
                state.diagnose = action.payload
                state.addSuccess = true
                state.pending = false
            })
            .addCase(addDiagnose.rejected, state => {
                state.error = true
                state.pending = false
            })
            .addCase(upDiagnose.pending, state => {
                state.pending = true
            })
            .addCase(upDiagnose.fulfilled, (state, action) => {
                state.updateSuccess = true
                state.pending = false
            })
            .addCase(upDiagnose.rejected, state => {
                state.error = true
                state.pending = false
            })
            .addCase(delDiagnose.pending, state => {
                state.pending = true
            })
            .addCase(delDiagnose.fulfilled, (state, action) => {
                state.deleteSuccess = true
                state.pending = false
            })
            .addCase(delDiagnose.rejected, state => {
                state.error = true
                state.pending = false
            })
            .addCase(getDiagnoseByQuery.pending , state => {
                state.pending = true
            })
            .addCase(getDiagnoseByQuery.fulfilled, (state , action) => {
                state.listDiagnose = action.payload
                state.pending = false
            })
            .addCase(getDiagnoseByQuery.rejected, state => {
                state.pending = false
                state.error = true
            })
    }
})

export default diagnoseSlice.reducer