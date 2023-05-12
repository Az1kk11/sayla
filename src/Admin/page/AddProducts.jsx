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

  const [inputValue, setInputValue] = useState({
    name: '',
    title_img: '',
    first_price: '',
    discount: '',
    seller_id: '',
    description: ''
  })

  const [ category_id, setCategory_id ] = useState([])
  const [ images, setImages ] = useState([])

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

  const handleChange = e => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  }

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
    setInputValue({ ...inputValue, category_id, images })
  };


  const handleSubmit = async e => {
    e.preventDefault()
    dispatch(postProductStart())
    try {
      await ProductService.postProduct(inputValue)
      dispatch(postProductSuccess())
    } catch (error) {
      dispatch(postProductFailure())
    }
  }
  console.log(inputValue);

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
                    value={inputValue.name}
                    onChange={handleChange}
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
                    value={inputValue.first_price}
                    onChange={handleChange}
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
                    value={inputValue.description}
                    onChange={handleChange}
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
                    value={inputValue.seller_id}
                    onChange={handleChange}
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
                    value={inputValue.title_img}
                    onChange={handleChange}
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
                    name='images'
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