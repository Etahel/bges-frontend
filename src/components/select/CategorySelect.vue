<template>
    <v-select v-model="model"
              :options="categoriesOptionList"
              :clearable='false'
              :getOptionLabel="getOptionLabel"
              @input="input"/>
</template>

<script>
    import ElementCategories from "../../definitions/ElementCategories.json";

    export default {
        name: "CategorySelect",
        props: {
            model: Object,
            input: Function
        },
        data: function() {
            return {
                categoriesOptionList: ElementCategories
            }
        },
        methods: {
            getOptionLabel(option) {
                if (typeof option === 'object') {
                    return this.$t(option.label);
                }
                return option;
            }
        }

    }
</script>

<style scoped>

</style>