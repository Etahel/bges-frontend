const authServerUrl = "/auth";
const authRealm = process.env.VUE_APP_AUTH_REALM;
export const accessTokenUrl = authServerUrl + "/realms/" + authRealm + "/protocol/openid-connect/token";
export const someOther ="asdb";

