import axios from "./api";

const CategoryServices = {
    async getCategorys(){
        const {data} = await axios.get('/categories')
        return data
    }
}
export default CategoryServices