<template>
    <BoardGameForm></BoardGameForm>
</template>

<script>
    import BoardGameForm from "../components/forms/BoardGameForm";
    import {boardGamesUrl} from "../axios/axiosRoutes";
    export default {
        name: "BoardGameDetails",
        components: {
            BoardGameForm
        },
        data: function () {
            return {
                fetchUrl: boardGamesUrl
            }
        }
    }
</script>

<style scoped>

</style>