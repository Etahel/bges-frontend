export default function (error) {
    if (error.response) {
        if(error.response.status === 400) {
            return new Error("Unexpected data error");
        }
        if(error.response.status === 401) {
            return new Error("Unexpected authorization error");
        }
        if (error.response.data.errorMessage) {
            return new Error(error.response.data.errorMessage)
        } else if (error.response.data.error_description) {
            return new Error(error.response.data.error_description)
        } else {
            return new Error("Unexpected error")
        }
    } else {
        // The request was made but no response was received
        console.log(error.request);
        return new Error("error.connection.server")
    }
}