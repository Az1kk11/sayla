import React from 'react'
import { Button, ButtonGroup, Col, Container, Form, FormGroup, Input, Row } from 'reactstrap'
import '../css/addProducts.css'
import Helmet from '../../Components/Helmet/Helmet'
import { useDispatch, useSelector } from 'react-redux'
import { getCategorieFailure, getCategorieStart, getCategorieSuccess } from '../../redux/slice/categorieSlice'
import CategoryServices from '../../redux/services/categorieServices'
import { useEffect } from 'react'
import { getSellerFailure, getSellerStart, getSellerSuccess } from '../../redux/slice/sellerSlice'
import SellerServices from '../../redux/services/sellerServices'
import { useState } from 'react'
import { postProductFailure, postProductStart, postProductSuccess } from '../../redux/slice/productsSlice'
import ProductService from '../../redux/services/productsService'

function AddProducts() {
  const [name, setName] = useState('')
  const [first_price, setFirst_price] = useState('')
  const [seller_id, setSeller_id] = useState([])
  const [description, setDescription] = useState('')
  const [title_img, setTitle_img] = useState([])
  const [category_id, setCategory_id] = useState([])
  const [images, setImages] = useState([])

  const dispatch = useDispatch()
  const { isLoading } = useSelector(state => state.product)
  const { categories } = useSelector(state => state.categorie)
  const { sellers } = useSelector(state => state.seller)

  const getCategories = async () => {
    dispatch(getCategorieStart())
    try {
      const response = await CategoryServices.getCategorys()
      dispatch(getCategorieSuccess(response.categories))
    } catch (error) {
      dispatch(getCategorieFailure(error))
    }
  }
  const getSellers = async () => {
    dispatch(getSellerStart())
    try {
      const response = await SellerServices.getSellers()
      dispatch(getSellerSuccess(response.sellers))
    } catch (error) {
      dispatch(getSellerFailure(error))
    }
  }
  useEffect(() => {
    getCategories()
    getSellers()
  }, [])


  const handleImageChange = e => {
    const file = Array.from(e.target.files)
    setImages(file)
  }

  const onCheckboxBtnClick = (selected) => {
    const index = category_id.indexOf(selected);
    if (index < 0) {
      category_id.push(selected)
    } else {
      category_id.splice(index, 1)
    }
    setCategory_id([...category_id])
  };


  const handleSubmit = async e => {
    e.preventDefault()
    dispatch(postProductStart())
    const products = { name, seller_id, category_id, images, title_img, description, first_price }
    console.log(products);
    try {
      await ProductService.postProduct(products)
      dispatch(postProductSuccess())
    } catch (error) {
      dispatch(postProductFailure())
    }
  }
  URL.createObjectURL()
  return (
    <Helmet title='Add-Products'>
      <section className='add-product'>
        <Container>
          <h4 className="mb-3">Add products</h4>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col lg='6'>
                <FormGroup className="form__group">
                  <span>Product Name</span>
                  <Input
                    type="text"
                    placeholder="Double sofa"
                    required
                    name='name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col lg='6'>
                <FormGroup className="form__group">
                  <span>Price</span>
                  <Input
                    type="number"
                    placeholder="$120"
                    required
                    name='first_price'
                    value={first_price}
                    onChange={(e) => setFirst_price(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col lg='6'>
                <FormGroup className="form__group">
                  <span>Description</span>
                  <Input
                    type="text"
                    placeholder="Description"
                    required
                    name='description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col lg='6'>
                <FormGroup className="form__group">
                  <span>Campany</span>
                  <Input type='select'
                    className="w-100 p-2"
                    required
                    name='seller_id'
                    value={seller_id}
                    onChange={(e) => setSeller_id(e.target.value)}
                  >
                    <option>Select campany</option>
                    {sellers.map((item, index) => (
                      <option key={index} value={item.id}>{item.title}</option>
                    ))}
                  </Input>
                </FormGroup>
              </Col>
              <Col lg='6'>
                <h3 className='text-light fs-5 mb-2'>Category</h3>
                <ButtonGroup>
                  {
                    categories.map((item, index) => (
                      <Button
                        key={index}
                        color="primary"
                        outline
                        onClick={() => onCheckboxBtnClick(item.id)}
                        active={category_id.includes(item.id)}
                      >
                        {item.title}
                      </Button>
                    ))
                  }
                </ButtonGroup>
              </Col>
              <Col lg='6'>
                <FormGroup className="form__group">
                  <span>Title Image</span>
                  <Input
                    type="file"
                    className='p-2'
                    required
                    name='title_img'
                    onChange={(e) => setTitle_img(e.target.files[0])}
                  />
                </FormGroup>
              </Col>
              <Col lg='6'>
                <FormGroup className="form__group">
                  <span>Product Image</span>
                  <Input
                    className='p-2'
                    type="file"
                    multiple
                    onChange={handleImageChange}
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