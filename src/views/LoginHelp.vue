<template>
    <mdb-container class="mt-5">
        <mdb-row class="justify-content-md-center">
            <mdb-col md="auto" col="12">
                <info-alert class="mb-3"/>
                <mdb-card class="mx-auto" style="min-width: 40vw">
                    <mdb-card-body>
                        <form>
                            <p class="h4 text-center">Login Help</p>
                            <div class="grey-text">
                                <mdb-input class="mb-0" containerClass="text-left" v-bind:label="$t('account.username')" icon="user" type="text"
                                           v-model="username"/>
                                <div v-if="!this.formValid">
                                    <required-validation-message v-bind:visible="!$v.username.required" />
                                </div>
                            </div>
                            <mdb-btn-group class="mt-3" size="sm">
                                <mdb-btn v-on:click="resendVerificationEmail">{{$t('account.buttons.resend_email')}}</mdb-btn>
                                <mdb-btn v-on:click="resetPassword">{{$t('account.buttons.reset_password')}}</mdb-btn>
                            </mdb-btn-group>
                        </form>
                    </mdb-card-body>
                </mdb-card>
            </mdb-col>
        </mdb-row>
    </mdb-container>
</template>

<script>
    import {mdbContainer,mdbBtnGroup , mdbRow, mdbCol, mdbInput, mdbBtn, mdbCard, mdbCardBody} from 'mdbvue';
    import {required} from 'vuelidate/lib/validators'
    import InfoAlert from "../components/alert/InfoAlert";
    import {verificationEmailUrl,resetPasswordUrl} from "../axios/axiosRoutes"
    import RequiredValidationMessage from "../components/forms/validations/RequiredValidationMessage";

    export default {
        name: 'LoginHelp',
        components: {
            RequiredValidationMessage,
            mdbContainer,
            mdbBtnGroup,
            mdbRow,
            mdbCol,
            InfoAlert,
            mdbInput,
            mdbBtn,
            mdbCard,
            mdbCardBody,
        },
        methods: {
            resendVerificationEmail() {
                if (this.$v.$invalid) {
                    this.formValid = false
                } else {
                    const requestParams = {
                        'username': this.username
                    };
                    this.$api.post(verificationEmailUrl, null, {
                        params: requestParams
                    }).then(() => {
                        this.$router.push({name: 'Login'})
                    }).then(() => {
                        this.$store.commit('SET_INFO', {
                            message: 'info.email.sent'
                        })
                    })
                }

            },
            resetPassword() {
                if (this.$v.$invalid) {
                    this.formValid = false
                } else {
                    const requestParams = {
                        'username': this.username
                    };
                    this.$api.post(resetPasswordUrl, null,{
                        params: requestParams
                    }).then(() => {
                        this.$router.push({name: 'Login'})
                    }).then(() => {
                        this.$store.commit('SET_INFO', {
                            message: 'info.password.reset'
                        })
                    })
                }

            }

        },
        data: function () {
            return {
                username: '',
                formValid: true
            }
        },
        validations: {
            username: {
                required
            }
        }
    }
</script>

<style scoped>

</style>