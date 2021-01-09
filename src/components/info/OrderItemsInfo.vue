<template>
    <mdb-container>
        <mdb-row v-if="this.isDetails">
            <mdb-col col="6">
                <mdb-input class="ml-3 grey-text" readonly containerClass="text-left"
                           label="Order date" icon="calendar" type="text"
                           v-model="orderDate"/>
            </mdb-col>
            <mdb-col col="6">
                <mdb-input class="mr-3 grey-text" readOnly containerClass="text-left"
                           label="Order status" icon="check-square" type="text"
                           v-model="orderStatus"/>
            </mdb-col>
        </mdb-row>
        <mdb-row>
            <mdb-col col="6">
                <mdb-input class="ml-3  grey-text" readonly containerClass="text-left"
                           label="Total order value" icon="dollar-sign" type="text"
                           v-model="orderValue"/>
            </mdb-col>
            <mdb-col col="6">
                <mdb-input class="mr-3  grey-text" readonly containerClass="text-left"
                           label="Ordered elements count" icon="dice-d20" type="number"
                           v-model="completeElementData.length"/>
            </mdb-col>
        </mdb-row>
        <mdb-row class="h-100">
            <mdb-col>
                <mdbCard class="mb-3 mt-3 ml-1 mr-1">
                    <mdb-list-group class="m-3">
                        <mdb-list-group-item tag="a" v-for="item in completeElementData" :key="item.element.id"> {{
                            item.element.name }} : {{item.orderItem.elementsCount}}
                        </mdb-list-group-item>
                    </mdb-list-group>
                </mdbCard>
            </mdb-col>
        </mdb-row>
    </mdb-container>
</template>

<script>
    import {mdbListGroup, mdbListGroupItem, mdbInput, mdbContainer, mdbCol, mdbRow, mdbCard} from "mdbvue";

    export default {
        name: "OrderItemsInfo",
        props: {
            completeElementInfo: Array,
            orderDate: String,
            orderValue: Number,
            orderStatus: String
        },
        components: {
            mdbListGroup,
            mdbListGroupItem,
            mdbInput,
            mdbContainer,
            mdbCol,
            mdbRow,
            mdbCard
        },
        computed: {
            completeElementData() {
                return this.completeElementInfo;
            },
            isDetails() {
                return this.$route.name.includes("Details")
            },
            isSummary() {
                return this.$route.name.includes("Summary")
            },
            isCart() {
                return this.$route.name.includes("Cart")
            }
        }
    }
</script>

<style scoped>

</style>