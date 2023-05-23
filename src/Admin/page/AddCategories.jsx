import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import CategoryServices from '../../redux/services/categorieServices'

import { Button, Col, Container, Form, FormGroup, Input, Label, Row, Table } from 'reactstrap'
import { getCategorieFailure, getCategorieStart, getCategorieSuccess, postCategorieStart, postCategorieSuccess } from '../../redux/slice/categorieSlice'
import Helmet from '../../Components/Helmet/Helmet'

import { toast } from 'react-toastify'

import '../css/add-categories.css'

function AddCategories() {
  const { categories, isLoading } = useSelector(state => state.categorie)
  const [value, setValues] = useState({ title: '' })
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const getCategories = async () => {
    dispatch(getCategorieStart())
    try {
      const response = await CategoryServices.getCategorys()
      dispatch(getCategorieSuccess(response.categories))
    } catch (error) {
      dispatch(getCategorieFailure(error))
      toast.error(error.response.data.message)
    }
  }

  useEffect(() => {
    getCategories()
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()
    getCategories()
    const categories = new FormData()
    categories.set('title', value.title)
    dispatch(postCategorieStart())
    try {
      await CategoryServices.postCategory(categories)
      dispatch(postCategorieSuccess())
      toast.success('Categorie succesfuly created')
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  const deleteProduct = async id => {
    try {
      await CategoryServices.deleteCategory(id)
      getCategories()
      toast.success('Categorie succesfuly deleted')
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  const onChangeName = e => {
    setValues({ ...value, title: e.currentTarget.value })
  }

  return (
    <Helmet title={'Add - Product'}>
      <section className='categorie'>
        <Container>
          <div className="add-categorie">
            <Row>
              <h3 className='text-light'>Categorie Create</h3>
              <Col lg={12}>
                <Form onSubmit={handleSubmit}>
                  <FormGroup className='mt-4'>
                    <Label htmlFor='categorie-name' className='text-light'>Categories name</Label>
                    <Input
                      placeholder='Categories name'
                      name='categoryName'
                      onChange={onChangeName}
                    />
                    <Button className='mt-3' type='submit' disabled={isLoading}>
                      {isLoading ? 'Loading...' : 'Create'}
                    </Button>
                  </FormGroup>
                </Form>
              </Col>
              <h3 className='text-light mt-3 mb-3'>All Categories</h3>
              <Col lg={12} className='table-categorie'>
                <Table
                  size="sm"
                  striped
                >
                  <thead className='text-light'>
                    <tr>
                      <th>ID</th>
                      <th>Category name</th>
                      <th>Products</th>
                      <th>Action</th>
                      <th>View</th>
                    </tr>
                  </thead>
                  {isLoading ? (
                    <h3 className='text-light text-center mt-2'>Loading...</h3>
                  ) : (
                    <tbody>
                      {categories.map(item => (
                        <tr key={item.id}>
                          <th scope="row">{item.id}</th>
                          <td className='text-capitalize'>{item.title}</td>
                          <td>{item.products}</td>
                          <td>
                            <Button
                              color='danger'
                              onClick={() => deleteProduct(item.id)}
                            >
                              Delete
                            </Button>
                          </td>
                          <td
                            className='category-item'
                            onClick={() => navigate(`/admin/categories/item/${item.id}`)}
                          >
                            <i className="ri-eye-fill"></i>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  )}
                </Table>
              </Col>
            </Row>
          </div>
        </Container>
      </section>
    </Helmet>
  )
}

export default AddCategories