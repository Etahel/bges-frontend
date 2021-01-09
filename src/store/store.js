import Vue from 'vue'
import Vuex from 'vuex'
import authModule from './auth/auth.module'
import alertModule from "./alert/alert.module";
import createPersistedState from 'vuex-persistedstate'
import shopModule from "./shop/shop.module";
import createMutationsSharer from "vuex-shared-mutations";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      paths: ['auth', 'shop'],
    }),
    createMutationsSharer({ predicate: ["CLEAR_AUTH_DATA", "SET_AUTH", "SET_USER", 'ADD_CART_ITEM', 'REMOVE_CART_ITEM', "ADD_CART_ITEM",
      'UPDATE_CART_ITEM_COUNT', 'CLEAR_CART_ITEMS', 'SET_ORDER', 'SET_ORDER_ITEMS', 'SET_ORDER_DATA', 'SET_ORDER_ITEMS_INFO',
        'CLEAR_ORDER_AND_CART', 'SET_ORDER_VALUE']})
  ],
  modules: {
    auth:authModule,
    alert:alertModule,
    shop: shopModule
  }
})
