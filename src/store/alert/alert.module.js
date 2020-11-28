const alertModule = {
    state: {
        errors: [],
        warnings: [],
        info: []
    },
    mutations: {
        ADD_ERROR(state, error) {
            state.errors.push(error);
        },
        REMOVE_ERROR(state, index) {
            state.errors.splice(index,1)
        },
        SET_ERRORS(state, errors) {
            state.errors = errors;
        },
        CLEAR_ERRORS(state) {
            state.errors = [];
        },
        ADD_WARNING(state, warning) {
            state.warnings.push(warning);
        },
        REMOVE_WARNING(state, index) {
            state.warnings.splice(index,1)
        },
        SET_WARNINGS(state, warnings) {
            state.warnings = warnings;
        },
        CLEAR_WARNINGS(state) {
            state.warnings = [];
        },
        ADD_INFO(state, info) {
            state.info.push(info);
        },
        REMOVE_INFO(state, index) {
            state.info.splice(index,1)
        },
        SET_INFO(state, info) {
            state.warnings = info;
        },
        CLEAR_INFO(state) {
            state.info = [];
        },
        CLEAR_ALERTS(state){
            state.errors = [];
            state.warnings = [];
            state.info = [];
        }

    },
    actions: {

    },
    getters: {
        errors: state => state.errors,
        warnings: state => state.warnings,
        info: state => state.info
    }
}

export default alertModule;
