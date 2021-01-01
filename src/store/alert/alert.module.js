const alertModule = {
    state: {
        error: '',
        warning: '',
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
        REMOVE_WARNING(state) {
            state.warning = '';
        },
        SET_WARNING(state, warning) {
            state.warning = warning;
        },
        CLEAR_WARNINGS(state) {
            state.warning = '';
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
            state.warning = '';
            state.info =  '';
        }

    },
    actions: {

    },
    getters: {
        error: state => state.error,
        warning: state => state.warning,
        info: state => state.info
    }
}

export default alertModule;
