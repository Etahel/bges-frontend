<template>
    <BoardGameForm></BoardGameForm>
</template>

<script>
    import BoardGameForm from "../components/forms/BoardGameForm";
    import {boardGamesUrl} from "../axios/axiosRoutes";
    export default {
        name: "CreateBoardGame",
        components: {
            BoardGameForm
        },
        data() {
            return {
                boardGame: {},
                apiUrl: boardGamesUrl
            }
        }
    }
</script>

<style scoped>

</style>