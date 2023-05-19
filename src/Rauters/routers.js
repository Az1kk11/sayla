import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AddProducts, AdminLogin, Info, OrderDetails, Products, Users, Order, AddSellers } from '../Admin/page/index'
import Protected from './protected'
import Home from '../page/home'

function Routers() {

  return (
    <Routes>
      <Route path='/' element={<Navigate to={'home'}/>} />
      <Route path='/home' element={<Home/>}/>
      <Route path='/admin' element={<AdminLogin />} />
      <Route element={<Protected />}>
          <Route element={<Info />} path='/admin/info' exact />
          <Route element={<Products />} path='/admin/products' exact />
          <Route element={<AddProducts />} path='/admin/add-products' exact />
          <Route element={<Users />} path='/admin/users' exact />
          <Route element={<Order />} path='/admin/orders' exact />
          <Route element={<AddSellers />} path='/admin/add-seller' exact />
          <Route element={<OrderDetails />} path='/admin/orders/order-details' exact />
        </Route>
    </Routes>
  )
}

export default Routers