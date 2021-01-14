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
            <template slot="column-filter" slot-scope="props">
                <v-date-picker @input="onDateChange" :model-config="modelConfig"  v-if="props.column.filterOptions.dateFilter" v-model="dateRange" :masks="masks" is-range>
                    <template v-slot="{ inputValue, inputEvents }">
                        <div style="" class="flex items-center align-text-bottom">
                                <input
                                        :value="inputValue.start"
                                        v-on="inputEvents.start"
                                        placeholder="from"
                                        class="vgt-input border rounded focus:outline-none focus:border-indigo-300"
                                />
                                <input
                                        :value="inputValue.end"
                                        v-on="inputEvents.end"
                                        placeholder="to"
                                        class="vgt-input border rounded focus:outline-none focus:border-indigo-300"
                                />
                        </div>
                    </template>
                </v-date-picker>

                <div v-else-if="props.column.filterOptions.valueFilter" style="" class="flex items-center align-text-bottom">
                    <input
                            v-model="valueRange.min"
                            placeholder="min"
                            type="number"
                            min="0"
                            step="0.01"
                            class="vgt-input border rounded focus:outline-none focus:border-indigo-300"
                    />
                    <input
                            v-model="valueRange.max"
                            placeholder="max"
                            type="number"
                            min="0"
                            step="0.01"
                            class="vgt-input border rounded focus:outline-none focus:border-indigo-300"
                    />
                </div>

            </template>
        </vue-good-table>
    </div>
</template>

<script>
    import OrderStatuses from "../../definitions/OrderStatus"
    import {VueGoodTable} from "vue-good-table";
    import {tableMixin} from "../mixin/TableMixin";
    import {orderMixin} from "../mixin/OrderMixin";
    import { debounce } from "debounce";

    export default {
        name: "OrdersTable",
        components: {
            VueGoodTable,
        },
        props: {
            initApiUrl: String,
            detailRouteName:String,
            showUser : Boolean
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
                            dateFilter: true
                        }
                    },
                    {
                        label: "Status",
                        field: 'status',
                        sortable: false,
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
                        label: "User",
                        field: 'client.username',
                        type: 'text',
                        hidden: !this.showUser,
                        filterOptions: {
                            enabled: true, // enable filter for this column
                            placeholder: 'Filter Value', // placeholder for filter input
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
                            valueFilter: true
                        },
                    },
                ],
                dateRange: {
                    start: '',
                    end: '',
                },
                masks: {
                    input: 'YYYY-MM-DD h:mm A',
                },
                modelConfig: {
                    type: 'string',
                    mask: 'YYYY-MM-DD', // Uses 'iso' if missing
                },
                valueRange: {
                    min: '',
                    max: ''
                },


            }
        },
        methods: {
            openDetails(params) {
                this.$router.push({
                    name: this.detailRouteName,
                    params: {
                        orderId: params.row.id
                    }
                });
            },
            onDateChange() {
                if (this.dateRange) {
                    this.onColumnFilter({
                        columnFilters: {
                            dateStart: this.dateRange.start,
                            dateEnd: this.dateRange.end
                        }
                    })
                } else {
                    this.onColumnFilter({
                        columnFilters: {
                            dateStart: '',
                            dateEnd: ''
                        }
                    })
                }
            }
        },
        watch: {
            valueRange: {
                handler: debounce(function () {
                    this.onColumnFilter({
                        columnFilters: {
                            minValue: this.valueRange.min,
                            maxValue: this.valueRange.max
                        }
                    })
                }, 500),
                deep: true
            }
        },

    }
</script>

<style scoped>

</style>