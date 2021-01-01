import store from "../store/store";
import axiosErrorMapper from "./axiosErrorMapper";

export function requestInterceptor (axiosInstance) {
    axiosInstance.interceptors.request.use(function (config) {
        const token = store.getters.accessToken;
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
        store.commit('SET_AUTH_RETRY', false)
        return response;
    }, async function (error) {
       const originalRequest = error.config;
       if (error.response && error.response.status === 401 && !store.getters.authRetry) {
           try {
               store.commit('SET_AUTH_RETRY', true)
               await store.dispatch('refresh')
               return axiosInstance(originalRequest);
           } catch (anotherError) {
               const mappedError = axiosErrorMapper(error)
               store.dispatch('logout').then(store.commit('SET_ERROR', mappedError))
           }
       } else if (!store.getters.authRetry) {
            const mappedError = axiosErrorMapper(error)
            store.commit('SET_ERROR', mappedError)
        } else if (store.getters.authRetry) {
           store.commit('SET_AUTH_RETRY', false)
       }
       return Promise.reject()
    })
}