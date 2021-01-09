import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home';
import Login from '@/views/Login';
import Register from "../views/Register";
import LoginHelp from "../views/LoginHelp";
import Profile from "../views/Profile";
import store from "../store/store";
import BoardGames from "../views/BoardGames";
import Cart from "../views/Cart";
import Order from "../views/Order";
import OrderSummary from "../views/OrderSummary";
import ElementForm from "../components/forms/ElementForm";
import BoardGameForm from "../components/forms/BoardGameForm";
import MyOrders from "../views/MyOrders";
import OrderDetails from "../views/OrderDetails";
import {myOrdersUrl, ordersUrl} from "../axios/axiosRoutes"
import AllOrders from "../views/AllOrders";

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/home',
      redirect: "/"
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/login-help',
      name: 'LoginHelp',
      component: LoginHelp
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      beforeEnter: (to, from, next) => {
        checkAuthenticated(next)
      }
    },
    {
      path: '/boardgames',
      name: 'Boardgames',
      component: BoardGames
    },
    {
      path: '/boardgames/create',
      name: 'BoardGame-Create',
      component: BoardGameForm,
      beforeEnter: (to, from, next) => {
        checkAuthenticated(next)
      }
    },
    {
      path: '/boardgames/:id',
      name: 'BoardGame-Details',
      component: BoardGameForm,
    },
    {
      path: '/boardgames/:boardGameId/elements/create',
      name: 'Element-Create',
      component: ElementForm,
      beforeEnter: (to, from, next) => {
        checkEmployee(next)
      }

    },
    {
      path: '/boardgames/:boardGameId/elements/:elementId',
      name: 'Element-Details',
      component: ElementForm,
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart,
      beforeEnter: (to, from, next) => {
        checkClient(next)
      }
    },
    {
      path: '/order',
      name: 'Order',
      component: Order,
      beforeEnter: (to, from, next) => {
        checkClient(next)
      }
    },
    {
      path: '/order/summary',
      name:'Order-Summary',
      component: OrderSummary,
      beforeEnter: (to, from, next) => {
        checkClient(next)
      }
    },
    {
      path: '/my-orders',
      name: 'MyOrders',
      component: MyOrders,
      beforeEnter: (to, from, next) => {
        checkClient(next)
      }
    },
    {
      path: '/orders',
      name: 'Orders',
      component: AllOrders,
      beforeEnter: (to, from, next) => {
        checkEmployee(next)
      }
    },
    {
      path: '/my-orders/:orderId',
      name: 'MyOrder-Details',
      component: OrderDetails,
      props: {
        orderUrl: myOrdersUrl
      },
      beforeEnter: (to, from, next) => {
        checkClient(next)
      }
    },
    {
      path: '/orders/:orderId',
      name: 'Order-Details',
      component: OrderDetails,
      props: {
        orderUrl: ordersUrl
      },
      beforeEnter: (to, from, next) => {
        checkEmployee(next)
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  store.commit('CLEAR_ALERTS');
  next()
});

function isAuthenticated() {
  return store.getters.accessToken;
}

function isEmployee () {
  return store.getters.roles.includes('employee')
}

function  isClient () {
  return store.getters.roles.includes('user')
}

function checkAuthenticated(next) {
  if (!isAuthenticated()) {
    next({ name: 'Login' })
  }
  else {
    next()
  }
}

function checkClient(next) {
  if (!isAuthenticated()) {
    next({ name: 'Login' })
  }
  else if (!isClient()) {
    store.dispatch('logout').then(() => store.commit('SET_ERROR', new Error('Logged_out')));
  }
  else {
    next()
  }
}

function checkEmployee(next) {
  if (!isAuthenticated()) {
    next({ name: 'Login' })
  }
  else if (!isEmployee()) {
    store.dispatch('logout').then(() => store.commit('SET_ERROR', new Error('Logged_out')));
  }
  else {
    next()
  }
}

export default router;
