import React from 'react'
import { Button, Col, Container, Form, FormGroup, Input, Row } from 'reactstrap'
import '../css/addProducts.css'
import Helmet from '../../Components/Helmet/Helmet'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postProductStart, postProductSuccess } from '../../redux/slice/productsSlice'
import ProductService from '../../redux/services/productsService'

function AddProducts() {
  const [name, setName] = useState('')
  const [title_img, setTitle_img] = useState('')
  const [first_price, setFirst_price] = useState('')
  const [description, setDescription] = useState('')
  const [seller_id, setSeller_id] = useState([2,3])
  const [images_url, setImages_url] = useState('sadasdsd')
  const [category_id, setCategory_id] = useState()
  const dispatch = useDispatch()
  const { isLoading} = useSelector(state => state.product)

  const formSubmit = async e => {
    e.preventDefault()
    const product = {name, description, seller_id, first_price, category_id, title_img, images_url }
    dispatch(postProductStart())
    try {
      await ProductService.postProduct(product)
      dispatch(postProductSuccess())
    } catch (error) {
      console.log(error);
    }
  }

  

  return (
    <Helmet title='Add-Products'>
      <section className='add-product'>
        <Container>
          <h4 className="mb-3">Add products</h4>
          <Form onSubmit={formSubmit} >
            <FormGroup className="form__group">
              <span>Product title</span>
              <Input
                type="text"
                placeholder="Double sofa"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormGroup>
            <Row>
              <Col lg='6'>
                <FormGroup className="form__group">
                  <span>Description</span>
                  <Input
                    type="text"
                    placeholder="Description"
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col lg='6'>
              <FormGroup className="form__group">
                  <span>Category</span>
                  <Input type='select'
                    className="w-100 p-2"
                    required
                    value={seller_id}
                    onChange={(e) => setSeller_id(e.target.value)}
                  >
                    <option>Select category</option>
                    <option value="2">Kardar</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col lg='6'>
                <FormGroup className="form__group">
                  <span>Price</span>
                  <Input
                    type="number"
                    placeholder="$120"
                    required
                    value={first_price}
                    onChange={(e) => setFirst_price(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col lg='6'>
                <FormGroup className="form__group">
                  <span>Category</span>
                  <Input type='select'
                    className="w-100 p-2"
                    required
                    value={category_id}
                    onChange={(e) => setCategory_id(e.target.value)}
                  >
                    <option>Select category</option>
                    <option value={2} >Chair</option>
                    <option value="sofa">Sofa</option>
                    <option value="mobile">Mobile</option>
                    <option value="watch">Watch</option>
                    <option value="wireless">Wireless</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col lg='6'>
                <FormGroup className="form__group">
                  <span>Product Image</span>
                  <Input
                    type="text"
                    className='p-2'
                    required
                    value={title_img}
                    onChange={(e) => setTitle_img(e.target.value)}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Button
              color="primary"
              type='submit'
            >
              {isLoading ? 'Loading...' : 'Add'}
            </Button>
          </Form>
        </Container>
      </section>
    </Helmet>
  )
}

export default AddProducts