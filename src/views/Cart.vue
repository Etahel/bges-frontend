<template>
    <mdb-container class="mt-5">
        <mdb-row class="justify-content-md-center">
            <mdb-col md="auto" col="12">
                <mdb-card style="min-width: 40vw; height: 80vh" >
                    <mdb-card-title><p class="m-3 h4">Your order</p></mdb-card-title>
                    <mdb-card-body>
                       <mdb-list-group class="m-1 overflow-auto">
                        <mdb-list-group-item tag="a" v-for="item in completeCartItems" :key="item.element.id">    {{ item.element.name }} : {{item.orderItem.elementsCount}}</mdb-list-group-item>
                       </mdb-list-group>
                    </mdb-card-body>
                    <mdb-card-footer>
                        <div class="float-right">
                        <mdb-btn v-on:click="clear">Clear</mdb-btn>
                        <mdb-btn v-on:click="purchase">Purchase</mdb-btn>
                        </div>
                    </mdb-card-footer>
                </mdb-card>
            </mdb-col>
        </mdb-row>
    </mdb-container>
</template>

<script>
    import {mdbBtn, mdbListGroup, mdbListGroupItem, mdbContainer, mdbRow, mdbCol, mdbCard, mdbCardBody, mdbCardTitle, mdbCardFooter } from 'mdbvue';
    import {elementUrl} from "../axios/axiosRoutes";
    export default {
        name: "Cart",
        components: {
            mdbListGroup,
            mdbListGroupItem,
            mdbContainer, mdbRow, mdbCol, mdbCard, mdbCardBody, mdbCardTitle, mdbCardFooter,
            mdbBtn
        },
        data: function() {
            return {
                completeCartItems: []
            }
        },
        methods: {
            fetchData(){
                const params = {
                    ids: this.cartItems.map((orderItem) => {return orderItem.elementId}).toString(),
                };
                this.$api.get(elementUrl, {
                    params: params
                }).then(response => {this.populatecompleteCartItems(response.data)}).then(this.checkStocks)


            },
            populatecompleteCartItems(elementList) {
                this.completeCartItems = [];
                var missingItems = [];
                for (const cartItem of this.cartItems) {
                    var element = elementList.find(obj => {
                        return obj.id === cartItem.elementId
                    });
                    if(element !== undefined) {
                        this.completeCartItems.push({
                            orderItem: {
                                elementId: cartItem.elementId,
                                elementsCount: cartItem.elementsCount,
                                elementVersion: element.version
                            },
                            element: element
                        });
                    } else {
                        missingItems.push(cartItem);
                    }
                }
                for (const cartItem of missingItems) {
                    this.$store.commit('REMOVE_CART_ITEM', cartItem);
                }
                if(missingItems.length > 0) {
                    this.$store.commit('ADD_WARNING', {message:'Some elements are no longer accessible'});
                }
            },
            checkStocks() {
                var removeIndexes = [];
                var stockChanged = false;

                this.completeCartItems.forEach((completeCartItem, index) => {

                    if(completeCartItem.element.stock.stockSize === 0 || !completeCartItem.element.stock.available) {
                        removeIndexes.push(index);
                    }
                    if(completeCartItem.orderItem.elementsCount > completeCartItem.element.stock.stockSize && completeCartItem.element.stock.stockSize !== 0 ) {
                        completeCartItem.orderItem.elementsCount = completeCartItem.element.stock.stockSize;
                        this.$store.commit('UPDATE_CART_ITEM_COUNT', this.completeCartItems[index].orderItem);
                        stockChanged = true;
                    }
                });


                if(stockChanged) {
                    this.$store.commit('ADD_WARNING', {message:'Some elements order size had been altered'});
                }

                for(const removeIndex of removeIndexes) {
                    this.$store.commit('REMOVE_CART_ITEM', this.completeCartItems[removeIndex].orderItem);
                    this.completeCartItems.splice(removeIndex, 1);
                }

                if(removeIndexes.length > 0) {
                    this.$store.commit('ADD_WARNING', {message:'Some elements are unavailable at the moment'});
                }

            },
            clear() {
                this.$store.commit('CLEAR_CART_ITEMS');
                this.completeCartItems = [];
            },
            purchase() {
                var orderItems = this.completeCartItems.map((cartItem) => {
                        return cartItem.orderItem
                    });
                var orderItemsInfo = this.completeCartItems.map((cartItem) => {
                    return cartItem.element
                });

                this.$store.commit('SET_ORDER_ITEMS', orderItems);
                this.$store.commit('SET_ORDER_ITEMS_INFO', orderItemsInfo);
                this.$router.push({name: 'Order'})
            }
        },
        computed: {
            cartItems() {
                return  this.$store.getters.cartItems;
            }
        },
        created() {
            this.fetchData();
        }

    }
</script>

<style scoped>

</style>