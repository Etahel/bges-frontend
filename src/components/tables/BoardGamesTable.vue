<template>
    <vue-good-table
            id="vue-table"
            mode="remote"
            @on-page-change="onPageChange"
            @on-sort-change="onSortChange"
            @on-column-filter="onColumnFilter"
            @on-per-page-change="onPerPageChange"
            :totalRows="page.totalElements"
            :isLoading.sync="isLoading"
            :pagination-options="paginationOptions"
            :rows="page.content"
            :columns="columns">
        <template slot="table-row" slot-scope="props">
    <span v-if="props.column.field == 'tags'">
      <div style="display:inline" v-for="tag in props.row.tags" :key="tag">
              <div class="badge badge-pill badge-primary" pill>{{tag}}</div>
      </div>
    </span><span v-else>
      {{props.formattedRow[props.column.field]}}
    </span>
        </template>
        <template slot="column-filter" slot-scope="props">
            <v-select id="tagSelect"
                    v-if="props.column.filterOptions.customFilter"
                    :options="optionList"
                    multiple
                    style="min-width: min-content;"
                    @input="(values) => onColumnFilter({columnFilters: {
                        tagNames:values
                    }})"/>
        </template>
    </vue-good-table>

</template>

<script>
    import 'vue-good-table/dist/vue-good-table.css'
    import {VueGoodTable } from 'vue-good-table';
    import {boardGamesUrl, tagsUrl} from "../../axios/axiosRoutes";
    import {tableMixin} from "../mixin/TableMixin"

    export default {
        name: "BoardGamesTable",
        components: {
            VueGoodTable
        },
        mixins: [tableMixin],
        data() {
            return {
                optionList: [],
                apiUrl: boardGamesUrl,
                tagsUrl: tagsUrl,
                columns: [
                    {
                        label: 'Id',
                        field: 'id',
                        hidden: true,
                        type: 'number'
                    },
                    {
                        label: 'Title',
                        field: 'title',
                        type: 'string',
                        filterOptions: {
                            enabled: true, // enable filter for this column
                            placeholder: 'Filter This Thing', // placeholder for filter input
                            trigger: 'keyup', //only trigger on enter not on keyup
                        },

                    },
                    {
                        label: 'Tags',
                        field: 'tags',
                        html:true,
                        filterOptions: {
                            enabled: true,
                            customFilter: true,
                        }
                    }
                ]
            }
        },
        methods: {
            fetchData() {
                var params = new URLSearchParams();
                params.append("page", this.serverParams.page);
                params.append("size", this.serverParams.size);
                for (const sort of this.serverParams.sort) {
                    params.append("sort", sort.field + ',' + sort.type);
                }
                for (const [key, value] of Object.entries(this.serverParams.columnFilters)) {
                    if(value.length) {
                        params.append(key,value.toString());
                    }
                }
                this.$api.get(this.apiUrl, {
                    params: params
                }).then(response => (this.page = response.data))

                this.$api.get(this.tagsUrl).then(response => (this.optionList = response.data.map(tag => {
                    return tag.name
                })))
            }
        }
    }
</script>


<style>
    #tagSelect .vs__selected-options {
        width: min-content;
    }
    .vgt-wrap {
        min-height: 50vh;
        min-width: 80vw
    }

    .vgt-responsive {
        overflow-x: visible;
    }
</style>