<template>
    <mdb-container>
        <mdb-row>
            <mdb-col style="" class="p-0 mb-3">
                <div v-if="isEmployee">
                    <mdbBtn v-on:click="openCreateElement" size="sm" >{{this.$t('element.buttons.add')}}</mdbBtn>
                </div>
            </mdb-col>
            <mdb-col class="p-0">
                <CategorySelect class="m-1" v-bind:categoryCode="selectedCategory" v-bind:input="(category) => {
                    this.selectedCategory = category.value;
                    onColumnFilter({columnFilters: {
                        elementCategory:category.value
                    }})
                    }"/>
            </mdb-col>
        </mdb-row>
            <mdb-row>
                <mdb-col class="p-0">
    <vue-good-table style="min-width: 60vw"
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
             <span v-if="props.column.field === 'photoUrl'">
                                    <img v-if="props.row.photoUrl" class="mt-3 mb-3 text-center" v-bind:src=props.row.photoUrl alt="Image" width="200" height="200">
                                    <img v-else class="mt-3 mb-3 text-center" src="@/assets/noImage.png" alt="Image" width="200" height="200">
             </span><span v-else-if="props.column.field === 'description'">
            <div style="  word-wrap: break-word; width: 30vw"> {{props.row.description}}</div>
             </span><span v-else>
      {{props.formattedRow[props.column.field]}}
    </span>
        </template>
    </vue-good-table>
            </mdb-col>
        </mdb-row>
    </mdb-container>
</template>

<script>
    import {VueGoodTable} from "vue-good-table";
    import {tableMixin} from "../mixin/TableMixin";
    import {boardGamesUrl} from "../../axios/axiosRoutes";
    import ElementCategories from "../../definitions/ElementCategories.json";
    import {mdbCol, mdbBtn, mdbContainer, mdbRow} from "mdbvue";
    import CategorySelect from "../select/CategorySelect";

    export default {
        name: "ElementsTable",
        props: {
            bgId:Number
        },
        components: {
            CategorySelect,
            VueGoodTable,
            mdbContainer,
            mdbRow,
            mdbCol,
            mdbBtn,
        },
        mixins: [tableMixin],
        data() {
            return {
                apiUrl:boardGamesUrl+"/"+this.bgId+"/elements",
                selectedCategory: ElementCategories[0].value,
                columns: [
                    {
                        label: this.$t("Id"),
                        field: 'id',
                        hidden: true,
                        type: 'number'
                    },
                    {
                        label: this.$t("common.photo"),
                        field: 'photoUrl',
                        width: '150px',
                        sortable: false
                    },
                    {
                        label: this.$t("element.name"),
                        field: 'name',
                        type: 'text',
                        tdClass: 'text-center h4 ',
                        filterOptions: {
                            enabled: true,
                            placeholder:  this.$t('common.search_by', { search: 'nazwie' }),
                            trigger: 'keyup',
                        },
                    },
                    {
                        label: this.$t("common.description"),
                        field: 'description',
                        type: 'text',
                        width: '30vw',
                        sortable: false,
                        filterOptions: {
                            enabled: true,
                            placeholder: this.$t('common.search_by', { search: 'opisie' }),
                            trigger: 'keyup',
                        },
                    }
                ],
                serverParams: {
                    columnFilters: {
                        elementCategory:ElementCategories[0].value
                    }
                }
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
                    if (value.length) {
                        params.append(key, value.toString());
                    }
                }
                this.$api.get(this.apiUrl, {
                    params: params
                }).then(response => (this.page = response.data))
            },
            openDetails(params) {
                this.$router.push({
                    name: 'Element-Details',
                    params: {
                        boardGameId: this.bgId,
                        elementId: params.row.id
                    }
                });
            },
            openCreateElement() {
                this.$router.push({
                    name: 'Element-Create',
                    params: {
                        boardGameId: this.bgId,
                    }
                });
            }
        }

    }
</script>

<style scoped>
    .vs__selected-options {
        width: auto;
    }

    .vgt-wrap {
        min-height:0;
        min-width:0;
    }
</style>