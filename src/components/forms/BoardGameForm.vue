<template>
    <mdb-container class="mt-5">
        <mdb-row class="justify-content-md-center">
            <mdb-col md="auto" col="12">
                <mdb-card style="min-width: 30vw">
                    <mdb-card-body>
                        <div class="text-left m-0">
                            <mdb-icon v-on:click.native="close()" icon="angle-double-left" style="cursor: pointer" size="lg"  />
                        </div>
                        <form>
                            <p class="h4 text-center">BG</p>
                            <div class="grey-text">
                                <mdb-input v-bind:disabled=formReadOnly class="mb-0" containerClass="text-left" label="Game Title" icon="user" type="text"
                                           v-model="boardGame.title"/>
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
<!--                                <div v-if="!this.formValid">-->
<!--                                    <div class="validate-error" v-if="!$v.username.required">Can't be empty</div>-->
<!--                                </div>-->
<!--                                <mdb-input class="mb-0" containerClass="text-left" label="Your password" icon="lock" type="password"-->
<!--                                           v-model="password"/>-->
<!--                                <div v-if="!this.formValid">-->
<!--                                    <div class="validate-error" v-if="!$v.password.required">Can't be empty</div>-->
<!--                                </div>-->
<!--                            </div>-->
<!--                            <div class="text-left">-->
<!--                                <mdb-btn v-on:click="login">Login</mdb-btn>-->
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
                this.$api.post(boardGamesUrl,this.boardGame).then((response) => {
                    this.$router.push({
                        name: 'BoardGame-Details',
                        params: {
                            id: response.data.id
                        }
                    })
                })
            },
            update() {
                this.$api.patch(boardGamesUrl + "/" + this.$route.params.id,this.boardGame).then(this.fetchData).then(this.cancelEdit);
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
            if(this.isDetailsMode) {
                this.fetchData();
            }
            if(this.isCreateMode) {
               this.fetchTags();
            }
        }
    }
</script>

<style scoped>

</style>