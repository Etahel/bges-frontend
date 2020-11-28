import qs from 'querystring';
import {accessTokenUrl} from '../../axios/axiosRoutes'
import jwt_decode from "jwt-decode";
const authModule = {
    state: {
        user: '',
        accessToken: '',
        refreshToken: ''
    },
    mutations: {
        CLEAR_AUTH_DATA(state) {
            state.accessToken = '';
            state.refreshToken = '';
            state.user = '';
        },
        SET_AUTH(state,{accessToken,refreshToken}) {
            state.accessToken = accessToken;
            state.refreshToken = refreshToken;
        },
        SET_USER(state, user){
            state.user = user;
        }
    },
    actions: {
        login({commit}, {username, password}) {
            const requestBody = {
                'grant_type': 'password',
                'client_id': 'frontend-auth',
                'scope': 'roles',
                'username': username,
                'password': password
            };

            return this.$api.post(accessTokenUrl, qs.stringify(requestBody), {
             headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
         }).then((response) => {
             commit('SET_AUTH',{
                 accessToken : response.data.access_token,
                 refreshToken : response.data.refresh_token
             })
                commit('SET_USER', jwt_decode(response.data.access_token) )
            })
        },
        logout({commit}) {
            commit("CLEAR_AUTH_DATA");
        }
    },
    getters: {
        accessToken: state => state.accessToken
    }
}

export default authModule;
