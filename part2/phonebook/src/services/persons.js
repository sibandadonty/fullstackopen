import axios from "axios";

const baseUrl = "/api/persons";

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

const deletePerson = (id) => {
    const response = axios.delete(`${baseUrl}/${id}`);
    return response.then(res => res.data);
}

const updatePersonNumber = (id, data) => {
    const response = axios.patch(`${baseUrl}/${id}`, data);
    return response.then(res => res);
}

export default {
    getPersons, addPerson, deletePerson, updatePersonNumber
}