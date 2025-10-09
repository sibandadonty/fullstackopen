import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const getPersons = () => {
    const response = axios.get(baseUrl);
    return response.then(res => {
        return res.data;
    })
}

const addPerson = (data) => {
    const response = axios.post(baseUrl, data)

    return response.then((response) => {
        const data = response.data;
        return data;
    });
}

export default {
    getPersons, addPerson
}