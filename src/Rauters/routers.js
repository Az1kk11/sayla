import Protected from './protected'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from '../page/home'
import {
  AddProducts,
  AdminLogin, 
  Info,
  OrderDetails,
  Products,
  Users,
  Order,
  AddCategories,
  AddSellers,
  CategoryItems
} from '../Admin/page/index'

function Routers() {
  return (
    <Routes>
      <Route path='/' element={<Navigate to={'home'} />} />
      <Route path='/home' element={<Home />} />
      <Route path='/admin' element={<AdminLogin />} />
      <Route element={<Protected />}>
        <Route element={<Info />} path='/admin/info' exact />
        <Route element={<Products />} path='/admin/products' exact />
        <Route element={<AddProducts />} path='/admin/add-products' exact />
        <Route element={<Users />} path='/admin/users' exact />
        <Route element={<Order />} path='/admin/orders' exact />
        <Route element={<AddCategories />} path='/admin/categories' exact />
        <Route element={<CategoryItems />} path='/admin/categories/item/:id' exact />
        <Route element={<AddSellers />} path='/admin/seller' exact />
        <Route element={<OrderDetails />} path='/admin/orders/order-details/:id' exact />
      </Route>
    </Routes>
  )
}

export default Routers