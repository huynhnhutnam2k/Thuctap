import { createSlice } from "@reduxjs/toolkit";

export const questionSlice = createSlice({
    name: "question",
    initialState:{
        questions: {
            allQuestion: [],
            pending: false,
            error: null
        },
        question: {
            question: null,
            pending: false,
            error: false
        },
        msg: ""
    },
    reducers:{
        getAllQuestionStart: (state) => {
            state.questions.pending = true
        },
        getAllQuestionAccess: (state, action) => {
            state.questions.allQuestion =  action.payload
            // [
            //     ...new Set([...state.questions.allQuestion, ...action.payload]),
            // ];
            state.questions.error = false
            state.questions.pending = false
        },
        getAllQuestionFail: (state, action) =>{
            state.questions.error = true
            state.msg = action.payload
        },
        
        getAQuestionStart: (state) => {
            state.question.pending = true
        },
        getAQuestionAccess: (state, action) => {
            state.question.question = action.payload
            state.question.pending = false
            state.question.error = false
        },
        getAQuestionFail: (state) => {
            state.question.error = true
        }

      
    }
})

export const {
    getAllQuestionAccess,
    getAllQuestionFail,
    getAllQuestionStart,

    getAQuestionAccess,
    getAQuestionFail,
    getAQuestionStart
} = questionSlice.actions

export default questionSlice.reducer