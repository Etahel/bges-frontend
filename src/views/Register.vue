<template>
    <!-- Material form login -->
    <div class="container d-flex mt-5">
        <mdb-card class="mx-auto" style="width: 25rem">
            <mdb-card-body>
                <form>
                    <p class="h4 text-center">Sign in</p>
                    <div class="grey-text">
                        <mdb-input containerClass="text-left" label="Your username" icon="user" type="text"
                                   v-model="username"/>
                        <div  v-if="!this.formValid">
                            <div class="error" v-if="!$v.username.required">Can't be empty</div>
                        </div>
                        <mdb-input containerClass="text-left" label="Your password" icon="lock" type="password"
                                   v-model="password"/>
                        <div  v-if="!this.formValid">
                            <div class="error" v-if="!$v.password.required">Can't be empty</div>
                        </div>
                    </div>
                    <div class="text-center">
                        <mdb-btn v-on:click="login">Login</mdb-btn>
                    </div>
                </form>
                <error-alert/>
            </mdb-card-body>
        </mdb-card>
    </div>
    <!-- Material form login -->
</template>

<script>
    export default {
        name: "Register"
    }
</script>

<style scoped>

</style>