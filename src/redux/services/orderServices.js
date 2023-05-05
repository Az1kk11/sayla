import axios from "./api";

const OrederServices = {
    async getOrders () {
        const {data} = await axios.get('/orders')
        return data
    }
}
export default OrederServices