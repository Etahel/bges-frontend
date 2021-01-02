<template>
    <div>
        <vue-good-table
                :columns="columns"
                :rows="tags"
                :pagination-options="{
    enabled: true,
    mode: 'records',
    perPage: 10,
    perPageDropdown: [10, 30, 50],
    dropdownAllowAll: false,
  }"> <template slot="table-row" slot-scope="props">
    <span v-if="props.column.field == 'actions'">
      before
    </span><span v-else>
      {{props.formattedRow[props.column.field]}}
    </span>
        </template>
        </vue-good-table>
    </div>
</template>

<script>
    import 'vue-good-table/dist/vue-good-table.css'
    import {VueGoodTable } from 'vue-good-table';
    import {tagsUrl} from "../../axios/axiosRoutes";
    export default {
        name: "TagsTable",
        components: {
            VueGoodTable
        },
        data: function () {
            return {
                tags: [],
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
                        type: 'string',
                        filterOptions: {
                            enabled: true, // enable filter for this column
                            placeholder: 'Filter This Thing', // placeholder for filter input
                            trigger: 'keyup', //only trigger on enter not on keyup
                        },
                    },
                    {
                        label: 'Actions',
                        field: 'actions',
                        html:true,
                        sortable: false
                    }

                ]
            }
        },
        methods: {
            fetchData() {
                this.$api.get(tagsUrl).then(response => (this.tags = response.data))
            }
        },
        created() {
            this.fetchData();
        }
    }
</script>

<style scoped>
    .vgt-wrap {
        min-height:0;
        min-width:0;
    }

</style>