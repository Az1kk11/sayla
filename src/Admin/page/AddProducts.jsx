import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getCategorieFailure, getCategorieStart, getCategorieSuccess } from '../../redux/slice/categorieSlice'
import { getSellerFailure, getSellerStart, getSellerSuccess } from '../../redux/slice/sellerSlice'
import { postProductFailure, postProductStart, postProductSuccess } from '../../redux/slice/productsSlice'

import CategoryServices from '../../redux/services/categorieServices'
import SellerServices from '../../redux/services/sellerServices'
import ProductService from '../../redux/services/productsService'

import Helmet from '../../Components/Helmet/Helmet'
import { Button, ButtonGroup, Col, Container, Form, FormGroup, Input, Row } from 'reactstrap'

import '../css/addProducts.css'

function AddProducts() {
  const [category_id, setCategory_id] = useState([])
  const [values, setValues] = useState({
    name: '',
    first_price: '',
    seller_id: '',
    description: '',
    title_img: null,
    images: []
  })

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
    const products = new FormData()
    products.set('name', values.name)
    products.set('title_img', values.title_img)
    products.set('first_price', values.first_price)
    products.set('seller_id', values.seller_id)
    products.set('description', values.description)
    for (let i = 0; i < values.images.length; i++) {
      products.append(`images[${i}]`, values.images[0])
    }
    for (let k = 0; k < category_id.length; k++) {
      products.append(`category_id[${k}]`, category_id[0])
    }
    dispatch(postProductStart())
    try {
      await ProductService.postProduct(products)
      dispatch(postProductSuccess())
    } catch (error) {
      dispatch(postProductFailure())
    }
  }

  const onChangeName = e => {
    setValues({ ...values, name: e.currentTarget.value })
  }
  const onChangeFirst_price = e => {
    setValues({ ...values, first_price: e.currentTarget.value })
  }
  const onChangeDescription = e => {
    setValues({ ...values, description: e.currentTarget.value })
  }
  const onChangeSeller_id = e => {
    setValues({ ...values, seller_id: e.currentTarget.value })
  }
  const onChangeImages = e => {
    setValues({ ...values, images: e.currentTarget.files })
  }
  const onChangeTitleImg = e => {
    setValues({ ...values, title_img: e.target.files[0] })
  }

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
                    onChange={onChangeName}
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
                    onChange={onChangeFirst_price}
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
                    onChange={onChangeDescription}
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
                    onChange={onChangeSeller_id}
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
                        name='category_id'
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
                    onChange={onChangeTitleImg}
                  />
                </FormGroup>
              </Col>
              <Col lg='6'>
                <FormGroup className="form__group">
                  <span>Product Image</span>
                  <Input
                    multiple
                    className='p-2'
                    type='file'
                    onChange={onChangeImages}
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