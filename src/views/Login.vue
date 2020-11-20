<template>
  <!-- Material form login -->
    <div class="container d-flex mt-5" >
      <mdb-card class="mx-auto" style="width: 25rem">
        <mdb-card-body >
      <form >
        <p class="h4 text-center">Sign in</p>
        <div class="grey-text">
          <mdb-input containerClass="text-left" label="Your username" icon="user" type="text"/>
          <mdb-input containerClass="text-left" label="Your password" icon="lock" type="password"/>
        </div>
        <div class="text-center">
          <mdb-btn v-on:click="login">Login</mdb-btn>
          <mdb-btn v-on:click="problem">Problem</mdb-btn>
        </div>
      </form>
          <div v-if="error" class="alert-box mt-2" >
          <mdb-alert class="mb-0" color="danger" @closeAlert="noProblem" dismiss>
            Alert
          </mdb-alert>
          </div>
        </mdb-card-body>
      </mdb-card>
    </div>
  <!-- Material form login -->
</template>

<script>
import {mdbInput, mdbBtn, mdbCard, mdbCardBody, mdbAlert} from 'mdbvue';

export default {
  name: 'Login',
  components: {
    mdbInput,
    mdbBtn,
    mdbCard,
    mdbCardBody,
    mdbAlert
  },
  methods: {
    login() {
      this.$store.dispatch('login').then(
          () => {
            this.$router.push({name: 'Home'})
          }
      ).catch(
          () => {
            this.error = true;
          }
      )
    },
    problem() {
      this.error = true
    },
    noProblem(){
      this.error = false
    }
  },
  data: function () {
    return {
      error: false
    }
  }
}


</script>
<style scoped>

</style>