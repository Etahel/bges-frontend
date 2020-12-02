<template>
  <mdb-navbar color="indigo" dark class="pr-0 .flex-fill">
    <mdb-navbar-brand href="https://mdbootstrap.com/">
      Navbar
    </mdb-navbar-brand>
    <mdb-navbar-toggler>
      <mdb-navbar-nav>
        <mdb-nav-item to="Home" active>Home</mdb-nav-item>
        <mdb-nav-item href="#">Whatver</mdb-nav-item>
        <mdb-nav-item href="#">Pricing</mdb-nav-item>
        <mdb-dropdown tag="li" class="nav-item">
          <mdb-dropdown-toggle tag="a" navLink color="indigo" slot="toggle" waves-fixed>Dropdown</mdb-dropdown-toggle>
          <mdb-dropdown-menu>
            <mdb-dropdown-item>Action</mdb-dropdown-item>
            <mdb-dropdown-item>Another action</mdb-dropdown-item>
            <mdb-dropdown-item>Something else here</mdb-dropdown-item>
          </mdb-dropdown-menu>
        </mdb-dropdown>
      </mdb-navbar-nav>
      <mdb-form-inline right v-if=!token>
        <mdb-btn v-on:click="login">Log in</mdb-btn>
        <mdb-btn v-on:click="register">Register</mdb-btn>
      </mdb-form-inline>
      <mdb-form-inline v-else>
        <mdb-navbar-nav class="pr-0" >
        <mdb-dropdown end tag="li" class="pr-0 nav-item">
          <mdb-dropdown-toggle size="lg" tag="a" navLink color="indigo" slot="toggle" waves-fixed>Hello, {{this.username}}</mdb-dropdown-toggle>
          <mdb-dropdown-menu class="dropdown-menu-right">
            <mdb-dropdown-item to="Profile">Profile</mdb-dropdown-item>
            <mdb-dropdown-item v-on:click="logout">Log out</mdb-dropdown-item>
          </mdb-dropdown-menu>
        </mdb-dropdown>
          </mdb-navbar-nav>
      </mdb-form-inline>
    </mdb-navbar-toggler>
  </mdb-navbar>
</template>
<script>
import { mdbNavbar, mdbNavbarBrand, mdbNavbarToggler, mdbNavbarNav, mdbNavItem, mdbDropdown, mdbDropdownMenu, mdbDropdownToggle, mdbDropdownItem, mdbBtn, mdbFormInline} from 'mdbvue';
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
    mdbFormInline
  },
  computed: {
    token () {
      return this.$store.getters.accessToken
    },
    username () {
      return this.$store.getters.user.preferred_username;
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
    }
  }
}
</script>