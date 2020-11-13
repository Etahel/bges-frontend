<template>
  <div id="app">
    <navbar-page/>
    <router-view/>
  </div>
</template>

<script>
import NavbarPage from "@/components/Navbar";
export default {
  name: 'App',
  components: {NavbarPage}
}
</script>

<style lang="scss">
$image-path: '~@/../mdb/mdbvue/img';
@import '~@/../mdb/mdbvue/scss/mdb-free.scss';

@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap');

#app {
  text-align: center;
}
</style>
