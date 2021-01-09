import OrderStatuses from "../../definitions/OrderStatus"

export var orderMixin = {
    methods: {
        getStatusLabel(statusCode) {
            var result = OrderStatuses.find(obj => {
                return obj.value === statusCode
            });
            if(result === undefined) {
                return ''
            } else {
                return result.text
            }
        }
    }

};