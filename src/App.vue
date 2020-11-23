<template>
  <div id="app" class="bg" style="height: 100% ">
    <navbar-page/>
    <router-view />
  </div>
</template>

<script>
import NavbarPage from "@/components/Navbar";
export default {
  name: 'App',
  components: {NavbarPage},
  watch: {
    '$route' () {
      this.$store.commit('CLEAR_ERRORS')
    }
  },
}
</script>

<style lang="scss">
$image-path: '~@/../mdb/mdbvue/img';
@import '~@/../mdb/mdbvue/scss/mdb-free.scss';

@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap');
</style>
