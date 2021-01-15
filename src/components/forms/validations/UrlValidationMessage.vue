<template>
    <div class="validate-error" v-if="visible">Incorrect URL format</div>
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