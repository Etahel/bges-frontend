<template>
    <div class="validate-error" v-if="visible">No change has been made</div>
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