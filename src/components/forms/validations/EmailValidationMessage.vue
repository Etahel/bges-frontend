<template>
    <div class="validate-error" v-if="visible">Incorrect email format</div>
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