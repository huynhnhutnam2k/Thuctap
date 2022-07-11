import { createSlice } from "@reduxjs/toolkit";
import { URL } from "./url"
const URL_API = `${URL}/`

const userSlice = createSlice({
    name: "user",
    initialState: {
        users: {
            allUser: null,
            isPending: false,
            isError: false
        },
        deleteUser: {
            isError: false,
            isPending: false
        },
        updateUser: {
            pending: false,
            error: null
        },
        oneUser: {
            pending: false,
            error: null
        },
        msg: ""
    },
    reducers: {
        getUsersStart: (state) => {
            state.users.isPending = true
        },
        getUsersAccess: (state, action) => {
            state.users.allUser = action.payload
            state.users.isError = false
            state.users.isPending = false
        },
        getUsersFail: (state, action) => {
            state.msg = action.payload
            state.users.isError = true
        },
        deleteUserStart: (state) => {
            state.deleteUser.isPending = true
        },
        deleteUserSuccess: (state, action) => {
            state.deleteUser.isPending = false
            state.deleteUser.isError = false
            state.msg = action.payload
        },
        deleteUserFail: (state, action) => {
            state.deleteUser.isError = true
            state.msg = action.payload
        },
        updateUserStart: (state) => {
            state.updateUser.pending = true
        },
        updateUserAccess: (state) => {
            state.updateUser.pending = false
            state.updateUser.error = false
        },
        updateUserFail: (state) => {
            state.updateUser.error = true
        }
    }
})

export const {
    getUsersAccess,
    getUsersFail,
    getUsersStart,
    deleteUserFail,
    deleteUserStart,
    deleteUserSuccess,
    updateUserAccess,
    updateUserFail,
    updateUserStart
} = userSlice.actions
export default userSlice.reducer