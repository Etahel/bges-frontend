<template>
    <!-- Material form login -->
    <div class="container d-flex mt-5">
        <mdb-card class="mx-auto" style="width: 25rem">
            <mdb-card-body>
                <form>
                    <p class="h4 text-center">Create new account</p>
                    <div class="grey-text">
                        <mdb-input class="mb-0" containerClass="text-left" label="Your username" icon="user" type="text"
                                   v-model="username"/>
                        <div  v-if="!this.formValid">
                            <div class="validate-error" v-if="!$v.username.required">Can't be empty</div>
                        </div>
                        <mdb-input class="mb-0" icon="envelope" containerClass="text-left" label="Email" type="email"
                                   v-model="email"/>
                        <div  v-if="!this.formValid">
                            <div class="validate-error" v-if="!$v.email.required">Can't be empty</div>
                            <div class="validate-error" v-if="!$v.email.email">Incorrect email format</div>
                        </div>
                        <mdb-input class="mb-0" containerClass="text-left" label="Your password" icon="lock" type="password"
                                                    v-model="password"/>
                        <div  v-if="!this.formValid">
                            <div class="validate-error" v-if="!$v.password.required">Can't be empty</div>
                        </div>
                        <mdb-input class="mb-0" icon="lock" containerClass="text-left" label="Repeat password" type="password"
                                   v-model="passwordRepeat"/>
                        <div  v-if="!this.formValid">
                            <div class="validate-error" v-if="!$v.passwordRepeat.required">Can't be empty</div>
                            <div class="validate-error" v-if="!$v.passwordRepeat.sameAsPassword">Passwords do not match</div>
                        </div>
                    </div>
                    <div  class="text-center mt-3">
                        <mdb-btn v-on:click="register">Create account</mdb-btn>
                    </div>
                </form>
                <error-alert/>
            </mdb-card-body>
        </mdb-card>
    </div>
    <!-- Material form login -->
</template>

<script>
    import {mdbInput, mdbBtn, mdbCard, mdbCardBody} from 'mdbvue';
    import errorAlert from '../components/ErrorAlert'
    import {required, sameAs, email} from 'vuelidate/lib/validators'
    import {registerUrl} from "../axios/axiosRoutes";
    export default {
        name: "Register",
        components: {
            mdbInput,
            mdbBtn,
            mdbCard,
            mdbCardBody,
            errorAlert,
        },
        methods: {
            register() {
                if (this.$v.$invalid) {
                    this.formValid = false
                } else {
                    const requestBody = {
                        'username': this.username,
                         'email' : this.email,
                        'password': this.password
                    };

                    this.$api.post(registerUrl, requestBody).then(() => {
                        this.$router.push({name: 'Login'})
                    }).then(() => {
                        this.$store.commit('ADD_INFO', {
                            message:'register.success'
                        })
                    })

                }
            },
        },
        data: function () {
            return {
                username: '',
                email:'',
                password: '',
                passwordRepeat:'',
                formValid: true
            }
        },
        validations: {
            username: {
                required
            },
            password: {
                required
            },
            email:{
                required,
                email
            },
            passwordRepeat: {
                required,
                sameAsPassword: sameAs('password')
            }
        }
    }
</script>

<style scoped>

</style>