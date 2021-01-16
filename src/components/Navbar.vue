<template>
  <mdb-navbar color="indigo" dark class="pr-0 .flex-fill">
    <mdb-navbar-brand>
      BG-SHOP
    </mdb-navbar-brand>
    <mdb-navbar-toggler>
      <mdb-navbar-nav>
        <mdb-nav-item to="/home" active>{{this.$t('navbar.home')}}</mdb-nav-item>
        <mdb-nav-item to="/boardgames">{{this.$t('navbar.boardgames')}}</mdb-nav-item>
        <mdb-nav-item v-if="isClient" to="/my-orders">{{this.$t('navbar.my_orders')}}</mdb-nav-item>
        <mdb-nav-item v-if="isEmployee" to="/orders">{{this.$t('navbar.orders')}}</mdb-nav-item>
      </mdb-navbar-nav>
      <mdb-form-inline right v-if=!token>
        <mdb-btn v-on:click="login">{{this.$t('navbar.login')}}</mdb-btn>
        <mdb-btn v-on:click="register">{{this.$t('navbar.register')}}</mdb-btn>
      </mdb-form-inline>
      <mdb-form-inline v-else>
        <mdb-navbar-nav class="pr-0" >
        <mdb-btn v-on:click="cart" color="primary" class="mt-0 mr-3"><mdb-icon icon="shopping-cart" class="mr-2"/>{{this.$t('navbar.cart')}} ({{this.cartItemsCount}})</mdb-btn>
        <mdb-dropdown end tag="li" class="pr-0 nav-item">
          <mdb-dropdown-toggle size="lg" tag="a" navLink color="indigo" slot="toggle" waves-fixed>{{this.$t('navbar.hello')}}, {{this.username}}</mdb-dropdown-toggle>
          <mdb-dropdown-menu class="dropdown-menu-right">
            <mdb-dropdown-item to="/Profile">{{this.$t('navbar.profile')}}</mdb-dropdown-item>
            <mdb-dropdown-item v-on:click="logout">{{this.$t('navbar.logout')}}</mdb-dropdown-item>
          </mdb-dropdown-menu>
        </mdb-dropdown>
          </mdb-navbar-nav>
      </mdb-form-inline>
    </mdb-navbar-toggler>
  </mdb-navbar>
</template>
<script>
import { mdbNavbar,mdbIcon, mdbNavbarBrand, mdbNavbarToggler, mdbNavbarNav, mdbNavItem, mdbDropdown, mdbDropdownMenu, mdbDropdownToggle, mdbDropdownItem, mdbBtn, mdbFormInline} from 'mdbvue';
export default {
  name: 'NavbarPage',
  components: {
    mdbNavbar,
    mdbNavbarBrand,
    mdbNavbarToggler,
    mdbNavbarNav,
    mdbNavItem,
    mdbDropdown,
    mdbDropdownMenu,
    mdbDropdownToggle,
    mdbDropdownItem,
    mdbBtn,
    mdbIcon,
    mdbFormInline
  },
  computed: {
    token () {
      return this.$store.getters.accessToken
    },
    username () {
      return this.$store.getters.user.preferred_username;
    },
    cartItemsCount() {
      return this.$store.getters.cartItemsCount;
    }
  },
  methods: {
    login() {
      this.$router.push({name: 'Login'})
    },
    register(){
      this.$router.push({name: 'Register'})
    },
    logout() {
      this.$store.dispatch('logout').then(
          () => {
            this.$router.push({name: 'Home'})
          }
      ).catch(
          () => {
            this.error = true;
          }
      )
    },
    cart() {
      this.$router.push({name: 'Cart'})
    },
  }
}
</script>