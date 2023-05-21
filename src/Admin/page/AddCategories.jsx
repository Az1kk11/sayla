import React, { useEffect } from 'react'
import { Button, Col, Container, Form, FormGroup, Input, Label, Row, Table } from 'reactstrap'
import '../css/add-categories.css'
import { useDispatch, useSelector } from 'react-redux'
import { getCategorieFailure, getCategorieStart, getCategorieSuccess, postCategorieStart, postCategorieSuccess } from '../../redux/slice/categorieSlice'
import CategoryServices from '../../redux/services/categorieServices'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function AddCategories() {
  const { categories, isLoading } = useSelector(state => state.categorie)
  const dispatch = useDispatch()
  const [value, setValues] = useState({ title: '' })
  const navigate = useNavigate()

  const getCategories = async () => {
    dispatch(getCategorieStart())
    try {
      const response = await CategoryServices.getCategorys()
      dispatch(getCategorieSuccess(response.categories))
    } catch (error) {
      dispatch(getCategorieFailure(error))
      toast.error(error.message)
    }
  }
  
  useEffect(()=>{
    getCategories()
  },[])

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
      toast.error(error.message)
    }
  }

  const deleteProduct = async id => {
    try {
        await CategoryServices.deleteCategory(id)
        getCategories()
        toast.success('Categorie succesfuly deleted')
    } catch (error) {
        console.log(error);
    }
}

  const onChangeName = e => {
    setValues({ ...value, title: e.currentTarget.value })
  }

  return (
    <section className='seller'>
      <Container>
        <div className="add-selers">
          <Row>
            <h3 className='text-light'>Categorie Create</h3>
            <Col lg={12}>
              <Form onSubmit={handleSubmit}>
                <FormGroup className='mt-4'>
                  <Label htmlFor='seller-name' className='text-light'>Categories name</Label>
                  <Input
                    placeholder='Categories name'
                    name='categoryName'
                    onChange={onChangeName}
                  />
                  <Button className='mt-3' type='submit'>
                    {isLoading ? 'Loading...' : 'Create'}
                  </Button>
                </FormGroup>
              </Form>
            </Col>
            <h3 className='text-light mt-3 mb-3'>All Categories</h3>
            <Col lg={12} className='table-seller'>
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
                            onClick={()=>deleteProduct(item.id)}
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
  )
}

export default AddCategories