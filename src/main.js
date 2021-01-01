import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap-css-only/css/bootstrap.min.css'
import 'mdbvue/lib/mdbvue.css'
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import store from './store/store'
import axiosInstance from "./axios/axiosConfig";
import i18n from './i18n'
import Vuelidate from 'vuelidate'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';





Vue.config.productionTip = false;

Vue.prototype.$api = axiosInstance;
Vuex.Store.prototype.$api = axiosInstance;

Vue.use(Vuelidate);
Vue.component('v-select', vSelect);

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
