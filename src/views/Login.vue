<template>
    <!-- Material form login -->
    <mdb-container class="mt-5">
        <mdb-row class="justify-content-md-center">
            <mdb-col md="auto" col="12">
                <mdb-card style="min-width: 30vw">
                    <mdb-card-body>
                        <form>
                            <p class="h4 text-center">Sign in</p>
                            <div class="grey-text">
                                <mdb-input class="mb-0" containerClass="text-left" label="Your username" icon="user" type="text"
                                           v-model="username"/>
                                <div v-if="!this.formValid">
                                    <required-validation-message v-bind:visible="!$v.username.required"/>
                                </div>
                                <mdb-input class="mb-0" containerClass="text-left" label="Your password" icon="lock" type="password"
                                           v-model="password"/>
                                <div v-if="!this.formValid">
                                    <required-validation-message v-bind:visible="!$v.password.required"/>
                                </div>
                            </div>
                            <div class="text-left">
                                <mdb-btn v-on:click="login">Login</mdb-btn>
                            </div>
                            <div class="text-right">
                            <button class="mb-0 p-0 text-button" v-on:click = "help" >Need help logging in?</button>
                            </div>
                        </form>
                    </mdb-card-body>
                </mdb-card>
            </mdb-col>
        </mdb-row>
    </mdb-container>
    <!-- Material form login -->
</template>

<script>
    import {mdbContainer, mdbRow, mdbCol, mdbInput, mdbBtn, mdbCard, mdbCardBody} from 'mdbvue';
    import {required} from 'vuelidate/lib/validators'
    import RequiredValidationMessage from "../components/forms/validations/RequiredValidationMessage";

    export default {
        name: 'Login',
        components: {
            RequiredValidationMessage,
            mdbContainer,
            mdbRow,
            mdbCol,
            mdbInput,
            mdbBtn,
            mdbCard,
            mdbCardBody,
        },
        methods: {
            login() {
                if (this.$v.$invalid) {
                    this.formValid = false
                } else {
                    this.$store.dispatch('login', {username: this.username, password: this.password}).then(
                        () => {
                            this.$router.push({name: 'Home'})
                        }
                    )
                }
            },
            help() {
                    this.$router.push({name: 'LoginHelp'})
            }
        },
        data: function () {
            return {
                username: '',
                password: '',
                formValid: true
            }
        },
        validations: {
            username: {
                required
            },
            password: {
                required
            }
        }
    }


</script>
<style scoped>

</style>