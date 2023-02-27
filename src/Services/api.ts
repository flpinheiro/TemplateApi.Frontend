import axios from 'axios';

export const controller = new AbortController();

const api = axios.create({
    baseURL: process.env.REACT_APP_PERSON_API,
    headers: { "Access-Control-Allow-Origin": "*" },
    signal:controller.signal,

});

export default api;
