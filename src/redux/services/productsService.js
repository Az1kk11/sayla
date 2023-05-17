import axios from "./api";

const ProductService = {
    async getProducts(item) {
        const { data } = await axios.get(`/products?page=${item}`)
        return data
    },
    async deleteProduct(id) {
        const { data } = await axios.delete(`/product/delete/${id}`)
        return data
    },
    async postProduct(products) {
        const { data } = await axios.post('/product/create', products)
        return data
    }
}

export default ProductService