import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isLoading: false,
    products: [],
    error: null,
}

export const productSlice = createSlice({
    name:'product',
    initialState,
    reducers:{
        getProductsStart: state => {
            state.isLoading = true
        },
        getProductsSuccess: (state, action)=>{
            state.isLoading = false
            state.products = action.payload
        },
        getProductsFailure : (state, action) => {
            state.error = action.payload
        },

        postProductStart: state => {
            state.isLoading = true
        },
        postProductSuccess: state => {
            state.isLoading = false
        },
        postProductFailure: state => {
            state.isLoading = false
            state.error = 'Error'
        }
    }
})

export const {
    getProductsStart,
    getProductsSuccess,
    getProductsFailure,

    postProductStart,
    postProductSuccess,
    postProductFailure,
    
} = productSlice.actions

export default productSlice.reducer