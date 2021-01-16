<template>
    <div class="validate-error" v-if="visible">
        {{$t('validation.different')}}</div>
</template>

<script>
    export default {
        name: "DifferentThanValidationMessage",
        props: {
            visible: Boolean
        }
    }
</script>

<style scoped>

</style>