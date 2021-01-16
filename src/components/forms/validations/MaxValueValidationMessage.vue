<template>
    <div class="validate-error" v-if="visible">
        {{$t('validation.maxValue')}} {{maxValue}}
    </div>
</template>

<script>
    export default {
        name: "MaxValueValidationMessage",
        props: {
            visible: Boolean,
            maxValue: String
        }
    }
</script>

<style scoped>

</style>