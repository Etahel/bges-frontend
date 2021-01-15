<template>
    <mdb-container>
        <mdb-row>
            <mdb-col>
                <div class="ml-5 mt-5 mr-5 grey-text">
                    <p class="h4 text-left">Client Data
                        <mdb-badge v-if="!this.doesClientHaveFullName" color="danger">Incomplete</mdb-badge>
                    </p>

                </div>
            </mdb-col>
        </mdb-row>
        <mdb-row>
            <mdb-col>
                <div class="grey-text ml-5 mr-5">
                    <mdb-input v-bind:readOnly="!this.editMode" label="First Name" icon="user" type="text"
                               v-model="client.firstName"/>
                    <max-length-validation-message max-length="50"
                                                   v-bind:visible="!$v.client.firstName.maxLength && !formValid"/>
                </div>
            </mdb-col>
        </mdb-row>
        <mdb-row>
            <mdb-col>
                <div class="grey-text ml-5 mr-5">
                    <mdb-input v-bind:readOnly="!this.editMode" label="Last Name" icon="user" group type="text"
                               v-model="client.lastName"/>
                    <max-length-validation-message max-length="50"
                                                   v-bind:visible="!$v.client.lastName.maxLength && !formValid"/>
                </div>
            </mdb-col>
        </mdb-row>
        <mdb-row>
            <mdb-col>
                <div class="ml-5 mr-5 grey-text">
                    <p class="h4 text-left">Address Data
                        <mdb-badge v-if="!this.doesClientHaveAddress" color="danger">Incomplete</mdb-badge>
                    </p>
                </div>
            </mdb-col>
        </mdb-row>
        <mdb-row>
            <mdb-col col="8">
                <div class="ml-5 mr-1 grey-text">
                    <mdb-input v-bind:readOnly="!this.editMode" label="City" icon="city"
                               type="text" v-model="client.address.city"/>
                    <max-length-validation-message max-length="50"
                                                   v-bind:visible="!$v.client.address.city.maxLength && !formValid"/>
                </div>
            </mdb-col>
            <mdb-col col="4">
                <div class="ml-5 mr-1 grey-text">
                    <mdb-input v-bind:readOnly="!this.editMode" label="Postal Code"
                               icon="envelope-open-text" type="text" v-model="client.address.postalCode"/>
                    <regex-validation-message v-bind:visible="!$v.client.address.postalCode.regex && !formValid"/>
                </div>
            </mdb-col>
        </mdb-row>
        <mdb-row>
            <mdb-col>
                <div class="ml-5 mr-5 grey-text">
                    <mdb-input v-bind:readOnly="!this.editMode" label="Street" icon="road"
                               type="text" v-model="client.address.street"/>
                    <max-length-validation-message max-length="50"
                                                   v-bind:visible="!$v.client.address.street.maxLength && !formValid"/>
                </div>
            </mdb-col>
        </mdb-row>
        <mdb-row class="grey-text">
            <mdb-col col="4">
                <div class="ml-5">
                    <mdb-input v-bind:readOnly="!this.editMode" label="House no" icon="home" type="text"
                               v-model="client.address.houseNo"/>
                    <max-length-validation-message max-length="10"
                                                   v-bind:visible="!$v.client.address.houseNo.maxLength && !formValid"/>
                </div>
            </mdb-col>
            <mdb-col col="4">
                <div>
                <mdb-input v-bind:readOnly="!this.editMode" label="Flat no" icon="building" type="text"
                           v-model="client.address.flatNo"/>
                    <max-length-validation-message max-length="10"
                                                   v-bind:visible="!$v.client.address.flatNo.maxLength && !formValid"/>
                </div>
            </mdb-col>
        </mdb-row>
        <mdb-row>
            <mdb-col>
                <div class="text-right">
                    <mdb-btn class="mt-3 mb-3" v-if="!editMode" v-on:click="() => {this.editMode = true}">
                        Change
                    </mdb-btn>
                    <mdb-btn-group v-else class="mt-3 mb-3">
                        <mdb-btn v-on:click="cancel">Cancel</mdb-btn>
                        <mdb-btn v-on:click="save">Save</mdb-btn>
                    </mdb-btn-group>
                </div>
            </mdb-col>
        </mdb-row>
    </mdb-container>

</template>

<script>
    import {mdbInput, mdbContainer, mdbCol, mdbRow, mdbBtnGroup, mdbBtn, mdbBadge} from "mdbvue";
    import {clientUrl} from "../../axios/axiosRoutes";
    import {clientMixin} from "../mixin/ClientMixin";
    import {maxLength} from "vuelidate/lib/validators";
    import {checkRegex} from "../../scripts/validators";
    import MaxLengthValidationMessage from "./validations/MaxLengthValidationMessage";
    import RegexValidationMessage from "./validations/RegexValidationMessage";

    export default {
        name: "ClientForm",
        mixins: [clientMixin],
        components: {
            RegexValidationMessage,
            MaxLengthValidationMessage,
            mdbInput,
            mdbContainer,
            mdbCol,
            mdbRow,
            mdbBtnGroup,
            mdbBtn,
            mdbBadge
        },
        data: function () {
            return {
                editMode: false,
                formValid: true
            }
        },
        methods: {
            fetchData() {
                this.$api.get(clientUrl).then((response) => {
                    this.client = response.data;
                })
            },
            cancel() {
                this.$api.get(clientUrl).then((response) => {
                    this.client = response.data;
                }).then(() => {
                    this.editMode = false;
                    this.formValid = true;
                });
            },
            save() {
                if (this.$v.$invalid) {
                    this.formValid = false
                } else {
                    this.$api.patch(clientUrl, this.client).then(this.cancel)
                }
            }
        },
        created() {
            this.fetchData();
        },
        validations() {
            return {
                client: {
                    firstName: {
                        maxLength: maxLength(50)
                    },
                    lastName: {
                        maxLength: maxLength(50)
                    },
                    address: {
                        city: {
                            maxLength: maxLength(50)
                        },
                        street: {
                            maxLength: maxLength(50)
                        },
                        postalCode: {
                            regex: checkRegex(new RegExp("\\d{2}[- ]\\d{3}$"))
                        },
                        houseNo: {
                            maxLength: maxLength(10)
                        },
                        flatNo: {
                            maxLength: maxLength(10)
                        }
                    }
                }

            }
        }
    }
</script>

<style scoped>

</style>