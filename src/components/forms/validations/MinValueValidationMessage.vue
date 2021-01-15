<template>
    <div class="validate-error" v-if="visible">
        Must be more than {{minValue}}
    </div>
</template>

<script>
    export default {
        name: "MinValueValidationMessage",
        props: {
            visible: Boolean,
            minValue: String
        }
    }
</script>

<style scoped>

</style>