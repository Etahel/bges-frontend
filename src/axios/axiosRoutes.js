const authServerUrl = "/auth";
const accountServiceUrl = "/account"
const authRealm = process.env.VUE_APP_AUTH_REALM;
export const accessTokenUrl = authServerUrl + "/realms/" + authRealm + "/protocol/openid-connect/token";
export const registerUrl = accountServiceUrl + "/user/register";
export const resetPasswordUrl = accountServiceUrl + "/user/reset-password"
export const verificationEmailUrl = accountServiceUrl + "/user/resend-verify-email"

