<template>
    <form class="m-5">
        <div class="grey-text mb-5">
            <p class="h4 text-left">{{$t('account.your_username')}}</p>
            <mdb-input class="mb-0" containerClass="text-left" icon="user" type="text"
                       readOnly v-model="username"/>
        </div>
        <div class="grey-text mb-5">
            <p class="h4 text-left">{{$t('account.your_email')}}</p>
            <mdb-input class="mb-0" containerClass="text-left" icon="envelope" type="text"
                       v-bind:readOnly=!emailChange v-model="email"/>
            <div v-if="!this.formValid">
                <required-validation-message v-bind:visible="!$v.email.required"/>
                <email-validation-message v-bind:visible="!$v.email.email"/>
                <different-than-validation-message v-bind:visible="!$v.email.notSameAsOriginal" />
            </div>
            <div class="text-right">
                <mdb-btn v-if="!emailChange" size="sm" v-on:click="enableEmailChange">
                    {{$t('common.buttons.change')}}
                </mdb-btn>
                <mdb-btn-group v-else class="mt-3" size="sm">
                    <mdb-btn v-on:click="cancelEmailChange">{{$t('common.buttons.cancel')}}</mdb-btn>
                    <mdb-btn v-on:click="changeEmail">{{$t('common.buttons.save')}}</mdb-btn>
                </mdb-btn-group>
            </div>
        </div>
        <div class="grey-text text-center mb-5">
            <p class="h4 text-left mb-5">{{$t('account.password')}}</p>
            <ButtonWithConfrm v-bind:on-confirm="resetPassword" size="lg">{{$t('account.buttons.reset_password')}}</ButtonWithConfrm>
        </div>
    </form>
</template>

<script>
    import {
        mdbBtn,
        mdbBtnGroup,
        mdbInput,
    } from "mdbvue";
    import {emailChangeUrl, meUrl, resetPasswordUrl} from "../../axios/axiosRoutes";
    import {email, not, required, sameAs} from "vuelidate/lib/validators";
    import ButtonWithConfrm from "../../components/buttons/ButtonWithConfrm"
    import RequiredValidationMessage from "./validations/RequiredValidationMessage";
    import EmailValidationMessage from "./validations/EmailValidationMessage";
    import DifferentThanValidationMessage from "./validations/DifferentThanValidationMessage";

    export default {
        name: "AccountForm",
        components: {
            DifferentThanValidationMessage,
            EmailValidationMessage,
            RequiredValidationMessage,
            mdbBtnGroup,
            mdbBtn,
            mdbInput,
            ButtonWithConfrm
        },
        data: function () {
            return {
                username: '',
                email: '',
                originalEmail:'',
                emailChange: false,
                formValid: true
            }
        },
        created() {
            this.fetchData()
        },
        watch: {
            '$route': 'fetchData'
        },
        methods: {
            fetchData() {
                this.$api.get(meUrl).then((response) => {
                    this.email = response.data.email;
                    this.username = response.data.username;
                    this.originalEmail = response.data.email;

                })
            },
            changeEmail() {
                if (this.$v.$invalid) {
                    this.formValid = false
                } else{
                    this.$api.post(emailChangeUrl, null, {
                        params: {
                            email: this.email
                        }
                    }).then(() => {
                        this.$store.commit('SET_INFO', {
                            message: 'info.email.changed'
                        });
                        this.emailChange = false;
                        this.formValid = true;
                    }).then(this.fetchData)
                }
            },
            resetPassword() {
                const requestParams = {
                    'username': this.username
                };
                this.$api.post(resetPasswordUrl, null, {
                    params: requestParams
                }).then(() => {
                    this.$store.dispatch('logout')
                }).then(() => {
                    this.$store.commit('SET_INFO', {
                        message: 'info.password.reset'
                    })
                })
            },
            enableEmailChange() {
                this.emailChange = true;
            },
            cancelEmailChange() {
                this.email = this.originalEmail;
                this.emailChange = false;
                this.formValid = true;
            }

        },
        validations: {
            email: {
                required,
                email,
                notSameAsOriginal:not(sameAs('originalEmail'))
            },
        }
    }
</script>

<style scoped>

</style>