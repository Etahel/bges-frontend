<template>
    <mdb-container class="mt-5 mb-5">
        <mdb-row class="justify-content-md-center">
            <mdb-col md="auto" col="12">
                <mdb-card style="min-width: 40vw; min-height: 60vh">
                    <mdb-card-title><p class="text-center mt-3 h4">Your order</p></mdb-card-title>
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
                        <div class="float-right">
                            <ButtonWithConfrm v-if="order.status==='O'" v-bind:on-confirm="cancelOrder" size="lg">Cancel</ButtonWithConfrm>
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
    import {elementUrl, myOrdersUrl} from "../axios/axiosRoutes";
    import OrderItemsInfo from "../components/info/OrderItemsInfo";
    import ButtonWithConfrm from "../components/buttons/ButtonWithConfrm";

    export default {
        name: "OrderDetails",
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
                    orderItems: []
                },
                completeOrderItems: []
            }
        },
        methods: {
            fetchData() {
                this.$api.get(myOrdersUrl + "/" + this.$route.params.orderId).then(response => {
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
                this.$api.put(myOrdersUrl + "/" + this.$route.params.orderId + "/cancellation").then(this.fetchData);
            }
        },
        created() {
            this.fetchData();
        },
        watch: {
            $route: function () {
                    this.fetchData();
            }
        }
    }
</script>

<style scoped>

</style>