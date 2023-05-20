import axios from "./api";

const OrederServices = {
    async getOrders (orders) {
        const {data} = await axios.get('/orders?status=new')
        return data
    },
    async getOrderDetail (id) {
        const {data} = await axios.get(`order/${id}`)
        return data
    }
}
export default OrederServices