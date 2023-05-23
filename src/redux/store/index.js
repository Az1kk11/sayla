import { configureStore } from "@reduxjs/toolkit";

import AuthReduser from '../slice/auth'
import ProductsReduser from '../slice/productsSlice'
import OrdersReduser from '../slice/ordersSlice'
import UsersReduser from '../slice/usersSlice'
import CategoriesReduser from '../slice/categorieSlice'
import SellersReduser from '../slice/sellerSlice'

export default configureStore({
    reducer: {
        auth: AuthReduser,
        product: ProductsReduser,
        order: OrdersReduser,
        user: UsersReduser,
        categorie: CategoriesReduser,
        seller: SellersReduser
    },
    devTools: process.env.NODE_ENV !== 'production',
})