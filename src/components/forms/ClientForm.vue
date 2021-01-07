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
                    <mdb-input v-bind:readOnly="!this.editMode" label="First Name" icon="user" type="text" v-model="client.firstName"/>
                </div>
            </mdb-col>
        </mdb-row>
        <mdb-row>
            <mdb-col>
                <div class="grey-text ml-5 mr-5">
                    <mdb-input v-bind:readOnly="!this.editMode" label="Last Name" icon="user" group type="text" v-model="client.lastName"/>
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
            <mdb-col col = "8">
                <mdb-input v-bind:readOnly="!this.editMode" class="ml-5 mr-1 grey-text" label="City" icon="city" type="text" v-model="client.address.city" />
            </mdb-col>
            <mdb-col col="4">
                <mdb-input v-bind:readOnly="!this.editMode" class="ml-1 mr-5 grey-text" label="Postal Code" icon="envelope-open-text" type="text" v-model="client.address.postalCode" />
            </mdb-col>
        </mdb-row>
        <mdb-row>
            <mdb-col>
                <mdb-input v-bind:readOnly="!this.editMode" class="ml-5 mr-5 grey-text" label="Street" icon="road" type="text" v-model="client.address.street" />
            </mdb-col>
        </mdb-row>
        <mdb-row class="grey-text">
            <mdb-col col = "4">
                <mdb-input v-bind:readOnly="!this.editMode" class="ml-5" label="House no" icon="home" type="text" v-model="client.address.houseNo" />
            </mdb-col>
            <mdb-col col = "4">
                <mdb-input v-bind:readOnly="!this.editMode" label="Flat no" icon="building" type="text" v-model="client.address.flatNo"/>
            </mdb-col>
        </mdb-row>
        <mdb-row>
            <mdb-col>
                <div class="text-right">
                    <mdb-btn class="mt-3 mb-3" v-if="!editMode"  v-on:click="() => {this.editMode = true}">
                        Change
                    </mdb-btn>
                    <mdb-btn-group v-else class="mt-3 mb-3">
                        <mdb-btn v-on:click="cancel">Cancel</mdb-btn>
                        <mdb-btn v-on:click="save">Save</mdb-btn>
                    </mdb-btn-group>
                </div>
            </mdb-col>
        </mdb-row>
    </mdb-container >

</template>

<script>
    import {mdbInput, mdbContainer, mdbCol, mdbRow, mdbBtnGroup, mdbBtn, mdbBadge} from "mdbvue";
    import {clientUrl} from "../../axios/axiosRoutes";
    import {clientMixin} from "../mixin/ClientMixin";

    export default {
        name: "ClientForm",
        mixins: [clientMixin],
        components: {
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
                editMode: false
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
                }).then(() => this.editMode = false);
            },
            save() {
                this.$api.patch(clientUrl, this.client).then(this.cancel)
            }
        },
        created() {
            this.fetchData();
        },

    }
</script>

<style scoped>

</style>