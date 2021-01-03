<template>
    <mdb-container>
        <mdb-row>
            <mdb-col style="" class="p-0">
                <div v-if="isEmployee()">
                    <mdbBtn size="sm" >Add Element</mdbBtn>
                </div>
            </mdb-col>
            <mdb-col class="p-0">
                <CategorySelect class="m-1" v-bind:model="selectedCategory" v-bind:input="(category) => onColumnFilter({columnFilters: {
                        elementCategory:category.value
                    }})"/>
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
            :totalRows="page.totalElements"
            :isLoading.sync="isLoading"
            :pagination-options="paginationOptions"
            :rows="page.content"
            :columns="columns">
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
            mdbBtn
        },
        mixins: [tableMixin],
        data() {
            return {
                apiUrl:boardGamesUrl+"/"+this.bgId+"/elements",
                selectedCategory: ElementCategories[0],
                columns: [
                    {
                        label: this.$t("Id"),
                        field: 'id',
                        hidden: true,
                        type: 'number'
                    },
                    {
                        label: this.$t("Element Name"),
                        field: 'name',
                        type: 'string'
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
                    if (value.length) {
                        params.append(key, value.toString());
                    }
                }
                this.$api.get(this.apiUrl, {
                    params: params
                }).then(response => (this.page = response.data))
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