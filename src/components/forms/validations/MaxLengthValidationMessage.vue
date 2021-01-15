<template>
    <div class="validate-error" v-if="visible">
        Must be shorter than {{maxLength}} characters
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