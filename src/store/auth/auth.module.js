import qs from 'querystring';
import {accessTokenUrl} from '../../axios/axiosRoutes'
import jwt_decode from "jwt-decode";
import router from '../../router/index'
const authModule = {
    state: {
        user: '',
        accessToken: '',
        refreshToken: '',
        authRetry: ''
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
        },
        SET_AUTH_RETRY(state, retry){
            state.authRetry = retry;
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
        refresh({commit}) {
            const requestBody = {
                'grant_type': 'refresh_token',
                'client_id': 'frontend-auth',
                'scope': 'roles',
                'refresh_token': this.getters.refreshToken
            };

            return this.$api.post(accessTokenUrl, qs.stringify(requestBody), {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).then((response) => {
                commit('SET_AUTH',{
                    accessToken : response.data.access_token,
                    refreshToken : response.data.refresh_token
                });
                commit('SET_USER', jwt_decode(response.data.access_token) )
            })
        },
        logout({commit}) {
            commit("CLEAR_AUTH_DATA")
            return router.push({
                name:'Login'
            });
        }
    },
    getters: {
        accessToken: state => state.accessToken,
        refreshToken: state => state.refreshToken,
        user: state => state.user,
        authRetry: state => state.authRetry,
        roles: state => {
            if(state.user.realm_access && state.user.realm_access.roles) {
                return state.user.realm_access.roles
            } else {
                return ''
            }
        }
    }
}

export default authModule;
