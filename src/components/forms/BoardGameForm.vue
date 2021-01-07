<template>
    <mdb-container>
        <mdb-row class="justify-content-md-center">
            <mdb-col md="auto" col="12">
                <mdb-card style="min-width:40vw">
                    <mdb-card-body>
                        <div class="float-left m-0">
                            <mdb-icon v-on:click.native="back" icon="angle-double-left" style="cursor: pointer"
                                      size="lg"/>
                        </div>
                        <button v-on:click="close" type="button" class="close float-right" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                        <form>
                            <p class="h4 text-center">BG</p>
                            <div class="grey-text">
                                <mdb-input v-bind:readOnly=formReadOnly class="mb-0" containerClass="text-left" label="Game Title" icon="user" type="text"
                                           v-model="boardGame.title"/>
                                <div class="validate-error" v-if="!$v.boardGame.title.required && !this.formValid">Can't be empty</div>
                                <div class="validate-error" v-if="!$v.boardGame.title.maxLength && !this.formValid">Must be shorter than 50 character</div>
                                <mdb-input v-bind:readOnly=formReadOnly class="mb-0" containerClass="text-left" v-bind:label="this.$t('boardgame.year')" icon="user" type="number"
                                           v-model="boardGame.year"/>
                                <div class="validate-error" v-if="!$v.boardGame.year.integer && !this.formValid">Not an integer</div>
                                <div class="validate-error" v-if="!$v.boardGame.year.between && !this.formValid">Must be a correct year</div>
                                <mdb-input v-bind:readOnly=formReadOnly type="textarea" v-model="boardGame.description"  label="Icon Prefix" icon="pencil" />
                                <p class="h5 text-left">Tags:</p>
                                <div v-if="formReadOnly">
                                    <div style="display:inline" v-for="tag in boardGame.tags" :key="tag">
                                      <div class="badge badge-pill badge-primary" pill>{{tag}}</div>
                                    </div>
                                </div>
                                <div v-else>
                                    <v-select v-model="boardGame.tags"
                                              :options="tagList"
                                              multiple
                                              style="min-width: min-content;"
                                              @input="(values) => {
                                                  this.boardGame.tags = values
                                              }"/>
                                </div>
                                <div class="mt-3" v-if="isDetailsMode && isEmployee() && !isEditMode">
                                    <mdbBtn class="float-right" v-on:click="edit" size="sm">Edit</mdbBtn>
                                </div>
                                <div class="mt-3" v-else-if="isDetailsMode && isEmployee() && isEditMode">
                                <ButtonWithConfrm v-bind:on-confirm="this.delete" class="mt-3 float-left" color="danger" size="sm">Delete</ButtonWithConfrm>
                                <mdb-btn-group class="mt-3 float-right" size="sm">
                                    <mdb-btn v-on:click="cancelEdit" >Cancel</mdb-btn>
                                    <mdb-btn v-on:click="update" >Save</mdb-btn>
                                </mdb-btn-group>
                                </div>
                                <div class="mt-2 text-right" v-else-if="isCreateMode && isEmployee()">
                                    <mdbBtn v-on:click="save" size="sm">Save</mdbBtn>
                                </div>
                            </div>
                        </form>

                    </mdb-card-body>
                </mdb-card>
            </mdb-col>
        </mdb-row>
        <mdb-row v-if="isDetailsMode && boardGame.id" class="justify-content-md-center mt-3">
            <mdb-col md="auto" col="12">
                <mdb-card style="min-width: 30vw">
                    <ElementsTable v-bind:bg-id="boardGame.id"></ElementsTable>
                </mdb-card>
            </mdb-col>
        </mdb-row>
    </mdb-container>
</template>

<script>
    import {mdbContainer, mdbIcon, mdbRow, mdbBtn, mdbCol, mdbCard, mdbCardBody, mdbInput, mdbBtnGroup} from 'mdbvue';
    import {formMixin} from "../mixin/FormMixin"
    import {tagsUrl, boardGamesUrl} from "../../axios/axiosRoutes";
    import ElementsTable from "../tables/ElementsTable";
    import ButtonWithConfrm from "../buttons/ButtonWithConfrm";
    import {required, maxLength, between, integer} from 'vuelidate/lib/validators'

    export default {
        name: "BoardGameForm",
        mixins:[formMixin],
        components: {
            ButtonWithConfrm,
            ElementsTable,
            mdbContainer,
            mdbRow,
            mdbCol,
            mdbBtn,
            mdbInput,
            mdbCard,
            mdbCardBody,
            mdbBtnGroup,
            mdbIcon
        },
        data () {
            return {
                formValid: true,
                boardGame: {
                    title:'',
                    description:'',
                    year:'',
                    tags:[]
                },
                tagList: []
            }
        },
        methods: {
            fetchData() {
                this.$api.get(boardGamesUrl + "/" + this.$route.params.id).then(response => { this.boardGame = response.data
                })
            },
            fetchTags() {
                this.$api.get(tagsUrl).then(response => (this.tagList = response.data.map(tag => {
                return tag.name
            })));
            },
            edit() {
                this.fetchTags();
                this.editMode = true;
            },
            save(){
                if (this.$v.$invalid) {
                    this.formValid = false
                } else {
                this.$api.post(boardGamesUrl,this.boardGame).then((response) => {
                    this.$router.push({
                        name: 'BoardGame-Details',
                        params: {
                            id: response.data.id
                        }
                    })
                })
                }
            },
            update() {
                if (this.$v.$invalid) {
                    this.formValid = false
                } else {
                    this.$api.put(boardGamesUrl + "/" + this.$route.params.id, this.boardGame).then(this.fetchData).then(this.cancelEdit);
                }
            },
            back() {
                this.$router.push({
                    name: 'Boardgames',
                })
            },
            close() {
                this.$router.go(-1);
            },
            delete() {
                this.$api.delete(boardGamesUrl + "/" + this.$route.params.id).then(this.close);
            }
        },
        created() {
            if(this.isDetailsMode) {
                this.fetchData();
            }
            if(this.isCreateMode) {
               this.fetchTags();
            }
        },
        validations: {
            boardGame: {
                title: {
                    required,
                    maxLength: maxLength(50)
                },
                year: {
                    integer,
                    between: between(1900,2050)
                }
            }
        }
    }
</script>

<style scoped>

</style>