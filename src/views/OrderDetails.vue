<template>
    <mdb-container class="mt-5 mb-5">
        <mdb-row class="justify-content-md-center">
            <mdb-col md="auto" col="12">
                <mdb-card style="min-width: 40vw; min-height: 60vh">
                    <mdb-card-title>
                        <button v-on:click="close" type="button" class="m-3 close float-right" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                        <p class="text-center mt-3 h4">Your order</p></mdb-card-title>
                    <mdb-card-body>
                        <mdb-tabs color="indigo" justify
                                  default
                                  :active="0"
                                  :links="[
                                 { text: 'Order Info'},
                                 { text: 'Client Data' }]">
                            <template :slot="'Order Info'">
                                <OrderItemsInfo v-bind:order-date="order.date" v-bind:order-status="order.status" v-bind:order-value="order.value" v-bind:complete-element-info="completeOrderItems"/>
                            </template>
                            <template :slot="'Client Data'">
                                <OrderClientInfo  v-bind:order="order"/>
                            </template>
                        </mdb-tabs>
                    </mdb-card-body>
                    <mdb-card-footer>
                        <div v-if="order.status==='O'" class="w-100">
                            <ButtonWithConfrm style="float:right" v-if="isEmployee" v-bind:on-confirm="finalizeOrder" size="lg">Finalize</ButtonWithConfrm>
                            <ButtonWithConfrm style="float:right" v-if="isClient || isEmployee" v-bind:on-confirm="cancelOrder" size="lg">Cancel</ButtonWithConfrm>
                        </div>
                    </mdb-card-footer>
                </mdb-card>
            </mdb-col>
        </mdb-row>
    </mdb-container>
</template>

<script>
    import OrderClientInfo from "../components/info/OrderClientInfo";
    import {
        mdbCard,
        mdbCardBody, mdbCardFooter,
        mdbCardTitle,
        mdbCol,
        mdbContainer,
        mdbRow,
        mdbTabs,
    } from "mdbvue";
    import {elementUrl} from "../axios/axiosRoutes";
    import OrderItemsInfo from "../components/info/OrderItemsInfo";
    import ButtonWithConfrm from "../components/buttons/ButtonWithConfrm";

    export default {
        name: "OrderDetails",
        props: {
            orderUrl: String
        },
        components: {
            ButtonWithConfrm,
            OrderItemsInfo,
            OrderClientInfo,
            mdbContainer,
            mdbCard,
            mdbCol,
            mdbRow,
            mdbTabs,
            mdbCardBody,
            mdbCardTitle,
            mdbCardFooter
        },
        data: function () {
            return {
                order: {
                    firstName: '',
                    lastName: '',
                    address: {
                        city: '',
                        street: '',
                        houseNo: '',
                        flatNo: '',
                        postalCode: ''
                    },
                    client: {
                        username:''
                    },
                    orderItems: []
                },
                completeOrderItems: []
            }
        },
        methods: {
            fetchData() {
                this.$api.get(this.orderUrl + "/" + this.$route.params.orderId).then(response => {
                    this.order = response.data
                }).then(() => {
                    const params = {
                        ids: this.order.orderItems.map((orderItem) => {return orderItem.elementId}).toString(),
                    };

                    this.$api.get(elementUrl, {
                        params: params
                    }).then(response => {this.populateCompleteOrderItems(response.data)})
                })

            },
            populateCompleteOrderItems(elementList) {
                this.completeOrderItems = [];
                for (const orderItem of this.order.orderItems) {
                    var element = elementList.find(obj => {
                        return obj.id === orderItem.elementId
                    });
                    
                        this.completeOrderItems.push({
                            orderItem: orderItem,
                            element: element
                        });
                    }
             },
            cancelOrder() {
                this.$api.put(this.orderUrl + "/" + this.$route.params.orderId + "/cancellation").then(this.fetchData);
            },
            finalizeOrder() {
                this.$api.put(this.orderUrl + "/" + this.$route.params.orderId).then(this.fetchData);
            },
            close() {
                if(this.isClientDetails) {
                    this.$router.push({name: 'MyOrders'})
                } else {
                    this.$router.push({name: 'Orders'})
                }
            }
        },
        created() {
            this.fetchData();
        },
        watch: {
            $route: function () {
                    this.fetchData();
            }
        },
        computed: {
            isClientDetails() {
                return this.$route.name.includes("MyOrder")
            }
        }
    }
</script>

<style scoped>

</style>