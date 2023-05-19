import axios from "./api";

const UserAuthServices = {
    async getUsers(){
        const {data} = await axios.get('/users')
        return data
    }
}
export default UserAuthServices