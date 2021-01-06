const shopModule = {
    state: {
        items: []
    },
    mutations: {
        ADD_ITEM(state,item) {
            var existingItem = state.items.find(obj => {
                return obj.orderItem.elementId === item.orderItem.elementId
            });
            if(existingItem === undefined) {
                state.items.push(item)
            }else {
                var totalNumber =  existingItem.orderItem.elementsCount + item.orderItem.elementsCount;
                existingItem.element = Object.assign({},item.element);
                existingItem.orderItem = Object.assign({},item.orderItem)
                existingItem.orderItem.elementsCount = totalNumber;
            }
        },
        REMOVE_ITEM(state,item) {
            var index = state.items.indexOf(item);
            if (index > -1) {
                state.items.splice(index, 1);
            }
        },
        CLEAR_ITEMS(state) {
            state.items = [];
        }
    },
    actions: {
        addToCard({commit}, data) {
            commit('ADD_ITEM', data);
            commit('SET_INFO', {message:'Item added to cart'});
        }
    },
    getters: {
        itemsCount: state => state.items.length,
        orderItems: state => state.items
    }
};

export default shopModule;