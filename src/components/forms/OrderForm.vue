<template>
    <mdb-container>
        <mdb-row>
            <mdb-col>
                <div class="ml-5 mt-5 mr-5 grey-text">
                    <p class="h4 text-left">Client Data</p>
                </div>
            </mdb-col>
        </mdb-row>
        <mdb-row class="mt-3 grey-text justify-content-md-center">
            <mdb-col col="5" class="ml-5">
                <div class="custom-control custom-radio custom-control-inline">
                    <input v-model="clientMode" checked type="radio" name="clientRadio" value="provide" class="custom-control-input" id="provideClientRadio">
                    <label class="custom-control-label" for="provideClientRadio">Provide Client Data</label>
                </div>
            </mdb-col>
            <mdb-col  col="6">
                <div class="custom-control custom-radio custom-control-inline">
                    <input v-model="clientMode" v-bind:disabled="!doesClientHaveFullName"  value="default" type="radio" name="clientRadio" class="custom-control-input" id="defaultClientRadio">
                    <label class="custom-control-label" for="defaultClientRadio">Use Default Client
                        <mdb-badge v-if="!this.doesClientHaveFullName" color="danger">Incomplete</mdb-badge>
                    </label>
                </div>
            </mdb-col>
        </mdb-row>
        <mdb-row>
            <mdb-col>
                <div class="grey-text ml-5 mr-5">
                    <mdb-input v-bind:readOnly="this.clientMode==='default'"  label="First Name" icon="user" type="text" v-model="clientData.firstName"/>
                </div>
            </mdb-col>
        </mdb-row>
        <mdb-row>
            <mdb-col>
                <div class="grey-text ml-5 mr-5">
                    <mdb-input v-bind:readOnly="this.clientMode==='default'"  label="Last Name" icon="user" group type="text" v-model="clientData.lastName"/>
                </div>
            </mdb-col>
        </mdb-row>
        <mdb-row>
            <mdb-col>
                <div class="ml-5 mt-3 mr-5 grey-text">
                    <p class="h4 text-left">Address Data</p>
                </div>
            </mdb-col>
        </mdb-row>
        <mdb-row class="mt-3 grey-text justify-content-md-center">
            <mdb-col col="5" class="ml-5">
                <div class="custom-control custom-radio custom-control-inline">
                    <input v-model="addressMode" checked type="radio" name="addressRadio" value="provide" class="custom-control-input" id="provideAddressRadio">
                    <label  class="custom-control-label" for="provideAddressRadio">Provide Address Data</label>
                </div>
            </mdb-col>
            <mdb-col  col="6">
                    <div class="custom-control custom-radio custom-control-inline">
                        <input v-model="addressMode" v-bind:disabled="!doesClientHaveAddress" value="default" type="radio" name="addressRadio" class="custom-control-input" id="defaultAddressRadio">
                        <label class="custom-control-label" for="defaultAddressRadio">
                            Use Default Address
                            <mdb-badge v-if="!this.doesClientHaveAddress" color="danger">Incomplete</mdb-badge>
                        </label>
                    </div>
            </mdb-col>
        </mdb-row>
        <mdb-row>
            <mdb-col col = "8">
                <mdb-input v-bind:readOnly="this.addressMode==='default'"  class="ml-5 mr-1 grey-text" label="City" icon="city" type="text" v-model="addressData.city" />
            </mdb-col>
            <mdb-col col="4">
                <mdb-input v-bind:readOnly="this.addressMode==='default'"  class="ml-1 mr-5 grey-text" label="Postal Code" icon="envelope-open-text" type="text" v-model="addressData.postalCode" />
            </mdb-col>
        </mdb-row>
        <mdb-row>
            <mdb-col>
                <mdb-input v-bind:readOnly="this.addressMode==='default'"  class="ml-5 mr-5 grey-text" label="Street" icon="road" type="text" v-model="addressData.street" />
            </mdb-col>
        </mdb-row>
        <mdb-row class="grey-text">
            <mdb-col col = "4">
                <mdb-input v-bind:readOnly="this.addressMode==='default'"  class="ml-5" label="House no" icon="home" type="text" v-model="addressData.houseNo" />
            </mdb-col>
            <mdb-col col = "4">
                <mdb-input v-bind:readOnly="this.addressMode==='default'"  label="Flat no" icon="building" type="text" v-model="addressData.flatNo"/>
            </mdb-col>
        </mdb-row>
        <mdb-row>
            <mdb-col>
                <div class="text-right">
                    <mdb-btn-group class="mt-3 mb-3">
                        <mdb-btn v-on:click="summary">Summary</mdb-btn>
                    </mdb-btn-group>
                </div>
            </mdb-col>
        </mdb-row>
    </mdb-container >
</template>

<script>
    import {clientUrl} from "../../axios/axiosRoutes";
    import {clientMixin} from "../mixin/ClientMixin";
    import {mdbBtn, mdbBtnGroup, mdbCol, mdbContainer, mdbInput, mdbRow, mdbBadge} from "mdbvue";

    export default {
        name: "OrderForm",
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
        data: function() {
            return {
                clientMode : 'provide',
                addressMode: 'provide',
                clientModel: {
                    id: -1,
                    firstName: '',
                    lastName: '',
                    address: {
                        city: '',
                        street: '',
                        houseNo: '',
                        flatNo: '',
                        postalCode: ''
                    }
                },

                clientData: {
                    firstName: '',
                    lastName: '',
                },
                addressData: {
                    city: '',
                    street: '',
                    houseNo: '',
                    flatNo: '',
                    postalCode: ''
                }
            }
        },
        methods: {
            fetchData() {
                this.$api.get(clientUrl).then((response) => {
                    this.client = response.data;
                })
            },
            summary() {
                this.$store.commit('SET_ORDER_DATA',{
                    clientData: this.clientData,
                    addressData: this.addressData
                });
                this.$router.push({name: 'OrderSummary'})
            }

        },
        created() {
            this.fetchData();
            this.addressData = Object.assign({},this.$store.getters.orderAddressData);
            this.clientData = Object.assign({},this.$store.getters.orderClientData);
        },
        watch: {
            clientMode: function (value) {
                if(value === 'provide') {
                    this.clientData.firstName =  this.clientModel.firstName;
                    this.clientData.lastName = this. clientModel.lastName
                } else if(value ==='default') {
                    this.clientData.firstName =  this.client.firstName;
                    this.clientData.lastName = this. client.lastName
                }
            },
            addressMode: function (value) {
                if(value === 'provide') {
                    this.addressData = Object.assign({}, this.clientModel.address)
                } else if(value ==='default') {
                    this.addressData = Object.assign({}, this.client.address)
                }
            }
        }
    }
</script>

<style scoped>

</style>