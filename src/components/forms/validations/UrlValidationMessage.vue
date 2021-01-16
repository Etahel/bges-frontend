<template>
    <div class="validate-error" v-if="visible">{{$t('validation.url')}}</div>
</template>

<script>
    export default {
        name: "UrlValidationMessage",
        props: {
            visible: Boolean
        }
    }
</script>

<style scoped>

</style>