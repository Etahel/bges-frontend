<template>
    <div style="width: 100%">
        <div>
            <div v-if="element.stock.available" class="float-left">
                <mdb-badge color="primary">{{$t('common.available')}}</mdb-badge>
                <p>{{$t('element.stock_left')}}: {{this.element.stock.stockSize}}</p>
            </div>
            <div v-else class="float-left">
                <mdb-badge color="danger">{{$t('common.unavailable')}}</mdb-badge>
            </div>
        </div>
        <div v-if="element.stock.available" class="float-right">
        <label>
            <input v-model.number="orderItem.elementsCount" style="width: 40px" type="number">
        </label>
        <mdbBtn v-bind:disabled="this.$v.$invalid || isCartFull" v-on:click="addToCart"  size="sm">{{$t('element.buttons.to_cart')}}</mdbBtn>
        <div class="validate-error" v-if="!$v.orderItem.elementsCount.maxValue">{{$t('validation.larger_than_stock')}}</div>
            <div class="validate-error" v-if="this.isCartFull">{{$t('validation.cart_full')}}</div>
        </div>
    </div>
</template>

<script>
    import {mdbBtn, mdbBadge} from "mdbvue";
    import {minValue,maxValue, integer} from 'vuelidate/lib/validators'

    export default {
        name: "AddToCart",
        props: {
            element: Object
        },
        components: {
            mdbBtn,mdbBadge
        },
        data: function () {
            return {
                orderItem : {
                    elementId: this.element.id,
                    elementsCount: 1
                }
            }
        },
        methods: {
            addToCart() {
                if(this.orderItem.elementsCount !== "" && !this.$v.$invalid)
                this.$store.dispatch('addToCart', this.orderItem)
            }
        },
        computed: {
            maxOrderCount() {
                var existingItem = this.$store.getters.cartItems.find(obj => {
                    return obj.elementId === this.orderItem.elementId
                });
                if(existingItem === undefined) {
                    return this.element.stock.stockSize;
                } else {
                    return this.element.stock.stockSize - existingItem.elementsCount;
                }
            },
            isCartFull() {
                var existingItem = this.$store.getters.cartItems.find(obj => {
                    return obj.elementId === this.orderItem.elementId
                });
                return this.$store.getters.cartItems.length >= process.env.MAX_CART_SIZE && existingItem === undefined;
            }
        },
        watch: {
            element: function (value) {
                this.orderItem.elementId = value.id;
            }
        },
        validations() {
            return {
                orderItem: {
                    elementsCount: {
                        integer,
                        minValue: minValue(1),
                        maxValue: maxValue(this.maxOrderCount)
                    }
                }
            }
        }
    }
</script>

<style scoped>

</style>