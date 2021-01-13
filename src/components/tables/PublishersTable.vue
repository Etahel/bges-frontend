<template>
    <div>
        <error-alert/>
        <form>
            <div v-if="publisherField.id" class="grey-text text-right">
                <mdb-input class="mb-0" containerClass="text-left" label="Edit Publisher" type="text"
                           v-model="publisherField.name"/>
                <div class="validate-error" v-if="!$v.publisherField.name.required && !this.formValid">Can't be empty</div>
                <div class="validate-error" v-if="!$v.publisherField.name.maxLength && !this.formValid">Must be shorter than 20 character</div>
                <mdbBtn size="sm" v-on:click="cancelEditMode">Cancel</mdbBtn>
                <mdbBtn v-on:click="editPublisher" size="sm">Save</mdbBtn>
            </div>
            <div v-else class="grey-text text-right">
                <mdb-input class="mb-0" containerClass="text-left" label="Create Publisher" type="text"
                           v-model="publisherField.name"/>
                <div class="validate-error" v-if="!$v.publisherField.name.required && !this.formValid">Can't be empty</div>
                <div class="validate-error" v-if="!$v.publisherField.name.maxLength && !this.formValid">Must be shorter than 20 character</div>
                <mdbBtn v-on:click="createPublisher" size="sm">Create</mdbBtn>
            </div>
        </form>
        <vue-good-table
                :columns="columns"
                :rows="publishers"
                :pagination-options="{
    enabled: true,
    mode: 'records',
    perPage: 5,
    perPageDropdown: [5, 10, 15],
    dropdownAllowAll: false,
  }"> <template slot="table-row" slot-scope="props">
    <span v-if="props.column.field == 'actions'">
         <div class="text-center">
         <mdb-icon v-on:click.native="setEditMode(props.row.id)" class="mr-4" icon="edit"  style="cursor: pointer" size="lg" />
             <mdb-icon v-on:click.native="deletePublisher(props.row.id)" icon="trash-alt" style="cursor: pointer" size="lg"  />
        </div>
    </span><span v-else>
      {{props.formattedRow[props.column.field]}}
    </span>
        </template>
        </vue-good-table>
    </div>
</template>

<script>
    import {VueGoodTable} from "vue-good-table";
    import {mdbBtn, mdbIcon, mdbInput} from "mdbvue";
    import ErrorAlert from "../alert/ErrorAlert";
    import {publishersUrl} from "../../axios/axiosRoutes";
    import {maxLength, required} from "vuelidate/lib/validators";

    export default {
        name: "PublishersTable",
        components: {
            VueGoodTable, mdbInput, mdbBtn, mdbIcon, ErrorAlert
        },
        data: function () {
            return {
                publishers: [],
                publisherField: {
                    id:'',
                    name:'',
                    version:''
                },
                formValid: true,
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
                        type: 'text',
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
                this.$api.get(publishersUrl).then(response => (this.publishers = response.data))
            },
            deletePublisher(id) {
                this.$api.delete(publishersUrl+"/"+id).then(this.fetchData);
            },
            setEditMode(id) {
                this.$api.get(publishersUrl+"/"+id).then(response => {
                    this.publisherField = response.data
                });
            },
            cancelEditMode() {
                this.publisherField.id = '';
                this.publisherField = '';
            },
            editPublisher(){
                if (this.$v.$invalid) {
                    this.formValid = false
                } else {
                    this.$api.patch(publishersUrl + "/" + this.publisherField.id, this.publisherField).then(this.fetchData).then(() => {
                        this.clearPublisherField()
                    })
                }
            },
            createPublisher() {
                if (this.$v.$invalid) {
                    this.formValid = false
                } else {
                    this.$api.post(publishersUrl, this.publisherField).then(this.fetchData).then(() => {
                        this.clearPublisherField()
                    })
                }
            },
            clearPublisherField() {
                this.publisherField.name='';
                this.publisherField.version='';
                this.publisherField.id='';
            }

        },
        validations: {
            publisherField: {
                name: {
                    required,
                    maxLength: maxLength(20)
                }
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