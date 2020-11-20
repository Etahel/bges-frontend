const authModule = {
    state: {
        user: {
            authenticated: false
        }
    },
    mutations: {
        SET_AUTHENTICATION(state, status) {
            state.user.authenticated = status
        },
        CLEAR_AUTH_DATA(state) {
            state.user.authenticated = false
        }
    },
    actions: {
        login({commit}) {
            commit('SET_AUTHENTICATION',true)
        },
        logout({commit}) {
            commit("CLEAR_AUTH_DATA");
        }
    },
    getters: {
        user: state => state.user
    }
}

export default authModule;
