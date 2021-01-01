<template>
    <div v-if="error"  class="alert-box mt-2" >
        <mdb-alert class="mb-0 text-center" color="danger" @closeAlert="removeError()"  dismiss>
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
            removeError(){
                this.$store.commit('REMOVE_ERROR')
            }
        },
        computed: {
            error () {
                return this.$store.getters.error
            }
        }
    }
</script>

<style scoped>

</style>