export var formMixin = {
    data: function () {
        return {
            editMode: false
        }
    },
    methods: {
        isEditMode() {
            return this.editMode;
        },
        edit() {
            this.editMode = true;
        }
    },
    computed: {
        isCreateMode() {
            return this.$route.name.includes("Create")
        },
        isDetailsMode() {
            return this.$route.name.includes("Details")
        },
        formReadOnly() {
            return !this.isEditMode() && !this.$route.name.isCreateMode;
        }
    },

};