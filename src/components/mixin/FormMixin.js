export var formMixin = {
    data: function () {
        return {
            editMode: false,
            formValid: true,
        }
    },
    methods: {
        edit() {
            this.editMode = true;
        },
        cancelEdit() {
            this.formValid = true;
            this.editMode = false;
        }
    },
    computed: {
        isEditMode() {
            return this.editMode === true
        },
        isCreateMode() {
            return this.$route.name.includes("Create")
        },
        isDetailsMode() {
            return this.$route.name.includes("Details")
        },
        formReadOnly() {
            let isCreateMode = this.isCreateMode;
            return !this.isEditMode && !isCreateMode;
        }
    },

};