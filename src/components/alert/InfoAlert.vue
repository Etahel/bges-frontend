<template>
    <div v-if="info" class="alert-box mt-2" >
        <mdb-alert style="width: 70vw" class="text-center mb-0 mt-1" color="success" @closeAlert="clearInfo()" dismiss>
            {{info.message}}
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
            clearInfo(){
                this.$store.commit('REMOVE_INFO')
            }
        },
        computed: {
            info () {
                return this.$store.getters.info
            }
        }
    }
</script>

<style scoped>

</style>