import axios from "./api";

const UserAuthServices = {
    async getUsers(){
        const {data} = await axios.get('/users')
        console.log(data);
    }
}
export default UserAuthServices