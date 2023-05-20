import React, { useEffect } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { Container } from 'reactstrap'
import '../css/orderDetails.css'
import imgaProduct from '../img/mebel.jpg'
import Helmet from '../../Components/Helmet/Helmet'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderDetailStart, getOrderDetailSuccess } from '../../redux/slice/ordersSlice'
import OrederServices from '../../redux/services/orderServices'
import { toast } from 'react-toastify'
import moment from 'moment/moment'
import { TrItems } from '../ux'

function OrderDetails() {
  const { orderDetail, isLoading } = useSelector(state => state.order)
  const { id } = useParams()
  const dispatch = useDispatch()

  const getOrderDetail = async () => {
    dispatch(getOrderDetailStart())
    try {
      const response = await OrederServices.getOrderDetail(id)
      dispatch(getOrderDetailSuccess(response))
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    getOrderDetail()
  }, [id])

  console.log(orderDetail);

  return (
    <Helmet>
      <section className='orders-details'>
        <Container>
          <div className="table-order">

            <ol className="breadcrumb p-0 mb-0">
              <li className="breadcrumb-item">
                <NavLink to={'/admin/orders'}>Orders</NavLink>
              </li>
              <li className="breadcrumb-item active" aria-current="page">Order Details</li>
            </ol>

            <h3 className='mt-3 text-light'>Order Details</h3>

            <div className="orders-box">
              {isLoading ? (
                <h3 className='text-light text-center'>Loading...</h3>
              ) : (
                <>
                  <ul>
                    <li>
                      <h4>Order info</h4>
                      <table>
                        <tbody>
                          <tr>
                            <td>ID</td>
                            <td className='text-light'>{orderDetail.id}</td>
                          </tr>
                          <tr>
                            <td>Date</td>
                            <td className='text-light'>{moment(orderDetail.updated_at).format('DD MMM, YYYY. hh:mm')}</td>
                          </tr>
                          <tr>
                            <td>Paymet</td>
                            <td className='text-light'>Credit Card</td>
                          </tr>
                          <tr>
                            <td>Invoice</td>
                            <td className='text-light'>IN-302240</td>
                          </tr>
                          <tr>
                            <td>Status</td>
                            <td className='comp-text text-light text-capitalize'>{orderDetail.status}</td>
                          </tr>
                        </tbody>
                      </table>
                    </li>
                    <li>
                      <h4>Customer Details</h4>
                      <table>
                        <tbody>
                          <tr>
                            <td>UserName</td>
                            <td className='text-light'>{orderDetail.user_name}</td>
                          </tr>
                          <tr>
                            <td>Email</td>
                            <td className='text-light'>lynnj34@blueberry.com</td>
                          </tr>
                          <tr>
                            <td>Phone</td>
                            <td className='text-light'>{orderDetail.user_phone}</td>
                          </tr>
                          <tr>
                            <td>Country</td>
                            <td className='text-light'>USA</td>
                          </tr>
                          <tr>
                            <td>Region</td>
                            <td className='text-light'>Ohio</td>
                          </tr>
                          <tr>
                            <td>Address</td>
                            <td className='text-light'>	201, Baker Street</td>
                          </tr>
                        </tbody>
                      </table>
                    </li>
                  </ul>

                  <div className="order-items">
                    <h4 className='text-light'>Order Items</h4>
                    <table className='table'>
                      <thead>
                        <tr>
                          <th>Products</th>
                          <th>Quantity</th>
                          <th>Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        <TrItems data={orderDetail} />
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </div>
          </div>
        </Container>
      </section>
    </Helmet>
  )
}

export default OrderDetails