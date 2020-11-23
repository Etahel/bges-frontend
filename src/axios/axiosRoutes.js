const authServerUrl = "/auth";
const accountServiceUrl = "/account"
const authRealm = process.env.VUE_APP_AUTH_REALM;
export const accessTokenUrl = authServerUrl + "/realms/" + authRealm + "/protocol/openid-connect/token";
export const registerUrl = accountServiceUrl + "/user/register";

