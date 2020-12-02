<template>
    <mdb-container class="mt-5">
        <mdb-row class="justify-content-md-center">
            <mdb-col md="auto" col="12">
                <mdb-card style="min-width: 40vw; min-height: 80vh">
                    <mdb-tabs color="indigo" justify
                              :active="0"
                              default
                              :links="[
                                 { text: 'Account'},
                                 { text: 'Blog' },
                                 { text: 'Contact' }]">
                        <template :slot="'Account'">
                            <div class="overflow-auto">
                                <form class="m-5">
                                    <div class="grey-text mb-5">
                                        <p class="h4 text-left">Your username</p>
                                        <mdb-input class="mb-0" containerClass="text-left" icon="user" type="text"
                                                   disabled readonly v-model="username"/>
                                    </div>
                                    <div class="grey-text mb-5">
                                        <p class="h4 text-left">Current email</p>
                                        <mdb-input class="mb-0" containerClass="text-left" icon="envelope" type="text"
                                                  v-bind:disabled=!emailChange v-model="email"/>
                                        <div v-if="!this.formValid">
                                            <div class="validate-error" v-if="!$v.email.required">Can't be empty</div>
                                            <div class="validate-error" v-if="!$v.email.email">Incorrect email format</div>
                                            <div class="validate-error" v-if="!$v.email.notSameAsOriginal">No change has been made</div>
                                        </div>
                                        <div class="text-right">
                                            <mdb-btn v-if="!emailChange" size="sm" v-on:click="enableEmailChange">
                                                Change
                                            </mdb-btn>
                                            <mdb-btn-group v-else class="mt-3" size="sm">
                                                <mdb-btn v-on:click="cancelEmailChange">Cancel</mdb-btn>
                                                <mdb-btn v-on:click="changeEmail">Save</mdb-btn>
                                            </mdb-btn-group>
                                        </div>
                                    </div>
                                    <div class="grey-text text-center mb-5">
                                        <p class="h4 text-left mb-5">Password</p>
                                        <mdb-btn size="lg" v-on:click="resetPassword">reset password</mdb-btn>
                                    </div>
                                </form>
                            </div>
                        </template>
                        <template :slot="'Blog'">
                            <mdb-container class="overflow-auto">
                                <mdb-row>
                                    <mdb-col lg="5">
                                        <mdb-view class="rounded z-depth-2 mb-lg-0 mb-4" hover>
                                            <img class="img-fluid"
                                                 src="https://mdbootstrap.com/img/Photos/Others/img%20(27).jpg"
                                                 alt="Sample image"/>
                                            <a>
                                                <mdb-mask overlay="white-slight" waves/>
                                            </a>
                                        </mdb-view>
                                    </mdb-col>
                                </mdb-row>
                            </mdb-container>
                        </template>
                        <template :slot="'Contact'">
                            <mdb-container class="overflow-auto">
                                <mdb-row>
                                    <mdb-col>
                                        <form>
                                            <p class="h4 text-center mb-4">Write to us</p>
                                            <div class="grey-text">
                                                <mdb-input label="Your name" icon="user" group type="text" validate
                                                           error="wrong" success="right"/>
                                                <mdb-input label="Your email" icon="envelope" group type="email"
                                                           validate error="wrong" success="right"/>
                                                <mdb-input label="Subject" icon="tag" group type="text" validate
                                                           error="wrong" success="right"/>
                                                <mdb-textarea :rows="2" label="Your message" icon="pencil"/>
                                            </div>
                                            <div class="text-center">
                                                <mdb-btn outline="secondary">Send
                                                    <mdb-icon far icon="paper-plane" class="ml-1"/>
                                                </mdb-btn>
                                            </div>
                                        </form>
                                    </mdb-col>
                                </mdb-row>
                            </mdb-container>
                        </template>
                    </mdb-tabs>
                    <error-alert/>
                </mdb-card>
            </mdb-col>
        </mdb-row>
    </mdb-container>
</template>

<script>
    import {
        mdbContainer,
        mdbCard,
        mdbCol,
        mdbRow,
        mdbIcon,
        mdbTabs,
        mdbView,
        mdbMask,
        mdbBtn,
        mdbTextarea,
        mdbInput,
        mdbBtnGroup
    } from 'mdbvue';
    import {meUrl, emailChangeUrl, resetPasswordUrl} from "../axios/axiosRoutes";
    import {email, required, sameAs, not} from "vuelidate/lib/validators";
    import errorAlert from '../components/ErrorAlert'

    export default {
        name: 'Profile',
        components: {
            mdbBtnGroup,
            mdbContainer,
            mdbCard,
            mdbCol,
            mdbRow,
            mdbIcon,
            mdbTabs,
            mdbView,
            mdbMask,
            mdbBtn,
            mdbTextarea,
            mdbInput,
            errorAlert
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
                    this.$store.commit('ADD_INFO', {
                        message: 'email.changed'
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
                    this.$router.push({name: 'Login'})
                }).then(() => {
                    this.$store.commit('ADD_INFO', {
                        message: 'password.reset'
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
    };
</script>

<style scoped>

</style>