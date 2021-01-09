<template>
    <div>
        <vue-good-table
                id="vue-table"
                mode="remote"
                @on-page-change="onPageChange"
                @on-sort-change="onSortChange"
                @on-column-filter="onColumnFilter"
                @on-per-page-change="onPerPageChange"
                @on-row-click="openDetails"
                :totalRows="page.totalElements"
                :isLoading.sync="isLoading"
                :pagination-options="paginationOptions"
                :rows="page.content"
                :columns="columns">
            <template slot="table-row" slot-scope="props">
                <span v-if="props.column.field == 'status'">
                    {{ getStatusLabel(props.row.status)}}
                 </span><span v-else>
                    {{props.formattedRow[props.column.field]}}
                 </span>
            </template>
        </vue-good-table>
    </div>
</template>

<script>
    import OrderStatuses from "../../definitions/OrderStatus"
    import {VueGoodTable} from "vue-good-table";
    import {tableMixin} from "../mixin/TableMixin";
    import {orderMixin} from "../mixin/OrderMixin";

    export default {
        name: "OrdersTable",
        components: {
            VueGoodTable,
        },
        props: {
            initApiUrl: String
        },
        mixins: [tableMixin, orderMixin],
        data: function () {
            return {
                apiUrl: this.initApiUrl,
                columns: [
                    {
                        label: "Id",
                        field: 'id',
                        hidden: true,
                        type: 'number'
                    },
                    {
                        label: "Date",
                        field: 'date',
                        type: 'date',
                        dateInputFormat: 'yyyy-MM-dd HH:mm:ss', // expects 2018-03-16
                        dateOutputFormat: 'yyyy-MM-dd HH:mm:ss', // outputs Mar 16th 2018
                        filterOptions: {
                            enabled: true, // enable filter for this column
                            placeholder: 'Filter Date', // placeholder for filter input
                            trigger: 'keyup', //only trigger on enter not on keyup
                        },
                    },
                    {
                        label: "Status",
                        field: 'status',
                        type: 'text',
                        filterOptions: {
                            enabled: true, // enable filter for this column
                            placeholder: 'Filter status', // placeholder for filter input
                            trigger: 'keyup', //only trigger on enter not on keyup
                            filterDropdownItems: OrderStatuses
                        },
                    },
                    {
                        label: "Client last name",
                        field: 'lastName',
                        type: 'text',
                        filterOptions: {
                            enabled: true, // enable filter for this column
                            placeholder: 'Filter last name', // placeholder for filter input
                            trigger: 'keyup', //only trigger on enter not on keyup
                        },
                    },
                    {
                        label: "Value",
                        field: 'value',
                        type: 'number',
                        filterOptions: {
                            enabled: true, // enable filter for this column
                            placeholder: 'Filter Value', // placeholder for filter input
                            trigger: 'keyup', //only trigger on enter not on keyup
                        },
                    },
                ]
            }
        },
        methods: {
            openDetails(params) {
                this.$router.push({
                    name: 'Order-Details',
                    params: {
                        orderId: params.row.id
                    }
                });
            },
        }
    }
</script>

<style scoped>

</style>