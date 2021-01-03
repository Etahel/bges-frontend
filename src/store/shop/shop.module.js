const shopModule = {
    state: {
        items: []
    },
    mutations: {
        ADD_ITEM(state,item) {
            var added = false;
            for (const existingItem of state.items) {
                 if(existingItem.elementId === item.elementId) {
                     existingItem.elementsCount+=item.elementsCount;
                     added = true
                 }
            }
            if(added === false) {
                state.items.push(item);
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

    },
    getters: {
        itemsCount: state => state.items.length
    }
};

export default shopModule;