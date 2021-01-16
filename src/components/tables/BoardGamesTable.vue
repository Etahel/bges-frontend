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
        <div v-if="isEmployee" slot="table-actions">
            <mdbBtn size="sm" v-on:click="openCreate">{{this.$t('boardgame.buttons.add')}}</mdbBtn>
            <mdbBtn size="sm" v-on:click="openPublisherModal">{{this.$t('boardgame.buttons.publisher_menu')}}</mdbBtn>
            <mdbBtn size="sm" v-on:click="openTagModal">{{this.$t('boardgame.buttons.tag_menu')}}</mdbBtn>
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
                    v-if="props.column.filterOptions.tagFilter"
                    :options="tagList"
                    multiple
                    placeholder="Tagi"
                    style="min-width: 100px; background:white"
                    @input="(values) => onColumnFilter({columnFilters: {
                        tagNames:values
                    }})"/>
        </template>
    </vue-good-table>
    <VueModal v-model="showTagsModal" title="Tags">
        <TagsTable/>
    </VueModal>
        <VueModal v-model="showPublishersModal" title="Publishers">
            <PublishersTable/>
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
    import PublishersTable from "./PublishersTable";


    export default {
        name: "BoardGamesTable",
        components: {
            PublishersTable,
            TagsTable,
            VueGoodTable, mdbBtn, VueModal,
        },
        mixins: [tableMixin],
        data() {
            return {
                tagList: [],
                publishersList: [],
                apiUrl: boardGamesUrl,
                tagsUrl: tagsUrl,
                showTagsModal:false,
                showPublishersModal:false,
                columns: [
                    {
                        label:  this.$t("Id"),
                        field: 'id',
                        hidden: true,
                        type: 'number'
                    },
                    {
                        label: this.$t("common.title"),
                        field: 'title',
                        type: 'text',
                        filterOptions: {
                            enabled: true,
                            placeholder: this.$t('common.search_by', { search: 'tytule' }),
                            trigger: 'keyup',
                        },

                    },
                    {
                      label: this.$t("boardgame.year"),
                      field: 'year',
                      type: 'number',
                      thClass: 'text-left',
                      tdClass: 'text-left',
                      filterOptions: {
                            enabled: true,
                            placeholder: this.$t('common.search_by', { search: 'roku wydania' }),
                            trigger: 'keyup',
                        },
                    },
                    {
                        label: this.$t("boardgame.min_players"),
                        field: 'minPlayers',
                        type: 'number',
                        thClass: 'text-left',
                        tdClass: 'text-left',
                        filterOptions: {
                            enabled: true,
                            placeholder: this.$t('common.search_by', { search: 'min. graczy' }),
                            trigger: 'keyup',
                        },
                    },
                    {
                        label: this.$t("boardgame.max_players"),
                        field: 'maxPlayers',
                        type: 'number',
                        thClass: 'text-left',
                        tdClass: 'text-left',
                        filterOptions: {
                            enabled: true,
                            placeholder: this.$t('common.search_by', { search: 'max. graczy' }),
                            trigger: 'keyup',
                        },
                    },
                    {
                        label: this.$t("boardgame.author"),
                        field: 'author',
                        type: 'text',
                        filterOptions: {
                            enabled: true,
                            placeholder: this.$t('common.search_by', { search: 'autorze' }),
                            trigger: 'keyup',
                        },

                    },
                    {
                        label: this.$t("boardgame.publisher"),
                        field: 'publisher',
                        type: 'text',
                        filterOptions: {
                            enabled: true,
                            placeholder: this.$t('common.search_by', { search: 'wydawcy' })
                        }

                    },
                    {
                        label: this.$t("boardgame.tags"),
                        field: 'tags',
                        html:true,
                        sortable:false,
                        filterOptions: {
                            enabled: true,
                            tagFilter: true,
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
                }).then(response => (this.page = response.data)).then(() => this.$api.get(this.tagsUrl)).then(response => (this.tagList = response.data.map(tag => {
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
            openPublisherModal() {
                this.showPublishersModal = true;
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
            },
            showPublishersModal : function (value) {
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