<template>
    <mdb-container class="mt-5">
        <mdb-row class="justify-content-md-center">
            <mdb-col md="auto" col="12">
                <info-alert class="mb-3"/>
                <mdb-card class="mx-auto" style="width: 25rem">
                    <mdb-card-body>
                        <form>
                            <p class="h4 text-center">Login Help</p>
                            <div class="grey-text">
                                <mdb-input class="mb-0" containerClass="text-left" label="Your username" icon="user" type="text"
                                           v-model="username"/>
                                <div v-if="!this.formValid">
                                    <div class="validate-error" v-if="!$v.username.required">Can't be empty</div>
                                </div>
                            </div>
                            <mdb-btn-group class="mt-3" size="sm">
                                <mdb-btn v-on:click="resendVerificationEmail">Resend verification email</mdb-btn>
                                <mdb-btn v-on:click="resetPassword">Reset password</mdb-btn>
                            </mdb-btn-group>
                        </form>
                        <error-alert/>
                    </mdb-card-body>
                </mdb-card>
            </mdb-col>
        </mdb-row>
    </mdb-container>
</template>

<script>
    import {mdbContainer,mdbBtnGroup , mdbRow, mdbCol, mdbInput, mdbBtn, mdbCard, mdbCardBody} from 'mdbvue';
    import errorAlert from '../components/ErrorAlert'
    import {required} from 'vuelidate/lib/validators'
    import InfoAlert from "../components/InfoAlert";
    import {verificationEmailUrl,resetPasswordUrl} from "../axios/axiosRoutes"

    export default {
        name: 'LoginHelp',
        components: {
            mdbContainer,
            mdbBtnGroup,
            mdbRow,
            mdbCol,
            InfoAlert,
            mdbInput,
            mdbBtn,
            mdbCard,
            mdbCardBody,
            errorAlert
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
                        this.$store.commit('ADD_INFO', {
                            message: 'email.sent'
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
                        this.$store.commit('ADD_INFO', {
                            message: 'email.sent'
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