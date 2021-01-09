const authServerUrl = "/auth";
const accountServiceUrl = "/account";
const inventoryServiceUrl = "/inventory";
const shopServiceUrl = "/shop";
const authRealm = process.env.VUE_APP_AUTH_REALM;
export const accessTokenUrl = authServerUrl + "/realms/" + authRealm + "/protocol/openid-connect/token";
export const registerUrl = accountServiceUrl + "/user/register";
export const resetPasswordUrl = accountServiceUrl + "/user/reset-password";
export const verificationEmailUrl = accountServiceUrl + "/user/resend-verify-email";
export const emailChangeUrl = accountServiceUrl + "/user/change-email";
export const meUrl = accountServiceUrl + "/user/me";
export const boardGamesUrl = inventoryServiceUrl + "/boardgames";
export const tagsUrl = boardGamesUrl + "/tags";
export const elementUrl = inventoryServiceUrl + "/elements";
export const clientUrl = shopServiceUrl + "/clients/me";
export const myOrdersUrl = shopServiceUrl + "/orders/me";

