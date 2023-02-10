import axios from 'axios';

const api = axios.create({
    baseURL : process.env.REACT_APP_PERSON_API,
    headers: {"Access-Control-Allow-Origin": "*"}

});

export default api;