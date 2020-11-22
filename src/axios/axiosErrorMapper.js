export default function (error) {
    if (error.response) {
        if (error.response.data.errorMessage) {
            return new Error(error.response.data.errorMessage)
        } else if (error.response.data.error) {
            return new Error(error.response.data.error)
        } else {
            return new Error("Unexpected")
        }
    } else {
        // The request was made but no response was received
        console.log(error.request);
        return new Error("error.connection.server")
    }
}