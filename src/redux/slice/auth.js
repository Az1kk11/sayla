import { createSlice } from "@reduxjs/toolkit"
import { setItem } from "../helpers/persistance-storage"


const initialState = {
    isLoading: false,
    logedIn: false,
    error: null,
    user: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        siginAdminStart: state => {
            state.isLoading = true
        },
        siginAdminSuccess: (state, action) => {
            state.logedIn = true
            state.isLoading = false
            state.user = action.payload
            setItem('token', action.payload.token)
        },
        signAdminFailure: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        },
        logoutAdmin: state => {
            state.user = null
            state.logedIn = false
        }
    }
})

export const {
    siginAdminStart,
    siginAdminSuccess,
    signAdminFailure,
    logoutAdmin
} = authSlice.actions

export default authSlice.reducer