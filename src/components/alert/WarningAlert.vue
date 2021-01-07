<template>
    <div v-if="warnings.length" class="alert-box mt-2" >
        <mdb-alert v-for="(warning,index) in warnings" :key="index" class="text-center mb-0 mt-1" color="warning"  @closeAlert="removeWarning(index)" dismiss>
            {{ $t(warning.message)}}
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
            removeWarning(index){
                this.$store.commit('REMOVE_WARNING', index)
            }
        },
        computed: {
            warnings () {
                return this.$store.getters.warnings
            }
        }
    }
</script>

<style scoped>

</style>