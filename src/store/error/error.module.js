const errorsModule = {
    state: {
        errors: []
    },
    mutations: {
        ADD_ERROR(state, errors) {
            state.errors.add(errors);
        },
        SET_ERRORS(state, errors) {
            state.errors = errors;
        },
        CLEAR_ERRORS(state) {
            state.errors = [];
        },

    },
    actions: {
        addError({commit}, {errors}) {
                commit('SET_ERRORS',errors)
            }
        ,
        clearErrors({commit}) {
            commit("CLEAR_ERRORS");
        }
    },
    getters: {
        errors: state => state.errors,
    }
}

export default errorsModule;
