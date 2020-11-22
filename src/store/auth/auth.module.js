import qs from 'querystring';
import {accessTokenUrl} from '../../axios/axiosRoutes'
const authModule = {
    state: {
        user: {
            authenticated: false,
            token: null
        }
    },
    mutations: {
        SET_AUTHENTICATION(state, status) {
            state.user.authenticated = status;
        },
        CLEAR_AUTH_DATA(state) {
            state.user.authenticated = false;
        },
        SET_TOKEN(state,token) {
            state.user.token = token;
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
             commit('SET_TOKEN',response.data.access_token)
            })
        },
        logout({commit}) {
            commit("CLEAR_AUTH_DATA");
        }
    },
    getters: {
        user: state => state.user,
        token: state => state.user.token
    }
}

export default authModule;
