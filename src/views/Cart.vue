<template>
    <mdb-container class="mt-5">
        <mdb-row class="justify-content-md-center">
            <mdb-col md="auto" col="12">
                <mdb-card style="min-width: 40vw; min-height: 80vh">
                    <mdb-card-body>
                       <mdb-list-group>
                        <mdb-list-group-item tag="a" v-for="item in orderItems" :key="item.element.id">    {{ item.element.name }} : {{item.orderItem.elementsCount}}</mdb-list-group-item>
                       </mdb-list-group>
                    </mdb-card-body>
                </mdb-card>
            </mdb-col>
        </mdb-row>
    </mdb-container>
</template>

<script>
    import { mdbListGroup, mdbListGroupItem, mdbContainer, mdbRow, mdbCol, mdbCard, mdbCardBody } from 'mdbvue';
    export default {
        name: "Cart",
        components: {
            mdbListGroup,
            mdbListGroupItem,
            mdbContainer, mdbRow, mdbCol, mdbCard, mdbCardBody
        },
        computed: {
            orderItems() {
                return  this.$store.getters.orderItems;
            }
        }
    }
</script>

<style scoped>

</style>