import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    isLoading: false,
    sellers : [],
    error: null
}

export const SellerSlice = createSlice({
    name : 'seller',
    initialState,
    reducers: {
        getSellerStart: state => {
            state.isLoading = true
        },
        getSellerSuccess: (state, action) => {
            state.isLoading = false
            state.sellers = action.payload
        },
        getSellerFailure: (state, action) => {
            state.error = action.payload
        },
    }
})

export const {
    getSellerStart,
    getSellerSuccess,
    getSellerFailure
} = SellerSlice.actions

export default SellerSlice.reducer