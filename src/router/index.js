import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home';
import Login from '@/views/Login';
import Register from "../views/Register";
import LoginHelp from "../views/LoginHelp";
import Profile from "../views/Profile";
import store from "../store/store";
import BoardGames from "../views/BoardGames";
import CreateBoardGame from "../views/CreateBoardGame";
import BoardGameDetails from "../views/BoardGameDetails";
Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        breadcrumb: {
          label: 'Home',
          parent: 'Login'
        }
      }
    },
    {
      path: '/home',
      redirect: "/"
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        breadcrumb: {
          label: 'Login'
        }
      }
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
      component: Profile
    },
    {
      path: '/boardgames',
      name: 'Boardgames',
      component: BoardGames
    },
    {
      path: '/boardgames/create',
      name: 'BoardGame-Create',
      component: CreateBoardGame
    },
    {
      path: '/boardgames/:id',
      name: 'BoardGame-Details',
      component: BoardGameDetails
    }
  ]
});

router.beforeEach((to, from, next) => {
  store.commit('CLEAR_ALERTS');
  next()
});

export default router;
