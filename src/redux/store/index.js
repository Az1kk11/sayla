import { configureStore } from "@reduxjs/toolkit";
import AuthReduser from '../slice/auth'
import ProductsReduser from '../slice/productsSlice'
import OrdersReduser from '../slice/ordersSlice'

export default configureStore({
    reducer:{
        auth: AuthReduser,
        product: ProductsReduser,
        order: OrdersReduser,
    },
    devTools: process.env.NODE_ENV !== 'production',
})