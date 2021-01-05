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
        <div v-if="isEmployee()" slot="table-actions">
            <mdbBtn size="sm" v-on:click="openCreate">Add Board Game</mdbBtn>
            <mdbBtn size="sm" v-on:click="openTagModal">Tag Menu</mdbBtn>
        </div>
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
    <VueModal v-model="showTagsModal" title="Tags">

        <TagsTable></TagsTable>

    </VueModal>
    </div>
</template>

<script>
    import 'vue-good-table/dist/vue-good-table.css'
    import {VueGoodTable } from 'vue-good-table';
    import {boardGamesUrl, tagsUrl} from "../../axios/axiosRoutes";
    import {tableMixin} from "../mixin/TableMixin"
    import {mdbBtn} from 'mdbvue';
    import VueModal from '@kouts/vue-modal';
    import '@kouts/vue-modal/dist/vue-modal.css';
    import TagsTable from "./TagsTable";


    export default {
        name: "BoardGamesTable",
        components: {
            TagsTable,
            VueGoodTable, mdbBtn, VueModal,
        },
        mixins: [tableMixin],
        data() {
            return {
                optionList: [],
                apiUrl: boardGamesUrl,
                tagsUrl: tagsUrl,
                showTagsModal:false,
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
                            placeholder: 'Filter Title', // placeholder for filter input
                            trigger: 'keyup', //only trigger on enter not on keyup
                        },

                    },
                    {
                      label: "Year",
                      field: 'year',
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
                        sortable:false,
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
                }).then(response => (this.page = response.data)).then(() => this.$api.get(this.tagsUrl)).then(response => (this.optionList = response.data.map(tag => {
                    return tag.name
                })));

            },
            openDetails(params) {
                this.$router.push({
                    name: 'BoardGame-Details',
                    params: {
                        id: params.row.id
                    }
                });
            },
            openTagModal() {
                this.showTagsModal = true;
            },
            openCreate() {
                this.$router.push({
                    name: 'BoardGame-Create'
                });
            }
        },
        watch: {
            showTagsModal : function (value) {
                if(value === false) {
                    this.fetchData();
                }
            }
        }
    }
</script>


<style>

    .vgt-wrap {
        min-height: 50vh;
        min-width: 80vw
    }

    .vgt-responsive {
        overflow-x: visible;
    }
</style>