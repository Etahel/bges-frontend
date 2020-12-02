import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home';
import Login from '@/views/Login';
import Register from "../views/Register";
import LoginHelp from "../views/LoginHelp";
import Profile from "../views/Profile";

Vue.use(Router);

export default new Router({
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
      component: Login
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
    }
  ]
});
