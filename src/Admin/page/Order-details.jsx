import React from 'react'
import { NavLink } from 'react-router-dom'
import { Container } from 'reactstrap'
import '../css/orderDetails.css'
import imgaProduct from '../img/mebel.jpg'
import Helmet from '../../Components/Helmet/Helmet'

function OrderDetails() {
  return (
    <Helmet>
      <section className='orders-details'>
        <Container>
          <div className="table-order">

            <ol class="breadcrumb p-0 mb-0">
              <li class="breadcrumb-item">
                <NavLink to={'/orders'}>Orders</NavLink>
              </li>
              <li class="breadcrumb-item active" aria-current="page">Order Details</li>
            </ol>

            <h3 className='mt-3 text-light'>Order Details</h3>

            <div className="orders-box">

              <ul>
                <li>
                  <h4>Order info</h4>
                  <table>
                    <tbody>
                      <tr>
                        <td>ID</td>
                        <td className='text-light'>OR-325548</td>
                      </tr>
                      <tr>
                        <td>Date</td>
                        <td className='text-light'>01 Jan 2021 06:32</td>
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
                        <td className='comp-text text-light'>Completed</td>
                      </tr>
                    </tbody>
                  </table>
                </li>
                <li>
                  <h4>Customer Details</h4>
                  <table>
                    <tbody>
                      <tr>
                        <td>Name</td>
                        <td className='text-light'>John Lynn</td>
                      </tr>
                      <tr>
                        <td>Email</td>
                        <td className='text-light'>lynnj34@blueberry.com</td>
                      </tr>
                      <tr>
                        <td>Phone</td>
                        <td className='text-light'>+21 11445-2213</td>
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
                    <TrItems />
                    <TrItems />
                    <TrItems />
                    <TrItems />
                    <TrItems />
                    <TrItems />
                    <TrItems />
                    <TrItems />
                    <TrItems />
                    <TrItems />
                    <TrItems />
                    <TrItems />
                  </tbody>
                </table>
              </div>

            </div>
          </div>
        </Container>
      </section>
    </Helmet>
  )
}

export default OrderDetails


const TrItems = () => {
  return (
    <tr>
      <td className='d-flex align-items-center'>
        <div className="img-box">
          <img src={imgaProduct} alt="" />
        </div>
        <div className="d-flex flex-column">
          <span>Lorem, ipsum dolor.</span>
          <span>Lorem ipsum dolor sit amet.</span>
        </div>
      </td>
      <td className='text-center p-4'>2</td>
      <td>1,232$</td>
    </tr>
  )
}
