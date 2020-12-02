<template>
    <div class="d-flex flex-column column align-items-center justify-content-center alert-box mt-2" >
        <mdb-alert v-for="(info, index) in infos"  v-bind:key="info.message" style="width: 70vw" class="text-center mb-0 mt-1" color="success" @closeAlert="clearInfo(index)" dismiss>
            {{ $t(info.message)}}
        </mdb-alert >
    </div>
</template>

<script>
    import  {mdbAlert} from 'mdbvue';
    export default {
        name: "InfoAlert",
        components: {
            mdbAlert
        },
        methods: {
            clearInfo(index){
                this.$store.commit('REMOVE_INFO', index)
            }
        },
        computed: {
            infos () {
                return this.$store.getters.info
            }
        }
    }
</script>

<style scoped>

</style>