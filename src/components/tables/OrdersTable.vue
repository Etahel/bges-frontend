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
            <div slot="emptystate" class="text-center">
                {{this.$t('table.no_data')}}
            </div>
            <template slot="table-row" slot-scope="props">
                <span v-if="props.column.field == 'status'">
                    {{ getStatusLabel(props.row.status)}}
                 </span><span v-else-if="props.column.field == 'value'">
                    {{props.formattedRow[props.column.field]}} PLN
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
                        label: this.$t('common.date'),
                        field: 'date',
                        type: 'date',
                        dateInputFormat: 'yyyy-MM-dd HH:mm:ss',
                        dateOutputFormat: 'yyyy-MM-dd HH:mm:ss',
                        filterOptions: {
                            enabled: true,
                            placeholder:  this.$t('common.search_by', { search: 'dacie' }),
                            trigger: 'keyup',
                            dateFilter: true
                        },
                        thClass: 'text-left',
                        tdClass: 'text-left',
                    },
                    {
                        label: this.$t('order.status'),
                        field: 'status',
                        sortable: false,
                        type: 'text',
                        filterOptions: {
                            enabled: true,
                            placeholder: this.$t('common.search_by', { search: 'statusie' }),
                            trigger: 'keyup',
                            filterDropdownItems: OrderStatuses
                        },
                        thClass: 'text-left',
                        tdClass: 'text-left',
                    },
                    {
                        label: this.$t('order.lastname'),
                        field: 'lastName',
                        type: 'text',
                        filterOptions: {
                            enabled: true,
                            placeholder: this.$t('common.search_by', { search: 'nazwisku' }),
                            trigger: 'keyup',
                        },
                        thClass: 'text-left',
                        tdClass: 'text-left',
                    },
                    {
                        label: this.$t('order.username'),
                        field: 'client.username',
                        type: 'text',
                        hidden: !this.showUser,
                        filterOptions: {
                            enabled: true,
                            placeholder: this.$t('common.search_by', { search: 'nazwie użytkownika' }),
                            trigger: 'keyup',
                        },
                    },
                    {
                        label: this.$t('order.value'),
                        field: 'value',
                        type: 'number',
                        filterOptions: {
                            enabled: true,
                            valueFilter: true
                        },
                        thClass: 'text-left',
                        tdClass: 'text-left',
                    },
                ],
                dateRange: {
                    start: '',
                    end: '',
                },
                masks: {
                    input: 'YYYY-MM-DD',
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