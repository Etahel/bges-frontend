<template>
    <div>
        <error-alert/>
        <form>
            <div v-if="tagField.id" class="grey-text text-right">
                <mdb-input class="mb-0" containerClass="text-left" label="Edit Tag" type="text"
                           v-model="tagField.name"/>
                <required-validation-message v-bind:visible="!$v.tagField.name.required && !this.formValid"/>
                <max-length-validation-message v-bind:visible="!$v.tagField.name.maxLength && !this.formValid" max-length="30" />
                <mdbBtn size="sm" v-on:click="cancelEditMode">Cancel</mdbBtn>
                <mdbBtn v-on:click="editTag" size="sm">Save</mdbBtn>
            </div>
            <div v-else class="grey-text text-right">
                <mdb-input class="mb-0" containerClass="text-left" label="Create Tag" type="text"
                           v-model="tagField.name"/>
                <required-validation-message v-bind:visible="!$v.tagField.name.required && !this.formValid"/>
                <max-length-validation-message v-bind:visible="!$v.tagField.name.maxLength && !this.formValid" max-length="30" />
                <mdbBtn v-on:click="createTag" size="sm">Create</mdbBtn>
            </div>
        </form>
        <vue-good-table
                :columns="columns"
                :rows="tags"
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
             <mdb-icon v-on:click.native="deleteTag(props.row.id)" icon="trash-alt" style="cursor: pointer" size="lg"  />
        </div>
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
    import {mdbBtn, mdbInput, mdbIcon} from "mdbvue";
    import ErrorAlert from "../../components/alert/ErrorAlert";
    import {required, maxLength} from 'vuelidate/lib/validators'
    import RequiredValidationMessage from "../forms/validations/RequiredValidationMessage";
    import MaxLengthValidationMessage from "../forms/validations/MaxLengthValidationMessage";
    export default {
        name: "TagsTable",
        components: {
            MaxLengthValidationMessage,
            RequiredValidationMessage,
            VueGoodTable, mdbInput, mdbBtn, mdbIcon, ErrorAlert
        },
        data: function () {
            return {
                tags: [],
                tagField: {
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
                this.$api.get(tagsUrl).then(response => (this.tags = response.data))
            },
            deleteTag(id) {
                this.$api.delete(tagsUrl+"/"+id).then(this.fetchData);
            },
            setEditMode(id) {
                this.$api.get(tagsUrl+"/"+id).then(response => {
                    this.tagField = response.data
                });
            },
            cancelEditMode() {
                this.tagField.id = '';
                this.tagField = '';
            },
            editTag(){
                if (this.$v.$invalid) {
                    this.formValid = false
                } else {
                    this.$api.patch(tagsUrl + "/" + this.tagField.id, this.tagField).then(this.fetchData).then(() => {
                        this.clearTagField()
                    })
                }
            },
            createTag() {
                if (this.$v.$invalid) {
                    this.formValid = false
                } else {
                    this.$api.post(tagsUrl, this.tagField).then(this.fetchData).then(() => {
                        this.clearTagField();
                    })
                }
            },
            clearTagField() {
                this.tagField.name='';
                this.tagField.version='';
                this.tagField.id='';
                this.formValid=true;
            }

        },
        validations: {
            tagField: {
                name: {
                    required,
                    maxLength: maxLength(30)
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