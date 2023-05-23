import axios from "./api";

const SellerServices = {
    async getSellers() {
        const { data } = await axios.get('/sellers')
        return data
    },
    async postSellers(seller) {
        const { data } = await axios.post('/seller/create', seller)
        return data
    },
    async deleteSellers(id) {
        const { data } = await axios.delete(`/seller/delete/${id}`)
        return data
    }
}
export default SellerServices