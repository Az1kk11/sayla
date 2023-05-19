import axios from "./api";

const OrederServices = {
    async getOrders (orders) {
        const {data} = await axios.get('/orders?status=new')
        return data
    }
}
export default OrederServices