<template>
    <div class="validate-error" v-if="visible">
        {{$t('validation.regex')}}
    </div>
</template>

<script>
    export default {
        name: "RegexValidationMessage",
        props: {
            visible: Boolean
        }
    }
</script>

<style scoped>

</style>