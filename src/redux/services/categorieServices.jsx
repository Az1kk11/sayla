import axios from "./api";

const CategoryServices = {
    async getCategorys(){
        const {data} = await axios.get('/categories')
        return data
    },
    async postCategory(categories){
        const {data} = await axios.post('/category/create', categories)
        return data
    },
    async deleteCategory(id){
        const {data} = await axios.delete(`/category/delete/${id}`)
        return data
    },
    async getOneCategory(id){
        const {data} = await axios.get(`/category/${id}`)
        return data
    }
}
export default CategoryServices