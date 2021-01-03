import Vue from 'vue'
import Vuex from 'vuex'
import authModule from './auth/auth.module'
import alertModule from "./alert/alert.module";
import createPersistedState from 'vuex-persistedstate'
import shopModule from "./shop/shop.module";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      paths: ['auth', 'shop'],
    }),
  ],
  modules: {
    auth:authModule,
    alert:alertModule,
    shop: shopModule
  }
})
