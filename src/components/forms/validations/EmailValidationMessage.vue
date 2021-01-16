<template>
    <div class="validate-error" v-if="visible">{{$t('validation.email')}}</div>
</template>

<script>
    export default {
        name: "EmailValidationMessage",
        props: {
            visible: Boolean
        }
    }
</script>

<style scoped>

</style>