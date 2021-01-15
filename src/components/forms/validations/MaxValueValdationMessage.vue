<template>
    <div class="validate-error" v-if="visible">
        Must be less than {{maxValue}}
    </div>
</template>

<script>
    export default {
        name: "MaxValueValdationMessage",
        props: {
            visible: Boolean,
            maxValue: String
        }
    }
</script>

<style scoped>

</style>