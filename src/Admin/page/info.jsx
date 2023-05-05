import { Container } from 'reactstrap'
import '../css/info.css'
import Helmet from '../../Components/Helmet/Helmet'
import { useSelector } from 'react-redux'

function Info() {
  const {products} = useSelector(state => state.product)
  
  return (
    <Helmet title='Info'>
      <section className='info' >
        <Container>
          <h3>Info</h3>
          <div className="cards">
            <div className="card">
              <h4>Total Shop</h4>
              <span>2232</span>
            </div>
            <div className="card">
              <h4>Total Products</h4>
              <span>{products.length}</span>
            </div>
            <div className="card">
              <h4>Total Users</h4>
              <span>1223</span>
            </div>
            <div className="card">
              <h4>Total Orders</h4>
              <span>1223</span>
            </div>
          </div>
        </Container>
      </section>
    </Helmet>
  )
}

export default Info
