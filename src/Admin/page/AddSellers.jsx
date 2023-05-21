import React, { useState } from 'react'
import { Button, Col, Container, Form, FormGroup, Input, Label, Row, Table } from 'reactstrap'
import '../css/add-categories.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getSellerFailure, getSellerStart, getSellerSuccess, postSellerFailure, postSellerStart, postSellerSuccess } from '../../redux/slice/sellerSlice'
import SellerServices from '../../redux/services/sellerServices'
import { toast } from 'react-toastify'

function AddSellers() {
    const { sellers, isLoading } = useSelector(state => state.seller)
    const [value, setValues] = useState({ title: '' })
    const dispatch = useDispatch()

    const getSellers = async () => {
        dispatch(getSellerStart())
        try {
            const response = await SellerServices.getSellers()
            dispatch(getSellerSuccess(response.sellers))
        } catch (error) {
            dispatch(getSellerFailure(error))
            toast.error(error.message)
        }
    }

    useEffect(() => {
        getSellers()
    }, [])


    const handleSubmit = async e => {
        e.preventDefault()
        getSellers()
        const seller = new FormData()
        seller.set('title', value.title)
        dispatch(postSellerStart())
        try {
            await SellerServices.postSellers(seller)
            dispatch(postSellerSuccess())
            toast.success('Categorie succesfuly created')
        } catch (error) {
            dispatch(postSellerFailure())
            toast.error(error.message)
        }
    }

    const deleteProduct = async id => {
        try {
            await SellerServices.deleteSellers(id)
            getSellers()
            toast.success('Seller succesfuly deleted')
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
                        <h3 className='text-light'>Seller Create</h3>
                        <Col lg={12}>
                            <Form onSubmit={handleSubmit}>
                                <FormGroup className='mt-4'>
                                    <Label htmlFor='seller-name' className='text-light'>Categories name</Label>
                                    <Input
                                        placeholder='Seller name'
                                        name='sellerName'
                                        onChange={onChangeName}
                                    />
                                    <Button className='mt-3' type='submit'>
                                        Create
                                    </Button>
                                </FormGroup>
                            </Form>
                        </Col>
                        <h3 className='text-light mt-3 mb-3'>All Seller</h3>
                        <Col lg={12} className='table-seller'>
                            <Table
                                size="sm"
                                striped
                            >
                                <thead className='text-light'>
                                    <tr>
                                        <th>ID</th>
                                        <th>Seller name</th>
                                        <th>Products</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sellers.map(item => (
                                        <tr>
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
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </div>
            </Container>
        </section>
    )
}

export default AddSellers