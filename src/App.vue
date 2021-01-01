<template>
  <div id="app" class="bg h-100" style="overflow: auto;">
    <navbar-page class="mb-2"/>
      <div>
        <error-alert style="margin-left: 15vw; margin-right: 15vw" />
        <info-alert style="margin-left: 15vw; margin-right: 15vw" />
      </div>
        <router-view class="mt-2" />

  </div>
</template>

<script>
import NavbarPage from "@/components/Navbar";
import InfoAlert from "./components/alert/InfoAlert";
import ErrorAlert from "./components/alert/ErrorAlert";
export default {
  name: 'App',
  components: {ErrorAlert, NavbarPage, InfoAlert}
}
</script>

<style lang="scss">
$image-path: '~@/../mdb/mdbvue/img';
@import '~@/../mdb/mdbvue/scss/mdb-free.scss';

@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap');
</style>
