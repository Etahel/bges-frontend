<template>
    <div class="validate-error" v-if="visible">
        {{$t('validation.minLength', {
        length: minLength
        }) }}
    </div>
</template>

<script>
    export default {
        name: "MinLengthValidationMessage",
        props: {
            minLength: String,
            visible: Boolean
        }
    }
</script>

<style scoped>

</style>