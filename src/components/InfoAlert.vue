<template>
    <div v-if="infos.length"  class="alert-box mt-2" >
        <mdb-alert v-for="(info, index) in infos"  v-bind:key="info.message" class="mb-0" color="success" @closeAlert="clearInfo(index)" dismiss>
            {{ $t(info.message)}}
        </mdb-alert>
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