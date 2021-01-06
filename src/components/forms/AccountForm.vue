<template>
    <form class="m-5">
        <div class="grey-text mb-5">
            <p class="h4 text-left">Your username</p>
            <mdb-input class="mb-0" containerClass="text-left" icon="user" type="text"
                       readOnly v-model="username"/>
        </div>
        <div class="grey-text mb-5">
            <p class="h4 text-left">Current email</p>
            <mdb-input class="mb-0" containerClass="text-left" icon="envelope" type="text"
                       v-bind:readOnly=!emailChange v-model="email"/>
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
            <ButtonWithConfrm v-bind:on-confirm="resetPassword" size="lg">reset password</ButtonWithConfrm>
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

    export default {
        name: "AccountForm",
        components: {
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
                    this.$store.dispatch('logout')
                }).then(() => {
                    this.$store.commit('SET_INFO', {
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
    }
</script>

<style scoped>

</style>