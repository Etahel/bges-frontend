import qs from 'querystring';
import {accessTokenUrl} from '../../axios/axiosRoutes'
const authModule = {
    state: {
        user: {
            accessToken: '',
            refreshToken: ''
        }
    },
    mutations: {
        CLEAR_AUTH_DATA(state) {
            state.user.accessToken = '';
            state.user.refreshToken = '';
        },
        SET_AUTH(state,{accessToken,refreshToken}) {
            state.user.accessToken = accessToken;
            state.user.refreshToken = refreshToken;

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
            })
        },
        logout({commit}) {
            commit("CLEAR_AUTH_DATA");
        }
    },
    getters: {
        user: state => state.user,
        accessToken: state => state.user.accessToken
    }
}

export default authModule;
