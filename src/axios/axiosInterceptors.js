import store from "../store/store";
import axiosErrorMapper from "./axiosErrorMapper";

export function requestInterceptor (axiosInstance) {
    axiosInstance.interceptors.request.use(function (request) {
        const token = store.getters.accessToken;
        if (token) {
            request.headers.Authorization = `Bearer ${token}`;
        }
        return request;
    }, function (err) {
        return Promise.reject(err);
    });
}

export function responseInterceptor (axiosInstance) {
   axiosInstance.interceptors.response.use(function (response) {
       if(!response.data.access_token) {
           store.commit('SET_AUTH_RETRY', false);
       }
        return response;
    }, async function (error) {
       const originalRequest = error.config;
       if (error.response && error.response.status === 401 && !store.getters.authRetry && store.getters.refreshToken) {
           try {
               store.commit('SET_AUTH_RETRY', true);
               console.log('Refreshing token...');
               await store.dispatch('refresh')
               return axiosInstance(originalRequest);
           } catch (anotherError) {
               const mappedError = axiosErrorMapper(error);
               console.log('Unable to refresh token');
               store.dispatch('logout').then(() => store.commit('SET_ERROR', new Error('error.authorization.logged_out')));
               return Promise.reject(mappedError)
           }
       } else if (error.response && error.response.status === 401 && store.getters.authRetry) {
           store.commit('SET_AUTH_RETRY', false);
           console.log('Unaouthorized access');
           store.dispatch('logout').then(() => store.commit('SET_ERROR', new Error('error.authorization.logged_out')));
       } else {
           if (store.getters.authRetry) {
               store.commit('SET_AUTH_RETRY', false);
           }
           const mappedError = axiosErrorMapper(error);
           store.commit('SET_ERROR', mappedError);
           return Promise.reject(mappedError)
       }
       return Promise.reject()
    })}