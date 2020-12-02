<template>
  <div id="app" class="bg h-100" style="overflow: auto;">
    <navbar-page/>
    <info-alert class="mt-3 mr-5 ml-5"/>
    <router-view />
  </div>
</template>

<script>
import NavbarPage from "@/components/Navbar";
import InfoAlert from "./components/InfoAlert";
export default {
  name: 'App',
  components: {NavbarPage, InfoAlert},
  watch: {
    '$route' () {
      this.$store.commit('CLEAR_ALERTS')
    }
  },
}
</script>

<style lang="scss">
$image-path: '~@/../mdb/mdbvue/img';
@import '~@/../mdb/mdbvue/scss/mdb-free.scss';

@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap');
</style>
