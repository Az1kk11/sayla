import axios from "./api";

const AuthServices = {
    async adminLogin(user) {
        const { data } = await axios.post('/login', user)
        return data
    }
}
export default AuthServices