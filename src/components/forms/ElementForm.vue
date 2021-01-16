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
                                    <p class="h4 text-center">{{ $t("element.details") }}</p>
                                </mdb-col>
                            </mdb-row>
                            <mdb-row>
                                <mdb-col>
                                    <mdb-input v-bind:readOnly=formReadOnly class="mb-0" containerClass="text-left"
                                               v-bind:label="this.$t('common.name')" icon="chess-knight" type="text"
                                               v-model="element.name"/>
                                    <required-validation-message v-bind:visible="!$v.element.name.required && !this.formValid" />
                                    <max-length-validation-message max-length="50"
                                                                   v-bind:visible="!$v.element.name.maxLength && !this.formValid"/>
                                </mdb-col>
                            </mdb-row>
                            <mdb-row>
                                <mdb-col v-if="formReadOnly" class="d-flex justify-content-center">
                                    <img v-if="element.photoUrl" class="mt-3 mb-3 text-center"
                                         v-bind:src=this.element.photoUrl v-bind:alt="$t('common.photo')" width="300" height="300">
                                    <img v-else class="mt-3 mb-3 text-center" src="@/assets/noImage.png" v-bind:alt="$t('common.photo')"
                                         width="250" height="250">
                                </mdb-col>
                                <mdb-col v-else>
                                    <mdb-input class="mb-0" style="height: min-content" v-bind:readOnly=formReadOnly type="textarea"
                                               v-model="element.photoUrl" v-bind:label="this.$t('common.photo_url')" icon="pencil" :rows="5"/>
                                    <max-length-validation-message max-length="2048"  v-bind:visible="!$v.element.photoUrl.maxLength && !this.formValid" />
                                    <url-validation-message v-bind:visible="!$v.element.photoUrl.url && !this.formValid" />
                                </mdb-col>
                            </mdb-row>
                            <mdb-row>
                                <mdb-col col="8">
                                    <div class="mt-3" v-if="formReadOnly">
                                        <mdb-input v-bind:readOnly=true type="text"
                                                   :value="getCategoryName(element.elementCategory)" v-bind:label="this.$t('common.category')"
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
                                               v-bind:label="this.$t('common.price')" icon="dollar-sign" type="text"
                                               v-model="element.price"/>
                                    <min-value-validation-message min-value="0" v-bind:visible="!$v.element.price.minValue && !this.formValid"/>
                                    <max-value-validation-message max-value="1000000" v-bind:visible="!$v.element.price.maxValue && !this.formValid"/>
                                    <div class="validate-error" v-if="!$v.element.price.decimal && !this.formValid">
                                        {{this.$t('validation.decimal')}}
                                    </div>

                                </mdb-col>
                            </mdb-row>
                            <mdb-row>
                                <mdb-col>
                                    <mdb-input v-bind:readOnly=formReadOnly type="textarea"
                                               v-model="element.description"
                                               v-bind:label="this.$t('common.description')" icon="pencil" :rows="5" :max-rows="10"/>
                                    <max-length-validation-message max-length="500"
                                                                   v-bind:visible="!$v.element.description.maxLength && !this.formValid"/>
                                </mdb-col>
                            </mdb-row>
                            <mdb-row>
                                <mdb-col>
                                    <mdb-badge class="float-right" v-if="isDetailsMode && !element.active"
                                               color="warning">{{$t('common.archived')}}
                                    </mdb-badge>
                                    <div v-if="isDetailsMode && element.active">

                                        <AddToCart v-bind:element="this.element" class="mt-3 float-right"
                                                   v-if="isClient && !isEditMode"/>

                                        <div class="text-right" v-if="!isEditMode && isEmployee">
                                            <mdbBtn @click.native="stockModal = true" size="sm">{{this.$t('element.buttons.manage_stock')}}</mdbBtn>
                                            <stock-modal v-bind:stock-modal="stockModal"
                                                         v-bind:elementStock="this.element.stock"
                                                         @close="() => {this.stockModal = false}"
                                                         v-on:confirm="onStockConfirm"></stock-modal>
                                            <mdbBtn v-on:click="edit" size="sm">{{this.$t('common.buttons.edit')}}</mdbBtn>
                                        </div>

                                        <div class="mt-3" v-else-if="isEmployee && isEditMode">
                                            <ButtonWithConfrm v-bind:on-confirm="this.delete" class="mt-3 float-left"
                                                              color="danger" size="sm">{{this.$t('common.buttons.delete')}}
                                            </ButtonWithConfrm>
                                            <mdb-btn-group class="mt-3 float-right" size="sm">
                                                <mdb-btn v-on:click="cancelEdit">{{this.$t('common.buttons.cancel')}}</mdb-btn>
                                                <mdb-btn v-on:click="update">{{this.$t('common.buttons.save')}}</mdb-btn>
                                            </mdb-btn-group>
                                        </div>
                                    </div>

                                    <div class="mt-2 text-right" v-else-if="isCreateMode && isEmployee">
                                        <mdbBtn v-on:click="save" size="sm">{{this.$t('common.buttons.save')}}</mdbBtn>
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
    import {maxLength,decimal, required, url, maxValue, minValue} from "vuelidate/lib/validators";
    import CategorySelect from "../select/CategorySelect";
    import ElementCategories from "../../definitions/ElementCategories.json";
    import AddToCart from "./AddToCart";
    import stockModal from "./StockModal"
    import RequiredValidationMessage from "./validations/RequiredValidationMessage";
    import MaxLengthValidationMessage from "./validations/MaxLengthValidationMessage";
    import UrlValidationMessage from "./validations/UrlValidationMessage";
    import MinValueValidationMessage from "./validations/MinValueValidationMessage";
    import MaxValueValidationMessage from "./validations/MaxValueValidationMessage";

    export default {
        name: "ElementForm",
        props: {
            parentRoute: Object
        },
        mixins: [formMixin],
        components: {
            MaxValueValidationMessage,
            MinValueValidationMessage,
            UrlValidationMessage,
            MaxLengthValidationMessage,
            RequiredValidationMessage,
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
                    return this.$t(result.label);
                }
            },
            onStockConfirm(stock) {
                this.$api.patch(elementUrl + "/" + this.$route.params.elementId + "/stock", stock).then(this.fetchData).then(() => this.stockModal = false);
            },
            cancelEdit() {
                this.formValid = true;
                this.editMode = false;
                this.fetchData();
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
                },
                photoUrl: {
                    maxLength: maxLength(2048),
                    url
                },
                description: {
                    maxLength: maxLength(500),
                },
                price: {
                    decimal,
                    minValue: minValue(0),
                    maxValue: maxValue(1000000)
                }
            }
        }
    }
</script>

<style scoped>

</style>