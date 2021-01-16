<template>
    <mdb-modal class="text-left" :show="stockModal" @close="onClose">
        <mdb-modal-header>
            <mdb-modal-title>{{this.$t('element.buttons.manage_stock')}}</mdb-modal-title>
        </mdb-modal-header>
        <mdb-modal-body>
            <mdb-container>
                <mdb-row>
                    <mdb-col col="12">
                        <ErrorAlert  class="text-center mb-3"/>
                    </mdb-col>
                </mdb-row>
                <mdb-row >
                    <mdb-col  col="4">
                        <label >{{this.$t('element.current_stock')}}: </label>
                    </mdb-col>
                    <mdb-col  col="8">
                        <p class="ml-3">{{elementStock.stockSize}}</p>
                    </mdb-col>
                </mdb-row>
                <mdb-row >
                    <mdb-col  col="4">
                <label for="stockInput">{{this.$t('element.stock_change')}}: </label>
                    </mdb-col>
                    <mdb-col col="8">
                        <div class="d-block">
                    <input id="stockInput" class="ml-3" v-model="stock.stockChange" type="text">
                        <integer-validation-message class="float-left ml-3" v-bind:visible="!$v.stock.stockChange.integer && !formValid"  />
                        <min-value-validation-message class="float-left ml-3" v-bind:min-value="-1000000" v-bind:visible="!$v.stock.stockChange.minValue && !formValid" />
                        <max-value-validation-message class="float-left ml-3" v-bind:max-value="1000000" v-bind:visible="!$v.stock.stockChange.maxValue && !formValid" />
                        </div>
                    </mdb-col>
                </mdb-row>
                <mdb-row class="mt-3" >
                    <mdb-col  col="4">
                        <label for="statusInput"> {{this.$t('element.stock_status')}}: </label>
                    </mdb-col>
                    <mdb-col col="8">
                        <input id="statusInput" class="ml-3" v-model="stock.available" type="checkbox">
                    </mdb-col>
                </mdb-row>
            </mdb-container>
        </mdb-modal-body>
        <mdb-modal-footer>
            <mdbBtn v-on:click="onConfirm" size="sm">Confirm</mdbBtn>
        </mdb-modal-footer>
    </mdb-modal>
</template>

<script>
    import {mdbBtn, mdbModal, mdbModalBody, mdbModalFooter, mdbModalHeader, mdbModalTitle,  mdbContainer, mdbRow, mdbCol,} from "mdbvue";
    import {integer, minValue, maxValue} from 'vuelidate/lib/validators'
    import ErrorAlert from "../alert/ErrorAlert";
    import IntegerValidationMessage from "./validations/IntegerValidationMessage";
    import MinValueValidationMessage from "./validations/MinValueValidationMessage";
    import MaxValueValidationMessage from "./validations/MaxValueValidationMessage";

    export default {
        name: "stockModal",
        props: {
            elementStock: Object,
            stockModal: Boolean,
        },
        components: {
            MaxValueValidationMessage,
            MinValueValidationMessage,
            IntegerValidationMessage,
            ErrorAlert,
            mdbBtn,
            mdbModal,
            mdbModalHeader,
            mdbModalFooter,
            mdbModalTitle,
            mdbModalBody,
            mdbContainer,
            mdbRow,
            mdbCol,
        },
        methods: {
            onClose () {
                this.$emit('close')
            },
            onConfirm() {
                if (this.$v.$invalid) {
                    this.formValid = false
                } else {
                    this.$emit('confirm', this.stock);
                }
            }
        },
        data: function () {
            return {
                stock: {
                    available: this.elementStock.available,
                    stockChange: 0,
                    version: this.elementStock.version
                },
                formValid: true
            }
        },
        watch: {
            elementStock: function (value) {
                this.stock.available = value.available;
                this.stock.version = value.version
            }
        },
        validations() {
            return {
                stock: {
                    stockChange: {
                        integer,
                        minValue: minValue(-1000000),
                        maxValue: maxValue(1000000)
                    }
                }
            }
        }
    }
</script>

<style scoped>

</style>