import axios from "./api";

const SellerServices = {
    async getSellers(){
        const {data} = await axios.get('/sellers')
        return data
    },
    async postSellers(){
        const {data} = await axios.get('/sellers/create')
        return data
    },
    async deleteSellers(id){
        const {data} = await axios.delete(`/seller/delete/${id}`)
        return data
    }
}
export default SellerServices