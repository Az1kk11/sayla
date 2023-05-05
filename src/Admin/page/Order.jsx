import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import '../css/orders.css'
import { useNavigate } from 'react-router-dom'
import Helmet from '../../Components/Helmet/Helmet'
import { useDispatch, useSelector } from 'react-redux'
import { getOrdersFailure, getOrdersStart, getOrdersSuccess } from '../../redux/slice/ordersSlice'
import OrederServices from '../../redux/services/orderServices'
import { useEffect } from 'react'
const Order = () => {
  const { orders, isLoading } = useSelector(state => state.order) 
  console.log(orders);

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const getOrders = async () => {
    dispatch(getOrdersStart())
    try {
      const response = await OrederServices.getOrders()
      console.log(response);
      dispatch(getOrdersSuccess(response))
    } catch (error) {
      console.log(error);
      dispatch(getOrdersFailure(error))
    }
  }

  useEffect(()=>{
    getOrders()
  },[])
  
  return (
    <Helmet title='Orders'>
      <section className='orders'>
        <Container>
          <Row className='search-box p-4'>
            <Col lg='6'>
              <h3>All Orders</h3>
            </Col>
            <Col lg='6'>
              <div className="input-group">
                <input type="text"
                  placeholder='Search order'
                />
                <i className="ri-search-line"></i>
              </div>
            </Col>
          </Row>
          <Row className='table-box mt-3 p-3'>
            <Col lg='12'>
              <table className="table">
                <thead>
                  <th>ID</th>
                  <th>Date</th>
                  <th>Full Name</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Action</th>
                </thead>
                <tbody>
                  <tr>
                    <td>OR-3233212</td>
                    <td>28 Jan 2023</td>
                    <td>Josh Lucos</td>
                    <td>$1212</td>
                    <td className='completed'>
                      Jetkezip berildi
                    </td>
                    <td onClick={() => navigate('/orders/order-details')} className='td-hover'>
                      <i className="ri-eye-line"></i>
                    </td>
                  </tr>
                </tbody>
              </table>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  )
}

export default Order

