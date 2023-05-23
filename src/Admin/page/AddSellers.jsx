import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import SellerServices from '../../redux/services/sellerServices'
import {
    getSellerFailure,
    getSellerStart,
    getSellerSuccess,
    postSellerFailure,
    postSellerStart,
    postSellerSuccess
} from '../../redux/slice/sellerSlice'
import Helmet from '../../Components/Helmet/Helmet'

import { Button, Col, Container, Form, FormGroup, Input, Label, Row, Table } from 'reactstrap'

import { toast } from 'react-toastify'
import '../css/add-sellers.css'

function AddSellers() {
    const { sellers, isLoading } = useSelector(state => state.seller)
    const [value, setValues] = useState({
        title: '',
        logo_img: null,
        adress: '',
        adress_qr: '',
        adress_ru: '',
        description: '',
        description_qr: '',
        description_ru: '',
        name: '',
        phone: '',
        password: '',
    })
    const dispatch = useDispatch()

    const getSellers = async () => {
        dispatch(getSellerStart())
        try {
            const response = await SellerServices.getSellers()
            dispatch(getSellerSuccess(response.sellers))
        } catch (error) {
            dispatch(getSellerFailure(error))
            toast.error(error.response.data.message)
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
        seller.set('logo_img', value.logo_img)
        seller.set('adress', value.adress)
        seller.set('adress_qr', value.adress_qr)
        seller.set('adress_ru', value.adress_ru)
        seller.set('description', value.description)
        seller.set('description_qr', value.description_qr)
        seller.set('description_ru', value.description_ru)
        seller.set('name', value.name)
        seller.set('phone', value.phone)
        seller.set('password', value.password)
        dispatch(postSellerStart())
        try {
            await SellerServices.postSellers(seller)
            dispatch(postSellerSuccess())
            toast.success('Categorie succesfuly created')
        } catch (error) {
            dispatch(postSellerFailure())
            toast.error(error.response.data.message)
        }
    }

    const deleteProduct = async id => {
        try {
            await SellerServices.deleteSellers(id)
            getSellers()
            toast.success('Seller succesfuly deleted')
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    const onChangeValue = e => {
        setValues({ ...value, [e.target.name]: e.target.value })
    }
    const onChangeImg = e => {
        setValues({ ...value, logo_img: e.target.files[0] })
    }

    return (
        <Helmet title={'Add Seller'}>
            <section className='seller'>
                <Container>
                    <div className="add-selers">
                        <Row>
                            <h3 className='text-light'>Seller Create</h3>
                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <Col lg={6}>
                                        <FormGroup>
                                            <Label htmlFor='Title' className='text-light'>Title</Label>
                                            <Input
                                                placeholder='Title'
                                                name='title'
                                                onChange={onChangeValue}
                                                required
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col lg={6}>
                                        <FormGroup>
                                            <Label htmlFor='adress' className='text-light'>Adress</Label>
                                            <Input
                                                placeholder='Adress'
                                                name='adress'
                                                onChange={onChangeValue}
                                                required
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col lg={6}>
                                        <FormGroup>
                                            <Label htmlFor='adress-qr' className='text-light'>Adress Qr</Label>
                                            <Input
                                                placeholder='Adress Qr'
                                                name='adress_qr'
                                                onChange={onChangeValue}
                                                required
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col lg={6}>
                                        <FormGroup>
                                            <Label htmlFor='adress-ru' className='text-light'>Adress Ru</Label>
                                            <Input
                                                placeholder='Adress Ru'
                                                name='adress_ru'
                                                onChange={onChangeValue}
                                                required
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col lg={6}>
                                        <FormGroup>
                                            <Label htmlFor='description' className='text-light'>Description</Label>
                                            <Input
                                                placeholder='Description'
                                                name='description'
                                                onChange={onChangeValue}
                                                required
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col lg={6}>
                                        <FormGroup>
                                            <Label htmlFor='description' className='text-light'>Description Qr</Label>
                                            <Input
                                                placeholder='Description Qr'
                                                name='description_qr'
                                                onChange={onChangeValue}
                                                required
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col lg={6}>
                                        <FormGroup>
                                            <Label htmlFor='description-ru' className='text-light'>Description Ru</Label>
                                            <Input
                                                placeholder='Description Ru'
                                                name='description_ru'
                                                onChange={onChangeValue}
                                                required
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col lg={6}>
                                        <FormGroup>
                                            <Label htmlFor='name' className='text-light'>Name</Label>
                                            <Input
                                                placeholder='Name'
                                                name='name'
                                                onChange={onChangeValue}
                                                required
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col lg={6}>
                                        <FormGroup>
                                            <Label htmlFor='phone' className='text-light'>Phone</Label>
                                            <Input
                                                type='number'
                                                placeholder='Phone'
                                                name='phone'
                                                onChange={onChangeValue}
                                                required
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col lg={6}>
                                        <FormGroup>
                                            <Label htmlFor='password' className='text-light'>Password</Label>
                                            <Input
                                                type='password'
                                                placeholder='Password'
                                                name='password'
                                                onChange={onChangeValue}
                                                required
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col lg={6}>
                                        <FormGroup>
                                            <Label htmlFor='image' className='text-light'>Image</Label>
                                            <Input
                                                type='file'
                                                placeholder='Image'
                                                name='title_img'
                                                onChange={onChangeImg}
                                                required
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col lg={6}>
                                        <Button
                                            type='submit'
                                            className='btn-submit'
                                            color='success'
                                            disabled={isLoading}
                                        >
                                            {isLoading ? (
                                                'Loading...'
                                            ) : (
                                                'Create'
                                            )}
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
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
        </Helmet>
    )
}

export default AddSellers