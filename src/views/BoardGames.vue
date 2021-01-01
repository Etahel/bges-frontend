<template>
    <mdb-container class="mt-5"   style="min-height: 50vh; min-width: 80vw">
        <mdb-row class="justify-content-md-center">
            <mdb-col md="auto" col="12">
                <board-games-table/>
            </mdb-col>
        </mdb-row>
    </mdb-container>
</template>

<script>
    import {
        mdbContainer,
        mdbRow,
        mdbCol
    } from 'mdbvue';
    import BoardGamesTable from "../components/tables/BoardGamesTable";
    export default {
        name: "BoardGames",
        components: {
            mdbContainer,
            BoardGamesTable,
            mdbRow,
            mdbCol
        },
        data() {
            return {
            }
        },

    }
</script>

<style scoped>

</style>