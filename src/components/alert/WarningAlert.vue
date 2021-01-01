<template>
    <div v-if="warning"  class="alert-box mt-2" >
        <mdb-alert class="mb-0" color="warning" @closeAlert="removeWarning()" dismiss>
            {{ $t(error.message)}}
        </mdb-alert>
    </div>
</template>

<script>
    import  {mdbAlert} from 'mdbvue';
    export default {
        name: "WarningAlert",
        components: {
            mdbAlert
        },
        methods: {
            removeWarning(){
                this.$store.commit('REMOVE_WARNING')
            }
        },
        computed: {
            warning () {
                return this.$store.getters.warning
            }
        }
    }
</script>

<style scoped>

</style>