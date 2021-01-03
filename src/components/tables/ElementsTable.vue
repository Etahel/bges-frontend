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
    </vue-good-table>
</template>

<script>
    import {VueGoodTable} from "vue-good-table";
    import {tableMixin} from "../mixin/TableMixin";
    import {boardGamesUrl} from "../../axios/axiosRoutes";


    export default {
        name: "ElementsTable",
        props: {
            bgId:Number
        },
        components: {VueGoodTable},
        mixins: [tableMixin],
        data() {
            return {
                apiUrl:boardGamesUrl+"/"+this.bgId+"/elements",
                columns: [
                    {
                        label: 'Id',
                        field: 'id',
                        hidden: true,
                        type: 'number'
                    },
                    {
                        label: 'Name',
                        field: 'name',
                        type: 'string'
                    }
                ]
            }
        }

    }
</script>

<style scoped>
    .vgt-wrap {
        min-height:0;
        min-width:0;
    }
</style>