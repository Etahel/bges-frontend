import Vue from 'vue'
import Vuex from 'vuex'
import authModule from './auth/auth.module'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      paths: ['user'],
    }),
  ],
  modules: {
    auth:authModule
  }
})