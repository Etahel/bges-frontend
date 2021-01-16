<template>
    <div class="validate-error float-left ml-3" v-if="visible">{{$t('validation.integer')}}</div>
</template>

<script>
    export default {
        name: "IntegerValidationMessage",
        props: {
            visible: Boolean
        }
    }
</script>

<style scoped>

</style>