<template>
    <mdb-container>
        <mdb-row v-if="this.isDetails">
            <mdb-col col="6">
                <mdb-input class="ml-3 grey-text" readonly containerClass="text-left"
                           v-bind:label="$t('common.date')" icon="calendar" type="text"
                           v-model="orderDate"/>
            </mdb-col>
            <mdb-col col="6">
                <mdb-input class="mr-3 grey-text" readOnly containerClass="text-left"
                           v-bind:label="$t('order.status')" icon="check-square" type="text"
                           v-model="orderStatusLabel"/>
            </mdb-col>
        </mdb-row>
        <mdb-row>
            <mdb-col col="6">
                <mdb-input class="ml-3  grey-text" readonly containerClass="text-left"
                           v-bind:label="$t('order.value')" icon="dollar-sign" type="text"
                           v-model="orderValueWithCurrency"/>
            </mdb-col>
            <mdb-col col="6">
                <mdb-input class="mr-3  grey-text" readonly containerClass="text-left"
                           v-bind:label="$t('order.total_number')" icon="box-open" type="number"
                           v-model="totalElementsCount"/>
            </mdb-col>
        </mdb-row>
        <mdb-row class="h-100">
            <mdb-col>
                <mdbCard class="mb-3 mt-3 ml-1 mr-1">
                    <mdb-tbl hover sm>
                        <mdb-tbl-head >
                            <tr>
                                <th></th>
                                <th>{{$t('common.name')}}</th>
                                <th>{{$t('common.game')}}</th>
                                <th>{{$t('common.category')}}</th>
                                <th v-if="isSummary || isCart">{{$t('common.price')}}</th>
                                <th>{{$t('common.quantity')}}</th>
                                <th v-if="isCart"></th>
                            </tr>
                        </mdb-tbl-head>
                        <mdb-tbl-body>
                            <tr style="cursor: pointer" v-on:click="openElementDetails(item)" v-for="(item,index) in completeElementData" :key="item.element.id">
                                <th> <mdb-icon class="ml-4" icon="dice-d20" /></th>
                                <td> {{item.element.name}}</td>
                                <td> {{item.element.boardGame.title}}</td>
                                <td> {{getCategoryName(item.element.elementCategory)}}</td>
                                <td v-if="isSummary || isCart"> {{item.element.price}} PLN</td>
                                <td> {{item.orderItem.elementsCount}}</td>
                                <td v-if="isCart"><mdb-icon v-on:click.native.stop="removeItem(index)" icon="minus-square"
                                                    style="cursor: pointer"
                                                    size="lg"/></td>
                            </tr>
                        </mdb-tbl-body>
                    </mdb-tbl>
                </mdbCard>
            </mdb-col>
        </mdb-row>
    </mdb-container>
</template>

<script>
    import {mdbInput, mdbContainer, mdbCol, mdbRow, mdbCard,mdbTbl, mdbTblHead, mdbTblBody, mdbIcon } from "mdbvue";
    import ElementCategories from "../../definitions/ElementCategories";
    import {orderMixin} from "../mixin/OrderMixin";

    export default {
        name: "OrderItemsInfo",
        props: {
            completeElementInfo: Array,
            orderDate: String,
            orderValue: Number,
            orderStatus: String
        },
        mixins: [orderMixin],
        components: {
            mdbInput,
            mdbContainer,
            mdbCol,
            mdbRow,
            mdbCard,
            mdbTbl,
            mdbTblHead,
            mdbTblBody,
            mdbIcon
        },
        data: function () {
            return {
                orderStatusLabel: this.getStatusLabel(this.props.orderStatus)
            }
        },
        methods: {
            openElementDetails(item) {
                this.$router.push({
                    name: 'Element-Details',
                    params: {
                        elementId: item.element.id,
                        boardGameId: item.element.boardGame.id
                    }
                });
            },
            removeItem(index) {
                this.$emit('itemRemoved', index)
            },
            getCategoryName(categoryCode) {
                var result = ElementCategories.find(obj => {
                    return obj.value === categoryCode
                })
                if (result === undefined) {
                    return ''
                } else {
                    return this.$t(result.label);
                }
            },
        },
        computed: {
            completeElementData() {
                return this.completeElementInfo;
            },
            totalElementsCount() {
                    var count = 0;
                    for (const item of this.completeElementData) {
                        count += item.orderItem.elementsCount
                    }
                  return count;
            },
            isDetails() {
                return this.$route.name.includes("Details")
            },
            isSummary() {
                return this.$route.name.includes("Summary")
            },
            isCart() {
                return this.$route.name.includes("Cart")
            },
            orderValueWithCurrency() {
                return this.orderValue + " PLN"
            },
        },
        watch: {
            orderStatus: function (value) {
                this.orderStatusLabel = this.getStatusLabel(value);
            }
        }
    }
</script>

<style scoped>

</style>