<template>
    <mdb-container>
        <mdb-row class="justify-content-md-center">
            <mdb-col md="auto" col="12">
                <mdb-card style="min-width:40vw">
                    <mdb-card-body>
                        <mdb-container class="grey-text">
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
                                    <p class="h4 text-center">Element Details</p>
                                </mdb-col>
                            </mdb-row>
                            <mdb-row>
                                <mdb-col>
                                    <mdb-input v-bind:readOnly=formReadOnly class="mb-0" containerClass="text-left"
                                               label="Element Name" icon="chess-knight" type="text"
                                               v-model="element.name"/>
                                </mdb-col>
                            </mdb-row>
                            <mdb-row>
                                <mdb-col v-if="formReadOnly" class="d-flex justify-content-center">
                                    <img v-if="element.photoUrl" class="mt-3 mb-3 text-center"
                                         v-bind:src=this.element.photoUrl alt="Image" width="300" height="300">
                                    <img v-else class="mt-3 mb-3 text-center" src="@/assets/noImage.png" alt="Image"
                                         width="250" height="250">
                                </mdb-col>
                                <mdb-col v-else>
                                    <mdb-input style="height: min-content" v-bind:readOnly=formReadOnly type="textarea"
                                               v-model="element.photoUrl" label="Photo url" icon="pencil" :rows="5"/>
                                </mdb-col>
                            </mdb-row>
                            <mdb-row>
                                <mdb-col col="8">
                                    <div class="mt-3" v-if="formReadOnly">
                                        <mdb-input v-bind:readOnly=true type="text"
                                                   :value="getCategoryName(element.elementCategory)" label="Icon Prefix"
                                                   icon="clipboard"/>
                                    </div>
                                    <div v-else class="mt-3">
                                        <mdb-icon style="font-size: 1.75rem" class="d-inline-block ml-0 mr-2"
                                                  icon="clipboard"/>
                                        <CategorySelect            class="d-inline-block"
                                                                   style="width: 80%"  v-bind:categoryCode="element.elementCategory"
                                                        v-bind:input="(category) => {
                                this.element.elementCategory = category.value;
                                }"/>
                                    </div>
                                </mdb-col>
                                <mdb-col col="4">
                                    <mdb-input v-bind:readOnly=formReadOnly class="mb-0" containerClass="text-left"
                                               label="Element Price" icon="dollar-sign" type="text"
                                               v-model="element.price"/>
                                </mdb-col>
                            </mdb-row>
                            <mdb-row>
                                <mdb-col>
                                    <mdb-input v-bind:readOnly=formReadOnly type="textarea"
                                               v-model="element.description"
                                               label="Description" icon="pencil" :rows="5" :max-rows="10"/>
                                </mdb-col>
                            </mdb-row>
                            <mdb-row>
                                <mdb-col>
                                    <mdb-badge class="float-right" v-if="isDetailsMode && !element.active"
                                               color="warning">Archived
                                    </mdb-badge>
                                    <div v-if="isDetailsMode && element.active">

                                        <AddToCart v-bind:element="this.element" class="mt-3 float-right"
                                                   v-if="isClient && !isEditMode"/>

                                        <div class="text-right" v-if="!isEditMode && isEmployee">
                                            <mdbBtn @click.native="stockModal = true" size="sm">Manage Stock</mdbBtn>
                                            <stock-modal v-bind:stock-modal="stockModal"
                                                         v-bind:elementStock="this.element.stock"
                                                         @close="() => {this.stockModal = false}"
                                                         v-on:confirm="onStockConfirm"></stock-modal>
                                            <mdbBtn v-on:click="edit" size="sm">Edit</mdbBtn>
                                        </div>

                                        <div class="mt-3" v-else-if="isEmployee && isEditMode">
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
    import ButtonWithConfrm from "../buttons/ButtonWithConfrm";
    import {boardGamesUrl, elementUrl} from "../../axios/axiosRoutes";
    import {maxLength, required} from "vuelidate/lib/validators";
    import CategorySelect from "../select/CategorySelect";
    import ElementCategories from "../../definitions/ElementCategories.json";
    import AddToCart from "./AddToCart";
    import stockModal from "./StockModal"

    export default {
        name: "ElementForm",
        props: {
            parentRoute: Object
        },
        mixins: [formMixin],
        components: {
            AddToCart,
            CategorySelect,
            ButtonWithConfrm,
            mdbContainer,
            mdbRow,
            mdbCol,
            mdbBtn,
            mdbInput,
            mdbCard,
            mdbCardBody,
            mdbBtnGroup,
            mdbIcon,
            stockModal,
            mdbBadge
        },
        data() {
            return {
                formValid: true,
                elementCategories: ElementCategories,
                element: {
                    id: -1,
                    name: '',
                    description: '',
                    price: 0,
                    elementCategory: 'O',
                    stock: {
                        stockSize: 0,
                        available: false
                    },
                    photoUrl: ''
                },
                stockModal: false
            }
        },
        methods: {
            fetchData() {
                this.$api.get(elementUrl + "/" + this.$route.params.elementId).then(response => {
                    this.element = response.data
                })
            },
            edit() {
                this.editMode = true;
            },
            save() {
                if (this.$v.$invalid) {
                    this.formValid = false
                } else {
                    this.$api.post(boardGamesUrl + "/" + this.$route.params.boardGameId + "/elements", this.element).then((response) => {
                        this.$router.push({
                            name: 'Element-Details',
                            params: {
                                boardGameId: this.$route.params.boardGameId,
                                elementId: response.data.id
                            }
                        })
                    })
                }
            },
            update() {
                if (this.$v.$invalid) {
                    this.formValid = false
                } else {
                    this.$api.patch(elementUrl + "/" + this.$route.params.elementId, this.element).then(this.fetchData).then(this.cancelEdit);
                }
            },
            back() {
                this.$router.go(-1);
            },
            close() {
                this.$router.push({
                    name: 'BoardGame-Details',
                    params: {id: this.$route.params.boardGameId}
                })
            },
            delete() {
                this.$api.delete(elementUrl + "/" + this.$route.params.elementId).then(this.close);
            },
            getCategoryName(categoryCode) {
                var result = this.elementCategories.find(obj => {
                    return obj.value === categoryCode
                })
                if (result === undefined) {
                    return ''
                } else {
                    return result.label;
                }
            },
            onStockConfirm(stock) {
                this.$api.patch(elementUrl + "/" + this.$route.params.elementId + "/stock", stock).then(this.fetchData).then(() => this.stockModal = false);
            }
        },
        created() {
            if (this.isDetailsMode) {
                this.fetchData();
            }
        },
        watch: {
            $route: function () {
                if (this.isDetailsMode) {
                    this.fetchData();
                }
            }
        },
        validations: {
            element: {
                name: {
                    required,
                    maxLength: maxLength(50)
                }
            }
        }
    }
</script>

<style scoped>

</style>