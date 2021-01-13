<template>
    <mdb-container>
        <mdb-row class="justify-content-md-center">
            <mdb-col md="auto">
                <mdb-card style="min-width:40vw; ">
                    <mdb-card-body>
                        <mdb-container>
                            <mdb-row>
                                <mdb-col>
                                    <div class="float-left m-0">
                                        <mdb-icon v-on:click.native="back" icon="angle-double-left"
                                                  style="cursor: pointer"
                                                  size="lg"/>
                                    </div>
                                    <button v-on:click="close" type="button" class="close float-right"
                                            aria-label="Close">
                                        <span aria-hidden="true">×</span>
                                    </button>
                                    <p class="h4 text-center">BG</p>
                                </mdb-col>
                            </mdb-row>
                            <mdb-row>
                                <mdb-col col="6" class="grey-text">
                                    <mdb-input  v-bind:readOnly=formReadOnly class="mb-3" containerClass="text-left"
                                               label="Game Title" icon="chess-board" type="text"
                                               v-model="boardGame.title"/>
                                    <div class="validate-error" v-if="!$v.boardGame.title.required && !this.formValid">
                                        Can't be empty
                                    </div>
                                    <div class="validate-error" v-if="!$v.boardGame.title.maxLength && !this.formValid">
                                        Must be shorter than 50 character
                                    </div>
                                    <mdb-input v-if="formReadOnly"  v-bind:readOnly=formReadOnly class="mb-3" containerClass="text-left"
                                                label="Publisher" icon="book-open" type="text"
                                                v-model="boardGame.publisher"/>
                                    <div v-else>
                                        <mdb-icon style="font-size: 1.75rem" class="d-inline-block ml-0 mr-2"  icon="book-open" />
                                        <v-select  v-model="boardGame.publisher"
                                                  :options="publishersList"
                                                  placeholder="Publisher"
                                                   class="d-inline-block"
                                                  style="width: 80%"
                                        ></v-select>
                                    </div>
                                    <mdb-input  v-bind:readOnly=formReadOnly class="mb-3" containerClass="text-left"
                                                label="Author" icon="user-edit" type="text"
                                                v-model="boardGame.author"/>
                                    <mdb-input  v-bind:readOnly=formReadOnly containerClass="text-left"
                                                v-bind:label="this.$t('boardgame.year')" icon="calendar" type="number"
                                                v-model="boardGame.year"/>
                                    <div class="validate-error" v-if="!$v.boardGame.year.integer && !this.formValid">Not
                                        an integer
                                    </div>
                                    <div class="validate-error" v-if="!$v.boardGame.year.between && !this.formValid">
                                        Must be a correct year
                                    </div>
                                </mdb-col>
                                <mdb-col v-if="formReadOnly" col="6" class="d-flex justify-content-center" >
                                    <img v-if="boardGame.photoUrl" class="mt-3 mb-3 text-center" v-bind:src=this.boardGame.photoUrl alt="Image" width="250" height="250">
                                    <img v-else class="mt-3 mb-3 text-center" src="@/assets/noImage.png" alt="Image" width="250" height="250">
                                </mdb-col>
                                <mdb-col v-else col="6">
                                    <mdb-input style="height: min-content" v-bind:readOnly=formReadOnly type="textarea"
                                               v-model="boardGame.photoUrl" label="Photo url" icon="pencil" :rows="10"/>
                                </mdb-col>
                            </mdb-row>
                            <mdb-row>
                                <mdb-col class="grey-text">
                                    <mdb-input style="height: min-content" v-bind:readOnly=formReadOnly type="textarea"
                                               v-model="boardGame.description" label="Description" icon="pencil" :rows="5"/>
                                </mdb-col>
                            </mdb-row>
                            <mdb-row>
                                <mdb-col col = "2"><p class="grey-text text-right mr-0"> <mdb-icon class="mr-1" icon="male" />Players:</p></mdb-col>
                                <mdb-col col = "2">
                                    <mdb-input size="sm" id="vanity" basic>
                                        <span class="input-group-text ml-0" style="width: 40px" slot="prepend">Min</span>
                                    </mdb-input>
                                    <mdb-input size="sm"  id="dsa" basic>
                                        <span class="input-group-text"  style="width: 40px" slot="prepend">Max</span>
                                    </mdb-input>
                                </mdb-col>
                                <mdb-col col = "2"><p class="grey-text text-right mr-0"><mdb-icon  icon="tag" class="mr-1" />Tags:</p></mdb-col>
                                <mdb-col  col = "5" class="grey-text">
                                    <div v-if="formReadOnly"  style="max-width: 20vw">
                                        <div style="display:inline" v-for="tag in boardGame.tags" :key="tag">
                                            <div class="badge badge-pill badge-primary" pill>{{tag}}</div>
                                        </div>
                                    </div>
                                    <div v-else>
                                        <v-select v-model="boardGame.tags"
                                                  :options="tagList"
                                                  multiple
                                                  style="max-width: 20vw"
                                                  @input="(values) => {
                                                  this.boardGame.tags = values
                                              }"/>
                                    </div>
                                </mdb-col>
                            </mdb-row>
                            <mdb-row>
                                <mdb-col class="grey-text">
                                    <mdb-badge class="float-right" v-if="isDetailsMode && !boardGame.active"
                                               color="warning">Archived
                                    </mdb-badge>
                                    <div v-else-if="isDetailsMode && isEmployee && boardGame.active">
                                        <div class="mt-3" v-if="!isEditMode">
                                            <mdbBtn class="float-right" v-on:click="edit" size="sm">Edit</mdbBtn>
                                        </div>
                                        <div class="mt-3" v-else-if="isEditMode">
                                            <ButtonWithConfrm v-bind:on-confirm="this.delete" class="mt-3 float-left"
                                                              color="danger" size="sm">Delete
                                            </ButtonWithConfrm>
                                            <mdb-btn-group class="mt-3 float-right" size="sm">
                                                <mdb-btn v-on:click="cancelEdit">Cancel</mdb-btn>
                                                <mdb-btn v-on:click="update">Save</mdb-btn>
                                            </mdb-btn-group>
                                        </div>
                                    </div>
                                    <div class="mt-2 text-right" v-else-if="isCreateMode && isEmployee">
                                        <mdbBtn v-on:click="save" size="sm">Save</mdbBtn>
                                    </div>
                                </mdb-col>
                            </mdb-row>
                        </mdb-container>
                    </mdb-card-body>
                </mdb-card>
            </mdb-col>
        </mdb-row>
        <mdb-row v-if="isDetailsMode && boardGame.id && boardGame.active" class="justify-content-md-center mt-3">
            <mdb-col md="auto" col="12">
                <mdb-card style="min-width: 30vw">
                    <ElementsTable v-bind:bg-id="boardGame.id"></ElementsTable>
                </mdb-card>
            </mdb-col>
        </mdb-row>
    </mdb-container>
</template>

<script>
    import {
        mdbContainer,
        mdbIcon,
        mdbRow,
        mdbBtn,
        mdbCol,
        mdbCard,
        mdbCardBody,
        mdbInput,
        mdbBtnGroup,
        mdbBadge
    } from 'mdbvue';
    import {formMixin} from "../mixin/FormMixin"
    import {tagsUrl, boardGamesUrl, publishersUrl} from "../../axios/axiosRoutes";
    import ElementsTable from "../tables/ElementsTable";
    import ButtonWithConfrm from "../buttons/ButtonWithConfrm";
    import {required, maxLength, between, integer} from 'vuelidate/lib/validators'

    export default {
        name: "BoardGameForm",
        mixins: [formMixin],
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
            mdbIcon,
            mdbBadge
        },
        data() {
            return {
                formValid: true,
                boardGame: {
                    title: '',
                    description: '',
                    year: '',
                    tags: [],
                    minPlayers:'',
                    maxPlayers:'',
                    photoUrl:"",
                    author:'',
                    publisher:''
                },
                tagList: [],
                publishersList: []
            }
        },
        methods: {
            fetchData() {
                this.$api.get(boardGamesUrl + "/" + this.$route.params.id).then(response => {
                    this.boardGame = response.data
                })
            },
            fetchTags() {
                this.$api.get(tagsUrl).then(response => (this.tagList = response.data.map(tag => {
                    return tag.name
                })));
            },
            fetchPublishers() {
                this.$api.get(publishersUrl).then(response => (this.publishersList = response.data.map(
                    publisher => {return publisher.name}
                )))
            },
            edit() {
                this.fetchTags();
                this.fetchPublishers()
                this.editMode = true;
            },
            save() {
                if (this.$v.$invalid) {
                    this.formValid = false
                } else {
                    this.$api.post(boardGamesUrl, this.boardGame).then((response) => {
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
                this.$router.go(-1);
            },
            close() {
                this.$router.push({
                    name: 'Boardgames',
                })
            },
            delete() {
                this.$api.delete(boardGamesUrl + "/" + this.$route.params.id).then(this.close);
            }
        },
        created() {
            if (this.isDetailsMode) {
                this.fetchData();
            }
            if (this.isCreateMode) {
                this.fetchTags();
                this.fetchPublishers();
            }
        },
        watch: {
            $route: function () {
                if (this.isDetailsMode) {
                    this.fetchData();
                }
                if (this.isCreateMode) {
                    this.fetchTags();
                    this.fetchPublishers();
                }
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
                    between: between(1900, 2050)
                }
            }
        }
    }
</script>

<style scoped>

</style>