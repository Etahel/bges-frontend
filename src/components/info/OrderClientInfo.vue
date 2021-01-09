<template>
    <mdb-container>
        <mdb-row>
            <mdb-col>
                <div v-if="isEmployee && isDetails" class="grey-text ml-5 mr-5">
                    <mdb-input readOnly label="Client username" icon="user-cog" type="text" v-model="order.client.username"/>
                </div>
            </mdb-col>
        </mdb-row>
        <mdb-row>
            <mdb-col>
                <div class="grey-text ml-5 mr-5">
                    <mdb-input readOnly label="First Name" icon="user" type="text" v-model="order.firstName"/>
                </div>
            </mdb-col>
        </mdb-row>
        <mdb-row>
            <mdb-col>
                <div class="grey-text ml-5 mr-5">
                    <mdb-input readOnly label="Last Name" icon="user" group type="text" v-model="order.lastName"/>
                </div>
            </mdb-col>
        </mdb-row>
        <mdb-row>
            <mdb-col col = "8">
                <mdb-input readOnly class="ml-5 mr-1 grey-text" label="City" icon="city" type="text" v-model="order.address.city" />
            </mdb-col>
            <mdb-col col="4">
                <mdb-input readOnly class="ml-1 mr-5 grey-text" label="Postal Code" icon="envelope-open-text" type="text" v-model="order.address.postalCode" />
            </mdb-col>
        </mdb-row>
        <mdb-row>
            <mdb-col>
                <mdb-input readOnly class="ml-5 mr-5 grey-text" label="Street" icon="road" type="text" v-model="order.address.street" />
            </mdb-col>
        </mdb-row>
        <mdb-row class="grey-text">
            <mdb-col col = "4">
                <mdb-input readOnly class="ml-5" label="House no" icon="home" type="text" v-model="order.address.houseNo" />
            </mdb-col>
            <mdb-col col = "4">
                <mdb-input readOnly label="Flat no" icon="building" type="text" v-model="order.address.flatNo"/>
            </mdb-col>
        </mdb-row>
    </mdb-container>
</template>

<script>
    import {
        mdbCol,
        mdbContainer, mdbInput,
        mdbRow,
    } from "mdbvue";

    export default {
        name: "OrderClientInfo",
        components: {
            mdbContainer,
            mdbCol,
            mdbRow,
            mdbInput
        },
        props: {
            order:Object
        },
        computed: {
            isDetails() {
                return this.$route.name.includes("Details")
            },
        }
    }
</script>

<style scoped>

</style>