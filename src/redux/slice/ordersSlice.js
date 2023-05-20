import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    isLoading: false,
    orders: [],
    orderDetail: [],
    error: null,
}

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        getOrdersStart: state => {
            state.isLoading = true
        },
        getOrdersSuccess: (state, action) => {
            state.isLoading = false
            state.orders = action.payload
        },
        getOrdersFailure: (state, action) => {
            state.error = action.payload
        },

        getOrderDetailStart: state => {
            state.isLoading = true
        },
        getOrderDetailSuccess: (state, action) => {
            state.isLoading = false
            state.orderDetail = action.payload
        },
        getOrderDetailFailure: (state, action) => {
            state.isLoading = false
        },

    }
})

export const {
    getOrdersStart,
    getOrdersSuccess,
    getOrdersFailure,

    getOrderDetailStart,
    getOrderDetailSuccess,
    getOrderDetailFailure,
} = orderSlice.actions

export default orderSlice.reducer