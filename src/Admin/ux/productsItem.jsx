import React from 'react'
import ProductService from '../../redux/services/productsService'
import '../css/products.css'

function ProductsItem({ item, getProducts }) {

    const deleteProduct = async id => {
        try {
            await ProductService.deleteProduct(id)
            getProducts()
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <tr>
            <td>{item?.id}</td>
            <td>
                <img src={item?.title_img} alt="as" />
            </td>
            <td>{item?.name}</td>
            <td>${item?.first_price}</td>
            <td>{item?.seller}</td>
            <td>
                <button className="btn btn-danger"
                    onClick={() => deleteProduct(item.id)}
                >
                    Delete
                </button>
            </td>
        </tr>
    )
}

export default ProductsItem