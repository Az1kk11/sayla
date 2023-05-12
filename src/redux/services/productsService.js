import axios from "./api";

const ProductService = {
    async getProducts() {
        const {data} = await axios.get('/products')
        return data
    },
    async deleteProduct(id) {
        const {data} = await axios.delete(`/product/delete/${id}`)
        return data
    },
    async postProduct(product) {
        const {data} = await axios.post ('/product/create', { product })
        return data
    }
}

export default ProductService