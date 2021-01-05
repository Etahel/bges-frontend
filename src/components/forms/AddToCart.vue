<template>
    <div style="width: 100%">
        <div>
            <div v-if="element.stock.available" class="float-left">
                <mdb-badge color="primary">Available</mdb-badge>
                <p>Stock left: {{this.element.stock.stockSize}}</p>
            </div>
            <div v-else class="float-left">
                <mdb-badge color="danger">Unavailable</mdb-badge>
            </div>
        </div>
        <div class="float-right">
        <label>
            <input v-model="orderItem.elementsCount" style="width: 40px" type="number">
        </label>
        <mdbBtn  size="sm">Add to cart</mdbBtn>
        <div class="validate-error" v-if="!$v.orderItem.elementsCount.maxValue">Larger than stock</div>
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
                    elementVersion: this.element.version,
                    elementsCount: 1
                }
            }
        },
        computed: {
            maxOrderCount() {
                var existingItem = this.$store.getters.orderItems.find(obj => {
                    return obj.elementId === this.element.id
                });
                if(existingItem === undefined) {
                    return this.element.stock.stockSize;
                } else {
                    return this.element.stock.stockSize - existingItem.elementsCount;
                }
            }
        },
        watch: {
            element: function (value) {
                this.orderItem.elementId = value.id;
                this.orderItem.elementVersion = value.version;
            }
        },
        validations() {
            return {
                orderItem: {
                    elementsCount: {
                        integer,
                        minValue: minValue(this.test),
                        maxValue: maxValue(this.maxOrderCount)
                    }
                }
            }
        }
    }
</script>

<style scoped>

</style>