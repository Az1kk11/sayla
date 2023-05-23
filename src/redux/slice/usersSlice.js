import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isLoading: false,
    users: [],
    error: null,
}

export const usersSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getUsersStart: state => {
            state.isLoading = true
        },
        getUsersSuccess: (state, action) => {
            state.isLoading = false
            state.users = action.payload
        },
        getProductsFailure: (state, action) => {
            state.error = action.payload
        },
    }
})

export const {
    getUsersStart,
    getUsersSuccess,
    getUsersFailure,

} = usersSlice.actions

export default usersSlice.reducer