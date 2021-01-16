<template>
    <div class="validate-error" v-if="visible">
        {{$t('validation.minValue')}} {{minValue}}
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