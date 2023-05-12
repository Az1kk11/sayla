import axios from "./api";

const SellerServices = {
    async getSellers(){
        const {data} = await axios.get('/sellers')
        return data
    }
}
export default SellerServices