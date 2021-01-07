const alertModule = {
    state: {
        error: '',
        warnings: [],
        info: ''
    },
    mutations: {
        REMOVE_ERROR(state) {
            state.error = ''
        },
        SET_ERROR(state, error) {
            state.error = error;
        },
        CLEAR_ERRORS(state) {
            state.errors = '';
        },
        REMOVE_WARNING(state, index) {
            state.warnings.splice(index, 1);
        },
        ADD_WARNING(state, warning) {
            state.warnings.push(warning);
        },
        CLEAR_WARNINGS(state) {
            state.warnings = [];
        },
        REMOVE_INFO(state) {
            state.info = '';
        },
        SET_INFO(state, info) {
            state.info = info;
        },
        CLEAR_INFO(state) {
            state.info = '';
        },
        CLEAR_ALERTS(state){
            state.error = '';
            state.warnings = [];
            state.info =  '';
        }

    },
    actions: {

    },
    getters: {
        error: state => state.error,
        warnings: state => state.warnings,
        info: state => state.info
    }
}

export default alertModule;
