<template>
    <v-select v-bind:value="getCategoryOption(categoryCode)"
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
            categoryCode: String,
            input: Function,
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
            },
            getCategoryOption(categoryCode) {
                var result = this.categoriesOptionList.find(obj => {
                    return obj.value === categoryCode
                })
                if(result === undefined) {
                    return ''
                } else {
                    return result
                }
            }
        }

    }
</script>

<style scoped>

</style>