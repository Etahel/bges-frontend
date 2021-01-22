export default function (error) {
    if (error.response) {
        if(error.response.status === 400) {
            return new Error("error.data.invalid");
        }

        if (error.response.data.errorMessage) {
            return new Error("error." + error.response.data.errorMessage)
        } else if (error.response.data.error_description) {
            if(error.response.data.error_description === "Invalid user credentials")
                return new Error("error.account.keycloak.invalid_credentials");
            return new Error(error.response.data.error_description)
        } else if(error.response.status === 401) {
            return new Error("error.authorization.unauthorized");
        } else {
            return new Error("error.unexpected")
        }
    } else {
        // The request was made but no response was received
        console.log(error.request);
        return new Error("error.connection.server")
    }
}