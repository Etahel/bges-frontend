<template>
    <mdb-container class="mt-5" style="min-height: 50vh; min-width: 80vw">
        <mdb-row class="justify-content-md-center">
            <mdb-col md="auto" col="12">
                <orders-table v-bind:show-user="false" v-bind:init-api-url="apiUrl" detail-route-name="MyOrder-Details"/>
            </mdb-col>
        </mdb-row>
    </mdb-container>
</template>

<script>
    import {myOrdersUrl} from "../axios/axiosRoutes"
    import {mdbCol, mdbContainer, mdbRow} from "mdbvue";
    import OrdersTable from "../components/tables/OrdersTable";

    export default {
        name: "MyOrders",
        components: {
            OrdersTable,
            mdbContainer,
            mdbRow,
            mdbCol
        },
        data: function () {
            return {
                apiUrl : myOrdersUrl
            }
        }
    }
</script>

<style scoped>

</style>