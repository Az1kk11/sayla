import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getOrdersStart, getOrdersSuccess } from '../../redux/slice/ordersSlice'
import OrederServices from '../../redux/services/orderServices'

import Table from '../ux/table'
import Helmet from '../../Components/Helmet/Helmet'
import { Col, Container, Row } from 'reactstrap'

import '../css/orders.css'
import { toast } from 'react-toastify'

const Order = () => {
  const { orders, isLoading } = useSelector(state => state.order)
  const [searchOrders, setSearchOrders] = useState(orders)
  const dispatch = useDispatch()

  const getOrders = async () => {
    dispatch(getOrdersStart())
    try {
      const response = await OrederServices.getOrders()
      dispatch(getOrdersSuccess(response.orders))
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    getOrders()
  }, [])

  const handlerSearch = e => {
    const searchTerm = e.target.value;
    const searchOrdersFilter = orders.filter(
      item => item.user_name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setSearchOrders(searchOrdersFilter)
  }

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
                  onChange={handlerSearch}
                />
                <i className="ri-search-line"></i>
              </div>
            </Col>
          </Row>
          <Row className='table-box mt-3 p-3'>
            {isLoading ? (
              <h3 className='text-light'>Loading...</h3>
            ) : (
              <Col lg='12'>
                <table className="table">
                  <thead>
                    <th>ID</th>
                    <th>Date</th>
                    <th>User Name</th>
                    <th>Product name</th>
                    <th>Status</th>
                    <th>Action</th>
                  </thead>
                  {searchOrders.length === 0 ? (
                    <Table data={orders} />
                  ) : (
                    <Table data={searchOrders} />
                  )}
                </table>
              </Col>
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  )
}

export default Order

