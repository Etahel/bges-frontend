<template>
    <mdb-container class="mt-5 mb-5">
        <mdb-row class="justify-content-md-center">
            <mdb-col md="auto" col="12">
                <mdb-card style="min-width: 40vw; min-height: 80vh">
                    <mdb-tabs color="indigo" justify
                              :active="0"
                              default
                              :links="[
                                 { text: 'Konto'},
                                 { text: 'Dane klienta' }]">
                        <template :slot="'Konto'">
                            <div class="overflow-auto">
                                <AccountForm/>
                            </div>
                        </template>
                        <template :slot="'Dane klienta'">
                            <div class="overflow-auto">
                                <ClientForm/>
                            </div>
                        </template>
                    </mdb-tabs>
                </mdb-card>
            </mdb-col>
        </mdb-row>
    </mdb-container>
</template>

<script>
    import {
        mdbContainer,
        mdbCard,
        mdbCol,
        mdbRow,
        mdbTabs,
    } from 'mdbvue';
    import AccountForm from "../components/forms/AccountForm";
    import ClientForm from "../components/forms/ClientForm";

    export default {
        name: 'Profile',
        components: {
            ClientForm,
            AccountForm,
            mdbContainer,
            mdbCard,
            mdbCol,
            mdbRow,
            mdbTabs,
        }
    };
</script>

<style scoped>

</style>