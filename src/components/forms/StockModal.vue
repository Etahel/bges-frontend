<template>
    <mdb-modal class="text-left" :show="stockModal" @close="onClose">
        <mdb-modal-header>
            <mdb-modal-title>Manage Stock</mdb-modal-title>
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
                        <label >Current Stock: </label>
                    </mdb-col>
                    <mdb-col  col="8">
                        <p class="ml-3">{{elementStock.stockSize}}</p>
                    </mdb-col>
                </mdb-row>
                <mdb-row >
                    <mdb-col  col="4">
                <label for="stockInput">Stock Change: </label>
                    </mdb-col>
                    <mdb-col col="8">
                    <input id="stockInput" class="ml-3" v-model="stock.stockChange" type="text">
                        <integer-validation-message class="ml-3" v-bind:visible="!$v.stock.stockChange.integer && !formValid"  />
                    </mdb-col>
                </mdb-row>
                <mdb-row class="mt-3" >
                    <mdb-col  col="4">
                        <label for="statusInput"> Stock Status: </label>
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
    import {integer} from 'vuelidate/lib/validators'
    import ErrorAlert from "../alert/ErrorAlert";
    import IntegerValidationMessage from "./validations/IntegerValidationMessage";

    export default {
        name: "stockModal",
        props: {
            elementStock: Object,
            stockModal: Boolean,
        },
        components: {
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
                        integer
                    }
                }
            }
        }
    }
</script>

<style scoped>

</style>