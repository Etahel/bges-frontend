<template>
    <div>
        <!-- trigger modal button -->
        <mdb-btn v-bind:color="color" v-bind:size="size" class="mb-3" @click="open = true">
            <slot>Submit</slot>
        </mdb-btn>
        <!-- confirm modal -->
        <mdb-modal :show="open" @close="open = false" size="sm" class="text-center" danger>
            <mdb-modal-header center :close="false">
                <p class="heading">Are you sure?</p>
            </mdb-modal-header>
            <mdb-modal-footer center>
                <mdb-btn outline="danger" @click="() => {
                    this.open = false;
                    this.onConfirm();
                }">Yes</mdb-btn>
                <mdb-btn color="danger" @click="open = false">No</mdb-btn>
            </mdb-modal-footer>
        </mdb-modal>
    </div>
</template>

<script>
    import {mdbBtn, mdbModal, mdbModalHeader, mdbModalFooter } from 'mdbvue';
    export default {
        name: "ButtonWithConfrm",
        props: {
            onConfirm: Function,
            color: String,
            size: String,
            open: Boolean
        },
        components: {
            mdbBtn,
            mdbModal,
            mdbModalHeader,
            mdbModalFooter
        },
    }
</script>

<style scoped>

</style>