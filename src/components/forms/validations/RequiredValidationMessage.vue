<template>
    <div class="validate-error" v-if="visible">
        {{$t('validation.required')}}
    </div>
</template>

<script>
    export default {
        name: "RequiredValidationMessage",
        props: {
            visible: Boolean
        }
    }
</script>

<style scoped>

</style>