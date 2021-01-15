<template>
    <div class="validate-error" v-if="visible">
        Can't be empty
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