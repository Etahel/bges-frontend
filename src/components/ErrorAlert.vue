<template>
    <div v-if="errors.length"  class="alert-box mt-2" >
        <mdb-alert v-for="(error, index) in errors"  v-bind:key="error.message" class="mb-0" color="danger" @closeAlert="removeError(index)" dismiss>
            {{ $t(error.message)}}
        </mdb-alert>
    </div>
</template>

<script>
    import  {mdbAlert} from 'mdbvue';
    export default {
        name: "ErrorAlert",
        components: {
            mdbAlert
        },
        methods: {
            removeError(index){
                this.$store.commit('REMOVE_ERROR', index)
            }
        },
        computed: {
            errors () {
                return this.$store.getters.errors
            }
        }
    }
</script>

<style scoped>

</style>