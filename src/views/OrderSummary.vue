<template>
    <mdb-container class="mt-5 mb-5">
        <mdb-row class="justify-content-md-center">
            <mdb-col md="auto" col="12">
                <mdb-card style="min-width: 40vw; min-height: 80vh">
                    <mdb-card-title><p class="text-center mt-3 h4">Your order</p></mdb-card-title>
                    <mdb-card-body class="overflow-auto">
                    <mdb-tabs color="indigo" justify
                              :active="0"
                              default
                              :links="[
                                 { text: 'Order Items'},
                                 { text: 'Client Data' }]">
                        <template :slot="'Order Items'">
                                <mdb-list-group   class="m-3 overflow-auto">
                                    <mdb-list-group-item tag="a" v-for="item in orderItemsInfo" :key="item.id">{{item.name}}</mdb-list-group-item>
                                </mdb-list-group>
                        </template>
                        <template :slot="'Client Data'">
                                <mdb-container>
                                    <mdb-row>
                                        <mdb-col>
                                            <div class="grey-text ml-5 mr-5">
                                                <mdb-input readOnly label="First Name" icon="user" type="text" v-model="order.firstName"/>
                                            </div>
                                        </mdb-col>
                                    </mdb-row>
                                    <mdb-row>
                                        <mdb-col>
                                            <div class="grey-text ml-5 mr-5">
                                                <mdb-input readOnly label="Last Name" icon="user" group type="text" v-model="order.lastName"/>
                                            </div>
                                        </mdb-col>
                                    </mdb-row>
                                    <mdb-row>
                                        <mdb-col col = "8">
                                            <mdb-input readOnly class="ml-5 mr-1 grey-text" label="City" icon="city" type="text" v-model="order.address.city" />
                                        </mdb-col>
                                        <mdb-col col="4">
                                            <mdb-input readOnly class="ml-1 mr-5 grey-text" label="Postal Code" icon="envelope-open-text" type="text" v-model="order.address.postalCode" />
                                        </mdb-col>
                                    </mdb-row>
                                    <mdb-row>
                                        <mdb-col>
                                            <mdb-input readOnly class="ml-5 mr-5 grey-text" label="Street" icon="road" type="text" v-model="order.address.street" />
                                        </mdb-col>
                                    </mdb-row>
                                    <mdb-row class="grey-text">
                                        <mdb-col col = "4">
                                            <mdb-input readOnly class="ml-5" label="House no" icon="home" type="text" v-model="order.address.houseNo" />
                                        </mdb-col>
                                        <mdb-col col = "4">
                                            <mdb-input readOnly label="Flat no" icon="building" type="text" v-model="order.address.flatNo"/>
                                        </mdb-col>
                                    </mdb-row>
                                </mdb-container>
                        </template>
                    </mdb-tabs>
                    </mdb-card-body>
                    <mdb-card-footer>
                        <div class="float-right">
                            <mdb-btn v-on:click="confirm">Confirm Order</mdb-btn>
                        </div>
                    </mdb-card-footer>
                </mdb-card>
            </mdb-col>
        </mdb-row>
    </mdb-container>
</template>

<script>
    import {
        mdbCard,
        mdbCol,
        mdbContainer,
        mdbRow,
        mdbTabs,
        mdbListGroup,
        mdbListGroupItem,
        mdbCardBody,
        mdbCardTitle, mdbCardFooter, mdbBtn,
        mdbInput
    } from "mdbvue";
    import {orderUrl} from "../axios/axiosRoutes";

    export default {
        name: "OrderSummary",
        components: {
            mdbContainer,
            mdbCard,
            mdbCol,
            mdbRow,
            mdbTabs,
            mdbListGroup,
            mdbListGroupItem,
            mdbCardBody,
            mdbCardTitle,
            mdbCardFooter,
            mdbBtn,
            mdbInput
        },
        methods: {
            confirm() {
                this.$api.post(orderUrl, this.order).then(() => {
                    this.$store.commit('CLEAR_ORDER_AND_CART');
                });
            }
        },
        computed: {
            order () {
                return this.$store.getters.order;
            },
            orderItemsInfo () {
                return this.$store.getters.orderItemsInfo;
            }
        }
    }
</script>

<style scoped>

</style>