<template>
    <mdb-container class="mt-5">
        <mdb-row class="justify-content-md-center">
            <mdb-col md="auto" col="12">
                <mdb-card style="min-width: 30vw">
                    <mdb-card-body>
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
                                    <v-select id="tagSelect"
                                              :options="tagList"
                                              :value = "boardGame.tags"
                                              multiple
                                              style="min-width: min-content;"
                                              @input="(values) => {
                                                  this.boardGame.tags = values
                                              }"/>
                                </div>
                                <div class="mt-2 text-right" v-if="isDetailsMode && isEmployee()">
                                    <mdbBtn v-on:click="edit" size="sm">Edit</mdbBtn>
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
    import {mdbContainer, mdbRow,mdbBtn, mdbCol, mdbCard, mdbCardBody, mdbInput} from 'mdbvue';
    import {formMixin} from "../mixin/FormMixin"
    import {tagsUrl} from "../../axios/axiosRoutes";
    import ElementsTable from "../tables/ElementsTable";

    export default {
        name: "BoardGameForm",
        props: {
            fetchUrl:String
        },
        mixins:[formMixin],
        components: {
            ElementsTable,
            mdbContainer,
            mdbRow,
            mdbCol,
            mdbBtn,
            mdbInput,
            mdbCard,
            mdbCardBody,
        },
        data () {
            return {
                formValid: true,
                boardGame: {},
                tagList: []
            }
        },
        methods: {
            fetchData() {
                this.$api.get(this.fetchUrl + "/" + this.$route.params.id).then(response => { this.boardGame = response.data
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
            }
        },
        created() {
            if(this.fetchUrl && this.isDetailsMode) {
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