import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import CategoryServices from '../../redux/services/categorieServices'
import { getCategorieDetailFailure, getCategorieDetailStart, getCategorieDetailSuccess } from '../../redux/slice/categorieSlice'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { Container, Table } from 'reactstrap'
import '../css/categoryItem.css'

function CategoryItems() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const { categorieDetail, isLoading } = useSelector(state => state.categorie)
    console.log(categorieDetail);

    const getOneCategorie = async () => {
        dispatch(getCategorieDetailStart())
        try {
            const response = await CategoryServices.getOneCategory(id)
            dispatch(getCategorieDetailSuccess(response.data))
        } catch (error) {
            dispatch(getCategorieDetailFailure(error))
            toast.error(error.message)
        }
    }

    useEffect(() => {
        getOneCategorie()
    }, [])

    return (
        <section className='cat-items'>
            <Container>
                <h3 className='text-light mt-3'>Categorie</h3>
                <h4 className='text-light text-capitalize mt-3'>{categorieDetail.name}</h4>
                <div className="table-box">
                    {categorieDetail.products.length === 0 ? (
                        <h3 className='text-light mt-5 ml-5'>No products were found</h3>
                    ) : (
                        <Table striped>
                            <thead>
                                <tr>
                                    <th>
                                        ID
                                    </th>
                                    <th>
                                        Image
                                    </th>
                                    <th>
                                        Product Name
                                    </th>
                                    <th>
                                        Price
                                    </th>
                                    <th>
                                        Seller
                                    </th>
                                </tr>
                            </thead>
                            {isLoading ? (
                                <h3 className='text-light text-center mt-5 ml-5'>Loading...</h3>
                            ) : (
                                <tbody>
                                    {categorieDetail?.products?.map(item => (
                                        <tr>
                                            <th scope="row">{item.id}</th>
                                            <td>
                                                <img src={item.title_img} alt="" />
                                            </td>
                                            <td>{item.name}</td>
                                            <td>{item.first_price}</td>
                                            <td>{item.seller}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            )}
                        </Table>
                    )}
                </div>
            </Container>
        </section>
    )
}

export default CategoryItems