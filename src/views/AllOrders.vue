<template>
    <mdb-container class="mt-5"   style="min-height: 50vh; min-width: 80vw">
        <mdb-row class="justify-content-md-center">
            <mdb-col md="auto" col="12">
                <orders-table v-bind:init-api-url="apiUrl" detail-route-name="Order-Details"/>
            </mdb-col>
        </mdb-row>
    </mdb-container>
</template>

<script>
    import OrdersTable from "../components/tables/OrdersTable";
    import {mdbCol, mdbContainer, mdbRow} from "mdbvue";
    import {ordersUrl} from "../axios/axiosRoutes";

    export default {
        name: "AllOrders",
        components: {
            OrdersTable,
            mdbContainer,
            mdbRow,
            mdbCol
        },
        data: function () {
            return {
                apiUrl : ordersUrl
            }
        }
    }
</script>

<style scoped>

</style>