export var clientMixin = {
    data: function () {
            return {
                client: {
                    id: -1,
                    firstName: '',
                    lastName: '',
                    address: {
                        city: '',
                        street: '',
                        houseNo: '',
                        flatNo: '',
                        postalCode: ''
                    }
                },
            }
        },
    computed: {
        doesClientHaveAddress () {
            return this.client.address.city && this.client.address.street && this.client.address.houseNo
                && this.client.address.postalCode
        },
        doesClientHaveFullName() {
            return this.client.firstName && this.client.lastName
        }
    }
};
