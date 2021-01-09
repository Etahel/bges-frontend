const shopModule = {
    state: {
        cartItems: [],
        order: {
            firstName: '',
            lastName: '',
            address: {
                city: '',
                street: '',
                houseNo: '',
                flatNo: '',
                postalCode: ''
            },
            orderItems: []
        },
        orderItemsInfo: [],
        orderValue: 0
    },
    mutations: {
        ADD_CART_ITEM(state,item) {
            var existingItem = state.cartItems.find(obj => {
                return obj.elementId === item.elementId
            });
            if(existingItem === undefined) {
                state.cartItems.push(item)
            }else {
                var totalNumber =  existingItem.elementsCount + item.elementsCount;
                existingItem.elementsCount = totalNumber;
            }
        },
        REMOVE_CART_ITEM(state,item) {
            var index = state.cartItems.findIndex((stateItem) => {
                return stateItem.elementId === item.elementId
            });
            if (index > -1) {
                state.cartItems.splice(index, 1);
            }
        },
        UPDATE_CART_ITEM_COUNT(state,item) {
            var index = state.cartItems.findIndex((stateItem) => {
                return stateItem.elementId === item.elementId
            });
            if (index > -1) {
                state.cartItems[index].elementsCount = item.elementsCount;
            }
        },
        CLEAR_CART_ITEMS(state) {
            state.cartItems = [];
        },
        SET_ORDER(state,order) {
            state.order = order;
        },
        SET_ORDER_ITEMS(state,orderItems) {
            state.order.orderItems = orderItems;
        },
        SET_ORDER_DATA(state,{clientData,addressData}){
            state.order.firstName = clientData.firstName;
            state.order.lastName = clientData.lastName;
            state.order.address = Object.assign({}, addressData);
        },
        SET_ORDER_ITEMS_INFO(state, orderItemsInfo) {
            state.orderItemsInfo = orderItemsInfo;
        },
        CLEAR_ORDER_AND_CART(state) {
            state.cartItems = [];
            state.orderItemsInfo = [];
            state.order = {
                firstName: '',
                lastName: '',
                address: {
                    city: '',
                    street: '',
                    houseNo: '',
                    flatNo: '',
                    postalCode: ''
                },
                orderItems: []
            };
            state.orderValue = 0;
        },
        SET_ORDER_VALUE(state, value) {
            state.orderValue = value;
        }

    },
    actions: {
        addToCart({commit}, data) {
            commit('ADD_CART_ITEM', data);
            commit('SET_INFO', {message:'Item added to cart'});
        }
    },
    getters: {
        cartItemsCount: state => state.cartItems.length,
        cartItems: state => state.cartItems,
        order: state => state.order,
        orderItemsInfo: state => state.orderItemsInfo,
        orderClientData: state => { return {
            firstName: state.order.firstName,
            lastName: state.order.lastName
        }},
        orderAddressData: state => state.order.address,
        orderValue: state => state.orderValue



    }
};

export default shopModule;