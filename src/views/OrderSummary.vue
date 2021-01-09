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
                            <OrderItemsInfo  v-bind:order-value="orderValue" v-bind:complete-element-info="orderItemsInfo"/>
                        </template>
                        <template :slot="'Client Data'">
                            <OrderClientInfo v-bind:order="this.order"/>
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
        mdbCardBody,
        mdbCardTitle, mdbCardFooter, mdbBtn,
    } from "mdbvue";
    import {myOrdersUrl} from "../axios/axiosRoutes";
    import OrderClientInfo from "../components/info/OrderClientInfo";
    import OrderItemsInfo from "../components/info/OrderItemsInfo";

    export default {
        name: "OrderSummary",
        components: {
            OrderClientInfo,
            mdbContainer,
            mdbCard,
            mdbCol,
            mdbRow,
            mdbTabs,
            mdbCardBody,
            mdbCardTitle,
            mdbCardFooter,
            mdbBtn,
            OrderItemsInfo
        },
        methods: {
            confirm() {
                this.$api.post(myOrdersUrl, this.order).then(response => {
                    this.$router.push({
                        name: 'MyOrder-Details',
                        params: {
                            orderId: response.data.id
                        }
                    });
                }).then(() => {
                    this.$store.commit('CLEAR_ORDER_AND_CART');
                }).catch(error => {
                    if(['element_not_found', 'element_changed', 'stock_unavailable', 'stock_insufficient'].findIndex(errorMessage => {
                       return  error.message.includes(errorMessage)
                    }) >= 0){
                        this.$router.push({
                            name: 'Cart',
                            })
                    }
                    this.$store.commit('SET_ERROR', error)
                })
            }
        },
        computed: {
            order () {
                return this.$store.getters.order;
            },
            orderItemsInfo () {
                return this.$store.getters.orderItemsInfo;
            },
            orderValue() {
                return this.$store.getters.orderValue;
            }
        }
    }
</script>

<style scoped>

</style>