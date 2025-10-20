import axios from "axios";  

let token = null;
const baseUrl = "/api/login";

const setToken = newToken => {
    token = `Bearer ${newToken}`
}

const loginUser = async credentials => {
    const config = {
        headers: {
            "Authorization": token
        }
    }
    const results = await axios.post(baseUrl, credentials, config)
    return results.data
}

export default { 
    setToken, loginUser
}