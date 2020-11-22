import axios from 'axios';
import {requestInterceptor,responseInterceptor} from './axiosInterceptors'

const axiosInstance = axios.create({
    baseURL: process.env.VUE_APP_BACKEND_HOST,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
})

requestInterceptor(axiosInstance);
responseInterceptor(axiosInstance);

export default axiosInstance;
