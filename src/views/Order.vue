<template>
    <mdb-container class="mt-5 mb-5">
        <mdb-row class="justify-content-md-center">
            <mdb-col md="auto" col="12">
                <mdb-card style="min-width: 40vw">
                    <OrderForm/>
                </mdb-card>
            </mdb-col>
        </mdb-row>
    </mdb-container>
</template>

<script>
    import { mdbContainer, mdbCard, mdbCol, mdbRow } from 'mdbvue';
    import OrderForm from "../components/forms/OrderForm";
    export default {
        name: "Order",
        components: {OrderForm,mdbContainer, mdbRow, mdbCol, mdbCard,}
    }
</script>

<style scoped>

</style>