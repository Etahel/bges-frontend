<template>
    <!-- Material form login -->
    <mdb-container class="mt-5">
        <mdb-row class="justify-content-md-center">
            <mdb-col md="auto" col="12">
                <mdb-card class="mx-auto" style="min-width: 30vw">
                    <mdb-card-body>
                        <form>
                            <p class="h4 text-center">{{$t('account.create')}}</p>
                            <div class="grey-text">
                                <mdb-input class="mb-0" containerClass="text-left" v-bind:label="$t('account.username')" icon="user"
                                           type="text"
                                           v-model="username"/>
                                <div v-if="!this.formValid">
                                    <required-validation-message v-bind:visible="!$v.username.required" />
                                    <min-length-validation-message v-bind:visible="!$v.username.minLength" min-length="3" />
                                </div>
                                <mdb-input class="mb-0" icon="envelope" containerClass="text-left" v-bind:label="$t('account.email')"
                                           type="email"
                                           v-model="email"/>
                                <div v-if="!this.formValid">
                                    <required-validation-message v-bind:visible="!$v.email.required" />
                                    <email-validation-message v-bind:visible="!$v.email.email"/>

                                </div>
                                <mdb-input class="mb-0" containerClass="text-left" v-bind:label="$t('account.password')" icon="lock"
                                           type="password"
                                           v-model="password"/>
                                <div v-if="!this.formValid">
                                    <required-validation-message v-bind:visible="!$v.password.required" />
                                    <div class="validate-error" v-if="!$v.password.passwordRegex">{{$t('validation.password_format')}}
                                    </div>
                                </div>
                                <mdb-input class="mb-0" icon="lock" containerClass="text-left" v-bind:label="$t('account.repeat_password')"
                                           type="password"
                                           v-model="passwordRepeat"/>
                                <div v-if="!this.formValid">
                                    <required-validation-message v-bind:visible="!$v.passwordRepeat.required" />
                                        <div class="validate-error" v-if="!$v.passwordRepeat.sameAsPassword">{{$t('validation.password_repeat')}}
                                    </div>
                                </div>
                            </div>
                            <div class="text-center mt-3">
                                <mdb-btn v-on:click="register">{{$t('account.buttons.create')}}</mdb-btn>
                            </div>
                        </form>
                    </mdb-card-body>
                </mdb-card>
            </mdb-col>
        </mdb-row>
    </mdb-container>
</template>

<script>
    import {mdbContainer, mdbRow, mdbCol, mdbInput, mdbBtn, mdbCard, mdbCardBody} from 'mdbvue';
    import {required, sameAs, email, minLength, maxLength} from 'vuelidate/lib/validators'
    import {registerUrl} from "../axios/axiosRoutes";
    import RequiredValidationMessage from "../components/forms/validations/RequiredValidationMessage";
    import EmailValidationMessage from "../components/forms/validations/EmailValidationMessage";
    import {checkRegex} from "../scripts/validators";
    import MinLengthValidationMessage from "../components/forms/validations/MinLengthValidationMessage";

    export default {
        name: "Register",
        components: {
            MinLengthValidationMessage,
            EmailValidationMessage,
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
            register() {
                if (this.$v.$invalid) {
                    this.formValid = false
                } else {
                    const requestBody = {
                        'username': this.username,
                        'email': this.email,
                        'password': this.password
                    };

                    this.$api.post(registerUrl, requestBody).then(() => {
                        this.$router.push({name: 'Login'})
                    }).then(() => {
                        this.$store.commit('SET_INFO', {
                            message: 'info.register.success'
                        })
                    })

                }
            },
        },
        data: function () {
            return {
                username: '',
                email: '',
                password: '',
                passwordRepeat: '',
                formValid: true
            }
        },
        validations: {
            username: {
                minLength: minLength(3),
                maxLength: maxLength(15),
                required
            },
            password: {
                required,
                passwordRegex: checkRegex(new RegExp("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$"))
            },
            email: {
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