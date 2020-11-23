import store from "../store/store";
import axiosErrorMapper from "./axiosErrorMapper";

export function requestInterceptor (axiosInstance) {
    axiosInstance.interceptors.request.use(function (config) {
        const token = store.getters.token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }, function (err) {
        return Promise.reject(err);
    });
}

export function responseInterceptor (axiosInstance) {
    axiosInstance.interceptors.response.use(function (response) {
        return response;
    }, function (error) {
        const mappedError  = axiosErrorMapper(error)
        store.commit('SET_ERRORS', [mappedError])
        return Promise.reject()
    })
}