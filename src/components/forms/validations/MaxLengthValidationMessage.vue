<template>
    <div class="validate-error" v-if="visible">
        {{$t('validation.maxLength', {
        length: maxLength
        }) }}
    </div>
</template>

<script>
    export default {
        name: "MaxLengthValidationMessage",
        props: {
            maxLength: String,
            visible: Boolean
        }
    }
</script>

<style scoped>

</style>